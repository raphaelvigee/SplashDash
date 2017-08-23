import Unsplash, {toJson} from 'unsplash-js';
import * as types from '../types/backgroundPhoto';
import config from '~/.env.js';
import axios from 'axios';
import _ from 'lodash';

const unsplash = new Unsplash({
  applicationId: config.UNSPLASH_APP_ID,
  secret: config.UNSPLASH_SECRET,
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

export function setPhotoData(photoData) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({type: types.SET_BACKGROUND_PHOTO_DATA, photoData});

      resolve();
    });
  };
}

export function changePhoto() {
  return (dispatch, getState) => {
    return (async () => {
      let shownCount = await getShownCount();

      console.log("Show Count: ", shownCount);

      if(shownCount > 30 || (await getItemsIndex()).length < 1) {
        console.log("Fetching new images");

        chrome.storage.local.set({shownCount: 0});

        await fetchPhotos()
      }

      console.log("Using cached images");

      chrome.storage.local.set({shownCount: shownCount + 1});

      dispatch(setPhotoData(await getRandomPhotoFromStorage()))
    })()
  };
}

export function fetchPhotos() {
  return unsplash.photos.getRandomPhoto({
    width: window.screen.width,
    height: window.screen.height,
    collections: ['543026', '139237', '932809'],
    count: 30
  })
  .then(toJson)
  .then(async items => {
    let itemsIndex = await getItemsIndex()

    items.map(async (item) => {
      itemsIndex.push(item.id)

      let data = {
        [item.id]: {
          data: item,
          files: {
            thumb: await fetchImageContent(item.urls.thumb),
            custom: await fetchImageContent(item.urls.custom),
          }
        },
        itemsIndex
      };

      console.log(data)

      chrome.storage.local.set(data)
    })
  });
}

export async function getRandomPhotoFromStorage() {
  let itemId = _.sample(await getItemsIndex());

  return await new Promise((resolve, reject) => {
      chrome.storage.local.get(itemId, (items) => {
        resolve(items[itemId])
      })
    })
}

export async function getShownCount() {
  return await new Promise((resolve, reject) => {
      chrome.storage.local.get('shownCount', (items) => {
        resolve(parseInt(items['shownCount']) || 0);
      })
    })
}

export async function getItemsIndex() {
  return await new Promise((resolve, reject) => {
      chrome.storage.local.get('itemsIndex', (items) => {
        resolve(items['itemsIndex'] || []);
      })
    })
}

async function fetchImageContent(url) {
  return await axios
    .get(url, {
      responseType: 'blob'
    })
    .then(r => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(r.data)
        })
    })
}

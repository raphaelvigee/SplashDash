import Unsplash, {toJson} from 'unsplash-js';
import * as types from '../types/backgroundPhoto';
import config from '~/.env.js';
import axios from 'axios';
import _ from 'lodash';
import 'chrome-storage-promise'

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
      const promisedData = await Promise.all([
        getShownCount(),
        getItemsIndex(),
      ]);

      let shownCount = promisedData[0];
      let itemsIndex = promisedData[1];

      const shouldPeriodicalFetch = shownCount > 30;
      const hasItems = itemsIndex.length > 0;

      if((shouldPeriodicalFetch || !hasItems) && navigator.onLine) {
        if(shouldPeriodicalFetch) {
          console.log(`More than 30 shown since last fetching (${shownCount})`)
        }

        if(!hasItems) {
          console.log("Less than 1 image available")
        }

        console.log("Fetching new images");

        await chrome.storage.promise.local.set({shownCount: 0});

        if(hasItems) {
          fetchPhotos()
        }else {
          await fetchPhotos()
        }

        itemsIndex = await getItemsIndex()
      } else {
        console.log(`Using cached images, shown ${shownCount}`);

        chrome.storage.local.set({shownCount: ++shownCount});
      }

      console.log(`${itemsIndex.length} images in cache`)

      dispatch(setPhotoData(await getRandomPhotoFromStorage()))
    })()
  };
}

export function fetchPhotos() {
  return unsplash.photos.getRandomPhoto({
    width: window.screen.width,
    height: window.screen.height,
    collections: ['543026', '139237', '932809', '1108634', '981639', '162572', '150672', '256443'],
    count: 30
  })
  .then(toJson)
  .then(async items => {
    let itemsIndex = await getItemsIndex();

    let setPromises = items.map(async (item) => {
      const imagesFetch = await Promise.all([
        fetchImageContent(item.urls.thumb),
        fetchImageContent(item.urls.custom),
      ]);

      const thumbContent = imagesFetch[0];
      const customContent = imagesFetch[1];

      let data = {
        [item.id]: {
          data: item,
          files: {
            thumb: thumbContent,
            custom: customContent,
          }
        }
      };

      await chrome.storage.promise.local.set(data);

      itemsIndex.push(item.id)

      await chrome.storage.promise.local.set({itemsIndex});
    })

    Promise.all(setPromises).then(() => {
      return chrome.storage.promise.local.set({itemsIndex});
    });

    return Promise.race(setPromises);
  });
}

export async function getRandomPhotoFromStorage() {
  const itemId = _.sample(await getItemsIndex());
  const items = await chrome.storage.promise.local.get(itemId);

  return items[itemId];
}

export async function getShownCount() {
  const k = 'shownCount';
  const items = await chrome.storage.promise.local.get(k);

  return items[k] || 0;
}

export async function getItemsIndex() {
  const k = 'itemsIndex';
  const items = await chrome.storage.promise.local.get(k);

  return items[k] || [];
}

async function fetchImageContent(url) {
  const response = await axios.get(url, {responseType: 'blob'});

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(response.data)
  })
}

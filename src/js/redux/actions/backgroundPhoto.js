import Unsplash, {toJson} from 'unsplash-js';
import * as types from '../types/backgroundPhoto';
import config from '~/.env.js';
import axios from 'axios';
import _ from 'lodash';
import 'chrome-storage-promise';
import db from '../../services/db';

const unsplash = new Unsplash({
  applicationId: config.UNSPLASH_APP_ID,
  secret: config.UNSPLASH_SECRET,
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
});

window.clearImages = async () => {
  await Promise.all([
    chrome.storage.local.clear(),
    db.images.clear(),
  ]);

  console.log('Cleared !');
};

export function getCurrent() {
  return (dispatch, getState) => {
    const state = getState();
    const photoDataHistory = state.backgroundPhoto.photoDataHistory;
    const photoDataIndex = state.backgroundPhoto.photoDataIndex;

    if (!Number.isInteger(photoDataIndex)) {
      return null;
    }

    return photoDataHistory[photoDataIndex] || null;
  };
}

export function setPhotoData(photoData, updateHistory = true) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({type: types.ADD_BACKGROUND_PHOTO_DATA_HISTORY, photoData});

      const state = getState();
      const photoDataIndex = state.backgroundPhoto.photoDataHistory.length - 1;

      dispatch({type: types.SET_CURRENT_PHOTO_DATA_INDEX, photoDataIndex});

      resolve();
    });
  };
}

export function previous() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const state = getState();
      const photoDataHistory = state.backgroundPhoto.photoDataHistory;

      const photoDataIndex = state.backgroundPhoto.photoDataIndex - 1;

      if (photoDataHistory[photoDataIndex]) {
        dispatch({type: types.SET_CURRENT_PHOTO_DATA_INDEX, photoDataIndex});
      }

      resolve();
    });
  };
}

export function next() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const state = getState();
      const photoDataHistory = state.backgroundPhoto.photoDataHistory;

      const photoDataIndex = state.backgroundPhoto.photoDataIndex + 1;

      if (photoDataHistory[photoDataIndex]) {
        dispatch({type: types.SET_CURRENT_PHOTO_DATA_INDEX, photoDataIndex});
      }

      resolve();
    });
  };
}

export function change() {
  return (dispatch, getState) => {
    return (async () => {
      let shownCount = await getShownCount();
      let itemsIndex = await getItemsIndex();

      const shouldPeriodicalFetch = shownCount > 30;
      const hasItems = itemsIndex.length > 0;

      if ((shouldPeriodicalFetch || !hasItems) && navigator.onLine) {
        if (shouldPeriodicalFetch) {
          console.log(`More than 30 shown since last fetching (${shownCount})`);
        }

        if (!hasItems) {
          console.log('Less than 1 image available');
        }

        console.log('Fetching new images');

        await chrome.storage.promise.local.set({shownCount: 0});

        if (hasItems) {
          fetchPhotos();
        } else {
          await fetchPhotos();
        }

        itemsIndex = await getItemsIndex();
      } else {
        console.log(`Using cached images, shown ${shownCount}`);

        chrome.storage.local.set({shownCount: ++shownCount});
      }

      console.log(`${itemsIndex.length} images in cache`);

      dispatch(setPhotoData(await getRandomPhotoFromStorage()));
    })();
  };
}

export function fetchPhotos() {
  return unsplash.photos.getRandomPhoto({
    width: window.screen.width,
    height: window.screen.height,
    collections: [
      '543026',
      '139237',
      '932809',
      '1108634',
      '981639',
      '162572',
      '150672',
      '256443',
    ],
    count: 30,
  }).then(toJson).then(async items => {
    let setPromises = items.map(async (item) => {
      const thumbContent = fetchImageContent(item.urls.thumb);
      const customContent = fetchImageContent(item.urls.custom);

      let data = {
        [item.id]: {
          data: item,
          files: {
            thumb: await thumbContent,
            custom: await customContent,
          },
        },
      };

      await Promise.all([
        chrome.storage.promise.local.set(data),
        db.images.add({id: item.id}).catch(() => {
        }),
      ]);
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
  const items = await db.images.toArray();

  return items.map(i => i.id);
}

async function fetchImageContent(url) {
  const response = await axios.get(url, {responseType: 'blob'});

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(response.data);
  });
}

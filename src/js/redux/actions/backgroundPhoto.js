import Unsplash, {toJson} from 'unsplash-js';
import * as types from '../types/backgroundPhoto';
import config from '~/.env.js';

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
    return unsplash.photos.getRandomPhoto({
      width: window.screen.width,
      height: window.screen.height,
      collections: ['543026', '139237', '932809']
    })
    .then(toJson)
    .then(json => {
      console.log(json)
      dispatch(setPhotoData(json))
    });
  };
}

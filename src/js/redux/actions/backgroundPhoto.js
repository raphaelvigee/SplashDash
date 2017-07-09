import Unsplash, {toJson} from 'unsplash-js';
import * as types from '../types/backgroundPhoto';
const unsplash = new Unsplash({
  applicationId: "544cc83e60f4c6f20aef52f65ef81143ab45d8233830565de5d58d3c9e701c3a",
  secret: "afae6b1bf052d56a528cea9c995a502d1765fc4325b4d6fe4188c608b21bf3b1",
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
    return unsplash.photos.getRandomPhoto({width: window.screen.width, height: window.screen.height})
    .then(toJson)
    .then(json => {
      dispatch(setPhotoData(json))
    });
  };
}

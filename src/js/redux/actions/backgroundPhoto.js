import Unsplash, {toJson} from 'unsplash-js';
import * as types from '../types/backgroundPhoto';
const unsplash = new Unsplash({
  applicationId: "4e5b72cc88f656e40b311c6647ec3d61bdba03ad5e2d4865d1040a56a84eec45",
  secret: "c32f65ad5f7afbe0b26578fe2ab4d6a2183a2cc799b64ee348fb62c2782b488d",
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
      collections: ['543026', '139237']
    })
    .then(toJson)
    .then(json => {
      console.log(json)
      dispatch(setPhotoData(json))
    });
  };
}

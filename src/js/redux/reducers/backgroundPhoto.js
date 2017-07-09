import * as types from '../types/backgroundPhoto';

const initialState = {
  photoData: null,
};

export default function backgroundPhoto(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_BACKGROUND_PHOTO_DATA:
      return {
        ...state,
        photoData: action.photoData,
      };
    default:
      return state;
  }
}

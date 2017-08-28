import * as types from '../types/backgroundPhoto';

const initialState = {
  photoDataHistory: [],
  photoDataIndex: null,
};

export default function backgroundPhoto(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_CURRENT_PHOTO_DATA_INDEX:
      return {
        ...state,
        photoDataIndex: action.photoDataIndex,
      };
    case types.ADD_BACKGROUND_PHOTO_DATA_HISTORY:
      return {
        ...state,
        photoDataHistory: [
          ...state.photoDataHistory,
          action.photoData,
        ],
      };
    default:
      return state;
  }
}

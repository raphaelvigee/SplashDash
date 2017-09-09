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
    case types.PREPEND_BACKGROUND_PHOTO_DATA_HISTORY:
      const index = state.photoDataIndex;

      return {
        ...state,
        photoDataHistory: [
          ...action.photoDataHistory,
          ...state.photoDataHistory,
        ],
        photoDataIndex: Number.isInteger(index) ? (index + action.photoDataHistory.length) : index
      };
    default:
      return state;
  }
}

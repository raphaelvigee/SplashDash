import * as types from '../types/backgroundPhoto';

export type PhotoData = {
    readonly files: object;
    readonly data: object;
}

export type BackgroundPhotoState = {
    readonly photoDataHistory: Array<PhotoData>;
    readonly photoDataIndex: number
}

const initialState: BackgroundPhotoState = {
    photoDataHistory: [],
    photoDataIndex: null,
};

export default function backgroundPhoto(state = initialState, action : any = {}) : BackgroundPhotoState {
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

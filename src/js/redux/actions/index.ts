import {bindActionCreators, Dispatch} from 'redux';
import * as backgroundPhoto from './backgroundPhoto';

export interface Actions {
    backgroundPhotoActions: typeof backgroundPhoto
    dispatch: Dispatch<any>;
}

export default function getActions(dispatch: any) {
    return {
        backgroundPhotoActions: bindActionCreators<any>(backgroundPhoto, dispatch),
    };
}

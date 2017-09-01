import {combineReducers} from 'redux';
import backgroundPhoto from './backgroundPhoto';

export default function getReduxReducer() {
    return combineReducers({
        backgroundPhoto,
    });
}

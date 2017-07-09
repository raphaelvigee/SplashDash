import { bindActionCreators } from 'redux';
import * as backgroundPhoto from './backgroundPhoto';

export default function getActions(dispatch) {
  return {
    backgroundPhotoActions: bindActionCreators(backgroundPhoto, dispatch),
  };
}

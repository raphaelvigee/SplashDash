import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BackgroundAppImage from './BackgroundAppImage';

import '../scss/main.scss'

import { connect } from 'react-redux';
import getReduxActions from './redux/actions';

const getMapStateProps = e => ({
  backgroundPhoto: e.backgroundPhoto,
});

const getMapDispatchToProps = dispatch => ({
  ...getReduxActions(dispatch),
  dispatch,
});

@connect(getMapStateProps, getMapDispatchToProps)
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        Hello !

        <button onClick={this.props.backgroundPhotoActions.changePhoto}>New</button>

        <BackgroundAppImage />
      </div>
    )
  }
}

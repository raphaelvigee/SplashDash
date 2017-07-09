import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BackgroundAppImage from './BackgroundAppImage';
import Clock from './Clock';

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

    this.state = {
      ...getMapStateProps(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...getMapStateProps(nextProps)
    })
  }

  render() {
    return (
      <div className="fill">
        <Clock/>

        <div className="pos top left" style={{padding: 10}}>
          <button onClick={this.props.backgroundPhotoActions.changePhoto}>
            <span className="ion-refresh"></span>
          </button>
        </div>

        {this.renderCredits()}

        <BackgroundAppImage />
      </div>
    )
  }

  renderCredits() {
    const {backgroundPhoto: {photoData}} = this.state;

    if(!photoData) {
      return null;
    }

    const {user, links} = photoData;

    return (
      <div className="pos bottom left credits">
        <button onClick={() => window.open(links.html)} className="user">
          {user.name}
        </button>
      </div>
    )
  }
}

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BackgroundAppImage from './BackgroundAppImage';
import Clock from './Clock';
import Notifications from './Notifications';
import autobind from 'autobind-decorator';

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
@autobind
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getMapStateProps(props),
      showNotifications: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...getMapStateProps(nextProps)
    })
  }

  toggleNotifications() {
    this.setState({
      showNotifications: !this.state.showNotifications
    })
  }

  renderNotificationsColumn() {
    if(!this.state.showNotifications) {
      return null;
    }

    return (
      <div className="f-col" style={{flex: 25, maxWidth: 400}}>
        <Notifications />
      </div>
    )
  }

  render() {
    return (
      <div className="fill">
        <Clock />

        <div
          className="pos top right animate-notifications"
          style={{
            marginRight: this.state.showNotifications ? 0 : '-20%',
            width: '20%',
            maxWidth: 300,
            height: '100%'
          }}>
          <Notifications />
        </div>

        <div className="pos top left" style={{padding: 10}}>
          <button onClick={this.props.backgroundPhotoActions.changePhoto}>
            <span className="ion-refresh"></span>
          </button>
        </div>

        <div className="pos top right" style={{padding: 10}}>
          <button onClick={this.toggleNotifications}>
            <span className="ion-ios-bell"></span>
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

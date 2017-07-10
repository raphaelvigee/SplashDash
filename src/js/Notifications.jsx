import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import StackBlur from 'stackblur-canvas';
import FadeInImage from './FadeInImage';
import FadeInBlurredImage from './FadeInBlurredImage';
import {connect} from 'react-redux';
import getReduxActions from './redux/actions';
import moment from 'moment';
import axios from 'axios';
import autobind from 'autobind-decorator';
import GitHubNotification from './GitHubNotification';
import GitHub from './services/github';

const getMapStateProps = e => ({backgroundPhoto: e.backgroundPhoto});

const getMapDispatchToProps = dispatch => ({
  ...getReduxActions(dispatch),
  dispatch
});

@connect(getMapStateProps, getMapDispatchToProps)
@autobind
export default class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getMapStateProps(props),
      notifications: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...getMapStateProps(nextProps)
    })
  }

  componentDidMount() {
    GitHub
    .get('/notifications')
    .then(r => {
      this.setState({
        notifications: r.data
      })
    })
  }

  render() {
    const {notifications} = this.state;

    if(!notifications) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="notifications">
        <div className="notifications-list">
          <div className="spacer"></div>
          {notifications.length == 0 && <div style={{color: 'white'}}>No notification</div>}
          {notifications.map((n) => <GitHubNotification key={n.id} notification={n} />)}
        </div>
      </div>
    )
  }
}

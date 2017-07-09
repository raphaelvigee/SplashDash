import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import StackBlur from 'stackblur-canvas';
import FadeInImage from './FadeInImage';
import FadeInBlurredImage from './FadeInBlurredImage';
import { connect } from 'react-redux';
import getReduxActions from './redux/actions';
import moment from 'moment';

const getMapStateProps = e => ({
  backgroundPhoto: e.backgroundPhoto,
});

const getMapDispatchToProps = dispatch => ({
  ...getReduxActions(dispatch),
  dispatch,
});

@connect(getMapStateProps, getMapDispatchToProps)
export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getMapStateProps(props),
      date: moment(),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...getMapStateProps(nextProps)
    })
  }

  componentDidMount() {
    this.i = setInterval(() => {
      this.setState({
        date: moment(),
      })
    }, 1000)
  }

  componentWillUnmount() {
    if(this.i) {
      clearInterval(this.i);
    }
  }

  render() {
    return (
      <div className="clock f-row">
        <div className="container-col" style={{flex: 1}}>
          <span className="time">
            {this.state.date.format('HH:mm')}
          </span>
        </div>
      </div>
    )
  }
}

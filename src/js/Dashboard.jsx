import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BackgroundAppImage from './BackgroundAppImage';

import '../scss/main.scss'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        Hello !

        <BackgroundAppImage />
      </div>
    )
  }
}

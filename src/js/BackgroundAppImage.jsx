import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import StackBlur from 'stackblur-canvas';
import Unsplash, {toJson} from 'unsplash-js';
import FadeInImage from './FadeInImage';
import FadeInBlurredImage from './FadeInBlurredImage';

const unsplash = new Unsplash({
  applicationId: "544cc83e60f4c6f20aef52f65ef81143ab45d8233830565de5d58d3c9e701c3a",
  secret: "afae6b1bf052d56a528cea9c995a502d1765fc4325b4d6fe4188c608b21bf3b1",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

export default class BackgroundAppImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoData: null
    }
  }

  componentDidMount() {
    this.getPhoto();
  }

  getPhoto() {
    unsplash.photos.getRandomPhoto({width: 1920, height: 1080})
    .then(toJson)
    .then(json => {
      console.log(json)
      this.setState({
        photoData: json
      })
    });
  }

  render() {
    let {photoData} = this.state;

    if(!photoData) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <button onClick={this.getPhoto.bind(this)}>New</button>
        <FadeInBlurredImage url={photoData.urls.thumb} />
        <FadeInImage url={photoData.urls.custom} />
      </div>
    )
  }
}

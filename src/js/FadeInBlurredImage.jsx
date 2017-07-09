import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import StackBlur from 'stackblur-canvas';
import FadeInImage from './FadeInImage';

export default class FadeInBlurredImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.url,
      show: false,
      imageWidth: 0,
      imageHeight: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.url != this.state.url) {
      this.setState({
        url: nextProps.url,
        show: false,
      })
    }
  }

  onImageLoad(image) {
    const imageCanvas = this.imageCanvas;
    const imageCanvasContext = imageCanvas.getContext('2d');

    let imageWidth = image.width;
    let imageHeight = image.height;

    this.setState({
      imageWidth,
      imageHeight
    })

    imageCanvasContext.drawImage(image, 0, 0, imageWidth, imageHeight);
    StackBlur.canvasRGB(imageCanvas, 0, 0, imageWidth, imageHeight, 20);
    this.setState({
      url: imageCanvas.toDataURL(),
      show: true
    })
  }

  render () {
    const {show, url} = this.state;

    return (
      <div>
        <canvas ref={c => this.imageCanvas = c} width={this.state.imageWidth} height={this.state.imageHeight} style={{display: 'none'}} />
        <FadeInImage ref={i => this.smallImageElement = i} url={url} show={show} onLoad={!show && this.onImageLoad.bind(this)} />
      </div>
    )
  }
}

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import StackBlur from 'stackblur-canvas';

class ImgElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      url: props.url,
      onLoad: props.onLoad,
    }

    this.image = this.getImageObject();
  }

  onLoad(image) {
    if (typeof this.state.onLoad == 'function' ) {
      return this.state.onLoad(image);
    }

    this.setState({
      show: true
    })
  }

  getImageObject() {
    console.log('get image')
    let image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = this.state.url;
    image.onload = () => typeof this.onLoad(image);

    return image;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      onLoad: nextProps.onLoad,
    })

    if(nextProps.url != this.state.url) {
      this.setState({
        url: nextProps.url,
      }, () => {
        this.image = this.getImageObject();
      })
    }
  }

  render () {
    return (
      <img ref={i => this.imageElement = i} className={`background-app ${this.state.show ? 'loaded' : ''}`} src={this.state.url} />
    )
  }
}

class SmallImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.url,
      show: false,
      imageWidth: 0,
      imageHeight: 0,
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
    StackBlur.canvasRGB(imageCanvas, 0, 0, imageWidth, imageHeight, 6);
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
        <ImgElement ref={i => this.smallImageElement = i} url={url} show={show} onLoad={!show && this.onImageLoad.bind(this)} />
      </div>
    )
  }
}

export default class BackgroundAppImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      smallImageUrl: null,
      largeImageUrl: null,
      smallImageWidth: 0,
      smallImageHeight: 0,

      imageID: '4u2U8EO9OzY',
    }
  }

  componentDidMount() {
  }

  processLargeImage() {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;
    image.onload = () => {
      this.setState({
        largeImageUrl: imageUrl
      })
    };
  }

  render() {
    let {largeImageUrl, smallImageUrl} = this.state;

    let hasLarge = !!largeImageUrl;

    return (
      <div>
        <SmallImage url={`https://source.unsplash.com/${this.state.imageID}/${150}x${100}`} />
        <ImgElement key={"large"} url={`https://source.unsplash.com/${this.state.imageID}/${1920}x${1080}`} />
      </div>
    )
  }
}

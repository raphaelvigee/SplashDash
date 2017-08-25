import React, {Component} from 'react';

export default class FadeInImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      url: props.url,
      onLoad: props.onLoad,
    };

    this.image = this.getImageObject();
  }

  onLoad(image) {
    if (typeof this.state.onLoad == 'function') {
      return this.state.onLoad(image);
    }

    this.setState({
      show: true,
    });
  }

  getImageObject() {
    let image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = this.state.url;
    image.onload = () => this.onLoad(image);

    return image;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      onLoad: nextProps.onLoad,
    });

    if (nextProps.url != this.state.url) {
      //debugger;
      this.setState({
        url: nextProps.url,
        show: false,
      }, () => {
        this.image = this.getImageObject();
      });
    }
  }

  render() {
    return (
        <img ref={i => this.imageElement = i}
             className={`background-image ${this.state.show ? 'loaded' : ''}`}
             src={this.state.url}/>
    );
  }
}

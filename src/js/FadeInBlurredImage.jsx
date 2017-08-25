import React, {Component} from 'react';
import FadeInImage from './FadeInImage';

export default class FadeInBlurredImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.url,
      show: false,
      imageWidth: 0,
      imageHeight: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url != this.state.url) {
      this.setState({
        url: nextProps.url,
        show: false,
      });
    }
  }

  onImageLoad(image) {
    this.setState({
      show: true,
    });
  }

  render() {
    const {show, url} = this.state;

    return (
        <div>
          <FadeInImage ref={i => this.smallImageElement = i} url={url}
                       show={show}
                       onLoad={!show && this.onImageLoad.bind(this)}/>
        </div>
    );
  }
}

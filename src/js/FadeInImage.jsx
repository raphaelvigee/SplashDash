import React, {Component} from 'react';

export default class FadeInImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      url: props.url,
      previousShow: false,
      previousUrl: null,
    };
  }

  onLoad() {
    this.setState({
      show: true,
      previousShow: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    let data = {
      show: nextProps.show,
      onLoad: nextProps.onLoad,
    };

    if (nextProps.url !== this.state.url) {
      data = {
        ...data,
        url: nextProps.url,
        show: true,
        previousUrl: this.state.url,
        previousShow: true,
      };
    }

    this.setState(data);
  }

  render() {
    return (
        <div>
          <img className={this.getImgClass(this.state.show)}
               src={this.state.url}
               onLoad={() => this.onLoad()}/>
          <img className={this.getImgClass(this.state.previousShow)}
               src={this.state.previousUrl}/>
        </div>
    );
  }

  getImgClass(show) {
    return `background-image ${show ? 'loaded' : ''}`;
  }
}

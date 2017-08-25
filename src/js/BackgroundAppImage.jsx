import React, {Component} from 'react';
import FadeInImage from './FadeInImage';
import {connect} from 'react-redux';
import getReduxActions from './redux/actions';

const getMapStateProps = e => ({
  backgroundPhoto: e.backgroundPhoto,
});

const getMapDispatchToProps = dispatch => ({
  ...getReduxActions(dispatch),
  dispatch,
});

@connect(getMapStateProps, getMapDispatchToProps)
export default class BackgroundAppImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getMapStateProps(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...getMapStateProps(nextProps)
    });
  }

  componentDidMount() {
    this.changePhoto();
  }

  changePhoto() {
    this.props.backgroundPhotoActions.changePhoto();
  }

  render() {
    let {backgroundPhoto: {photoData}} = this.state;

    if (!photoData) {
      return <h1>{`Loading...`}</h1>;
    }

    console.log(photoData);

    return (
        <FadeInImage url={photoData.files.custom}/>
    );
  }
}

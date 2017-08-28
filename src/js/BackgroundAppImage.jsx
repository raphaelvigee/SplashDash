import React, {Component} from 'react';
import FadeInImage from './FadeInImage';
import {connect} from 'react-redux';
import getReduxActions from './redux/actions';
import Mousetrap from 'mousetrap';
import autobind from 'autobind-decorator';

const getMapStateProps = e => ({
  backgroundPhoto: e.backgroundPhoto,
});

const getMapDispatchToProps = dispatch => ({
  ...getReduxActions(dispatch),
  dispatch,
});

@connect(getMapStateProps, getMapDispatchToProps)
@autobind
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

    Mousetrap.bind('left', this.props.backgroundPhotoActions.previousPhoto);
    Mousetrap.bind('right', this.props.backgroundPhotoActions.nextPhoto);
    Mousetrap.bind('r', this.changePhoto);
  }

  changePhoto() {
    this.props.backgroundPhotoActions.changePhoto();
  }

  render() {
    const photoData = this.props.backgroundPhotoActions.getCurrentPhotoData();

    if (!photoData) {
      return <h1>{`Loading...`}</h1>;
    }

    return (
        <FadeInImage url={photoData.files.custom}/>
    );
  }
}

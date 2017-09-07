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

  async componentDidMount() {
    await this.props.backgroundPhotoActions.populateHistory();

    this.change();

    Mousetrap.bind('left', this.props.backgroundPhotoActions.previous);
    Mousetrap.bind('right', this.props.backgroundPhotoActions.next);
    Mousetrap.bind('r', this.change);
  }

  componentWillUnmount() {
    Mousetrap.unbind('left');
    Mousetrap.unbind('right');
    Mousetrap.unbind('r');
  }

  change() {
    this.props.backgroundPhotoActions.change();
  }

  render() {
    const photoData = this.props.backgroundPhotoActions.getCurrent();

    if (!photoData) {
      return <h1>{`Loading...`}</h1>;
    }

    return (
        <FadeInImage url={photoData.files.custom}/>
    );
  }
}

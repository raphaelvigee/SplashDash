import * as React from 'react';
import FadeInImage from './FadeInImage';
import {connect} from 'react-redux';
import getReduxActions, {Actions} from './redux/actions';
import Mousetrap from 'mousetrap';
import autobind from 'autobind-decorator';
import {Dispatch} from "redux";

const getMapStateProps = (e : State | Props, ownProp?: Props): State | Props => ({
    backgroundPhoto: e.backgroundPhoto,
});

const getMapDispatchToProps = (dispatch : Dispatch<any>) : Actions => ({
    ...getReduxActions(dispatch),
    dispatch,
});

export interface Props extends Actions {
    backgroundPhoto: any;
}

export interface State extends Props {}

@connect(getMapStateProps, getMapDispatchToProps)
@autobind
export default class BackgroundAppImage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            ...getMapStateProps(props)
        };
    }

    componentWillReceiveProps(nextProps: Props, nextContext: any) {
        this.setState({
            ...getMapStateProps(nextProps)
        });
    }

    componentDidMount() {
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

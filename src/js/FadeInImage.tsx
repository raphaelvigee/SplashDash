import * as React from 'react';
import autobind from 'autobind-decorator';

export interface Props {
    url: string;
    show?: boolean;
}

export const DefaultProps = {
    show: false
};

export interface State {
    url: string;
    show: boolean;
    previousShow: boolean;
    previousUrl: string;
}

@autobind
export default class FadeInImage extends React.Component<Props, State> {
    public static defaultProps: Partial<Props> = DefaultProps;

    constructor(props: Props) {
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

    componentWillReceiveProps(nextProps: Props) {
        let newState = {} as State;
        newState.show = nextProps.show;

        if (nextProps.url !== this.state.url) {
            newState = {
                ...newState,
                url: nextProps.url,
                show: true,
                previousUrl: this.state.url,
                previousShow: true,
            };
        }

        this.setState(newState);
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

    getImgClass(show: boolean) {
        return `background-image ${show ? 'loaded' : ''}`;
    }
}

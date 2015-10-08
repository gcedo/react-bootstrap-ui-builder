import React, { PropTypes as T } from 'react';
import { Accordion, Panel, Glyphicon, Input, Well } from 'react-bootstrap';
import ComponentFactory from '../ComponentFactory.jsx';

const Styles = {
    main: {
        padding: '30px 10px 10px 10px',
        marginTop: 10,
        position: 'relative',
        borderBottom: '1px solid white'
    },
    get over () {
        return { ...this.main,
            borderBottom: '1px solid #f5f5f5',
            backgroundColor: '#FBFBFB'
        }
    },
    get deleted () {
        return { ...this.main, backgroundColor: '#EF9A9A' }
    },
    settings: {
        backgroundColor: '#FBFBFB'
    },
    toolbar: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: '#f5f5f5',
        cursor: 'pointer'
    },
    get toolbarOver () { return {...this.toolbar, color: 'black'} }
}


export default class ComponentInspector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            areSettingsVisible: false,
            over: false,
            componentData: { ...props.component }
        };
    }

    static propTypes = {
        name: T.string,
        componentData: T.object
    };

    toggleSettings = () => {
        this.setState({ areSettingsVisible: !this.state.areSettingsVisible })
    }

    removeComponent = () => {
        this.setState(
            { deleted: true },
            () => {
                setTimeout(() => {
                    this.props.removeComponent(this.props.index) },
                    300)
            }
        )

    }

    handlePropChange = (prop, event) => {
        const newState = { ...this.state };
        newState.componentData.componentProps[prop] = event.target.value;
        this.setState({ newState })
    }

    onMouseOver = (event) => { this.setState({ over: true }) }
    onMouseOut = (event) => { this.setState({ over: false }) }

    render() {
        const { over, areSettingsVisible, deleted } = this.state;
        let style = Styles.main;
        if (deleted) style = Styles.deleted;
        else if (over || areSettingsVisible) style = Styles.over;

        return (
            <div
                style={style}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >
                <ComponentFactory {...this.state.componentData}/>
                <div style={over || areSettingsVisible ? Styles.toolbarOver : Styles.toolbar}>
                    <Glyphicon glyph="cog" onClick={this.toggleSettings} />
                    <Glyphicon glyph="trash" onClick={this.removeComponent} />
                </div>
                { this.renderSettings() }
            </div>
        );
    }

    renderSettings() {
        if (!this.state.areSettingsVisible) { return null; }
        const props = this.props.component.componentProps;
        const settings = Object.keys(props).map((prop, index) => {
            return (
                <div key={index}>
                    <Input
                        type="text"
                        addonBefore={prop}
                        bsSize="small"
                        onChange={this.handlePropChange.bind(this, prop)}
                        value={this.state.componentData.componentProps[prop]}
                    />
                </div>
            );
        });
        return (
            <div style={Styles.settings}>
                <hr />
                { settings }
            </div>
        );
    }
}

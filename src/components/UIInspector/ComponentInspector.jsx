import React, { PropTypes as T } from 'react';
import { Accordion, Panel, Glyphicon } from 'react-bootstrap';
import ComponentFactory from '../ComponentFactory.jsx';


export default class ComponentInspector extends React.Component {

    constructor(props) {
        super(props);
        this.state = { areSettingsVisible: false };
    }

    static propTypes = {
        name: T.string,
        componentProps: T.object
    };

    toggleSettings = () => {
        this.setState({ areSettingsVisible: !this.state.areSettingsVisible })
    }

    removeComponent = () => {
        console.log(this.props)
        this.props.removeComponent(this.props.index)
    }

    render() {
        return (
            <div style={{ borderTop: '1px solid #ddd', paddingTop: 10, marginTop: 10, position: 'relative' }}>
                <ComponentFactory {...this.props.component}/>
                <div style={{ position: 'absolute', top: 5, right: 0 }}>
                    <Glyphicon glyph="cog" onClick={this.toggleSettings} />
                    <Glyphicon glyph="trash" onClick={this.removeComponent} />
                </div>
                { this.renderSettings() }
            </div>
        );
    }

    renderSettings() {
        if (!this.state.areSettingsVisible) { return null; }
        return (
            <div style={{ backgroundColor: '#f5f5f5' }}>
                <h4 style={{ margin: 0 }}><small>PROPERTIES</small></h4>
                {
                    Object.keys(this.props.component).map(prop => {
                        return <div>{`${prop} ${this.props.component[prop]}`}</div>
                    })
                }
            </div>
        );
    }
}

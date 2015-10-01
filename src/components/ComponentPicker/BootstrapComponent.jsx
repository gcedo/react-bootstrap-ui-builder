import React, { PropTypes as Type } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import * as Bootstrap from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import ComponentFactory from '../ComponentFactory.jsx';

const Styles = {
    main: { position: 'relative', cursor: 'move' },
    get over() { return {...this.main, top: -1, boxShadow: '0 1px 1px rgba(0,0,0,.1)'} }
}

const componentSource = {
  beginDrag(props) {
    console.log(props);
    const { name, componentProps, children } = props;
    return { name, componentProps, componentChildren: children };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource('COMPONENT', componentSource, collect)
export default class BootstrapComponent extends React.Component {

    static propTypes = {
        name: Type.string,
        componentProps: Type.object,
        connectDragSource: Type.func.isRequired,
        isDragging: Type.bool.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { over: false };
    }

    onMouseOver = (event) => { this.setState({ over: true }) }
    onMouseOut = (event) => { this.setState({ over: false }) }

    render() {
        const { name, componentProps, children } = this.props;
        const { connectDragSource, isDragging } = this.props;
        const { over } = this.state;

        return (connectDragSource(
            <div style={over ? Styles.over : Styles.main} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                <Panel>
                    <ComponentFactory
                        name={name}
                        componentProps={componentProps}
                        componentChildren={children} />
                </Panel>
            </div>
        ));
    }
}

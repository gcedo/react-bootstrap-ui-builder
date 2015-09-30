import React, { PropTypes as Type } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import * as Bootstrap from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import ComponentFactory from '../ComponentFactory.jsx';

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

    render() {
        const { name, componentProps, children } = this.props;
        const { connectDragSource, isDragging } = this.props;
        const component = React.createElement(Bootstrap[name], componentProps, children);
        return (connectDragSource(
            <div>
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

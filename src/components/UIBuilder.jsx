import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ComponentPicker from './ComponentPicker/ComponentPicker.jsx';
import UIInspector from './UIInspector/UIInspector.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

const components = [
    { name: 'Button', componentProps: { bsStyle: 'primary', bsSize: '', block: true }, componentChildren: 'Button' },
    { name: 'Input', componentProps: { type: 'select', label: 'Select', disabled: true }, componentChildren: <option value="select">select</option>}
]

@DragDropContext(HTML5Backend)
export default class UIBuilder extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                    </Col>
                    <Col md={4}>
                        <UIInspector components={components} />
                    </Col>
                    <Col md={2}>
                        <ComponentPicker />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

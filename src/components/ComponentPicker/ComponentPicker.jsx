import React from 'react';
import BootstrapComponent from './BootstrapComponent.jsx';

const availableComponents = [
    { name: 'Button', props: { bsStyle: 'primary' }, children: 'Button' },
    { name: 'Input', props: { type: 'select', label: 'Select' }, children: <option value="select">select</option>}
]

export default class ComponentPicker extends React.Component {

    render() {
        const components = availableComponents.map((component, i) => {
            return React.createElement(
                BootstrapComponent,
                { name: component.name, componentProps: component.props, key: i },
                component.children)
        });
        return (
            <div>
                {components}
            </div>
        );
    }
}

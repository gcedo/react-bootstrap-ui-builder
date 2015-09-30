import React from 'react';
import * as Bootstrap from 'react-bootstrap';

export default class ComponentFactory extends React.Component {
    render () {
        const { name, componentProps, componentChildren } = this.props;
        return React.createElement(Bootstrap[name], componentProps, componentChildren);
    }
}

import React from 'react';

export class OptionItem extends React.Component {
    render () {
        return <option value={this.props.val}>{this.props.option}</option>
    }
}
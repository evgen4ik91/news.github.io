import React from 'react';

export class Item extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultOption: this.props.defaultVal || ''
        }
    }
    render () {
        let itemName = this.props.name;
        return <div className="col controls__filter-col">
                <label className="controls__filter-title" htmlFor={'filter-' + itemName}>{itemName}</label>
                <select className="controls__filter-item" id={'filter-' + itemName} data-id={this.props.id} defaultValue={this.state.defaultOption} onChange={this.props.changeHandler}>
                    {this.props.children}
                </select>
            </div>
    }
}
import React from 'react';
import {Filter} from './filter'
import {Search} from './search'

export class Controls extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return  <div className="controls">
                    <Search updateNewsState={this.props.updateNewsState} />
                    <Filter updateNewsState={this.props.updateNewsState} />
                </div>
    }
}
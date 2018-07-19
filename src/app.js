import React from 'react';
import CONST from './constants';
import {Controls} from './components/controls/controls';
import {NewsBlock} from './components/news/news';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuery: null,
            params: null
        },
        this.updateNewsState = this.updateNewsState.bind(this)
    }

    updateNewsState(currentQuery, params) {
        this.setState({
            currentQuery,
            params
        });
    }

    render() {
        return (
        <div className="container">
            <h1 className="main-title">{CONST.title}</h1>
            <Controls updateNewsState={this.updateNewsState}/>
            <NewsBlock
                currentQuery={this.state.currentQuery}
                params={this.state.params}
            />
        </div>
        );
    }
};
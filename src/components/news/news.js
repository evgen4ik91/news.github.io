import React from 'react';
import CONST from "../../constants";
import {Item} from './item';
import {queryConstructor} from "../../handlers"
import {fetcher} from "../../handlers"

export class NewsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuery: CONST.queryTypes[0],
            params: CONST.defaultParams,
            newsList: [],
            isLoading: false,
            errorMsg: ''
        },
        this.queryConstructor = queryConstructor.bind(this),
        this.fetcher = fetcher.bind(this)
    }

    updateNews(type,params) {
        let self = this;
        self.setState({
            isLoading: true
        });
        let url = self.queryConstructor(type,params);
        self.fetcher(url).then(newsList => {
            self.setState({
                newsList: newsList,
                isLoading: false
            });
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            currentQuery: newProps.currentQuery,
            params: newProps.params
        },()=>{
            this.updateNews(this.state.currentQuery,this.state.params);
        });
    }

    componentDidMount() {
        this.updateNews(CONST.queryTypes[0],this.state.params);
    }

    render() {
        let newsItems = null;

        if (this.state.newsList) {
            newsItems = this.state.newsList.map((newsItem,i) => {
                return <Item newsItem={newsItem} num={i} key={i} />
            })
        } else {
            newsItems = <div className="news__error">
                            <p className="news__error-text">{this.state.errorMsg}</p>
                            <a className="news__error-link" href="https://newsapi.org/pricing" target="_blank">https://newsapi.org/pricing</a>
                        </div>;
        }

        return (
            <div className={["news__container", this.state.isLoading ? "loading" : "loaded"].join(" ")}>
                <h3 className="news__title">{this.state.currentQuery.name}</h3>
                <div className="news__progress-bar"></div>
                <div className="news__items-container">{newsItems}</div>
            </div>
        )
    }
}
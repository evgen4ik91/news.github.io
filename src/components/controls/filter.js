import React from 'react';
import CONST from "../../constants";
import {Item} from './item';
import {OptionsList} from './options-list';
import {queryConstructor} from "../../handlers";
import {fetcher} from "../../handlers";

export class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentParams: CONST.defaultParams,
            filterItems: CONST.filterItems,
        },
        this.queryConstructor = queryConstructor.bind(this),
        this.fetcher = fetcher.bind(this),
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentDidMount() {
        this.updateSources();
    }

    optionConstructor (name,id) {
        this.name = name;
        this.id = id;
    }

    changeHandler(el) {
        let self = this;
        let elem = el.target;
        let elemID = elem.getAttribute('data-id');
        let elemVal = elem.value;

        self.state.currentParams[elemID - 1] = elemVal;

        if (elemID != '4') {
            self.updateSources();
        };

        self.props.updateNewsState(CONST.queryTypes[0],self.state.currentParams);
    }

    updateSources() {
        let self = this;

        self.state.currentParams[3] = 'all';

        let url = self.queryConstructor(CONST.queryTypes[2],self.state.currentParams);

        self.fetcher(url).then(srcList => {
            let srcArr = [];
            if (srcList) {
                srcArr = srcList.map(item => {
                    return new self.optionConstructor(item.name, item.id);
                });
            }
            self.setState(()=>{
                return self.state.filterItems[3].list = srcArr;
            });

        });
    }

    render() {
        let self = this;
        return <div className="row controls__filter"> 
                    {this.state.filterItems.map((item,i) => {
                        return <Item
                                    name={item.name}
                                    id={item.id}
                                    key={i}
                                    defaultVal={self.state.currentParams[i]}
                                    changeHandler={self.changeHandler}
                                >
                                    <OptionsList
                                        list={item.list}
                                    />
                                </Item>
                    })}
                </div>
    }
}
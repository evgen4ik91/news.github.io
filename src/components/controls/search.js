import React from 'react';
import CONST from "../../constants";

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this)
    }

    keyTimeout = null;

    inputHandler (el) {
        let self = this;
        let elem = el.target;
        let elemVal = elem.value + '';
        if (this.keyTimeout != null) clearTimeout(this.keyTimeout);
        this.keyTimeout = setTimeout(()=>{
            if (elemVal.length >= 3) {
                self.props.updateNewsState(CONST.queryTypes[1],elemVal);
            };
        }, 1000, elemVal);
    }

    render() {
        return  <div className="controls__search">
                    <input className="controls__search-field" type="text" placeholder="Search" onKeyUp={this.inputHandler} />
                </div>
    }
}
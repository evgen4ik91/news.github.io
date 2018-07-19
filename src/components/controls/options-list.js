import React from 'react';
import {OptionItem} from './option-item';

export class OptionsList extends React.PureComponent {
    render() {
        var a = this.props.list.map((option,i) => {
            let val,title;
            if (typeof option == 'string') {
                val,title = option;
            } else {
                title = option.name;
                val = option.id;
            };
            return <OptionItem option={title} val={val} key={i} />
        });
        return [<OptionItem option='all' val='all' key='all' />, ...a];
    }
}
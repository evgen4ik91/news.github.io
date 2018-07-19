import CONST from "./constants";

export function queryConstructor(type, params) {
    let query = CONST.url + type.code + '?';
    if (typeof params !== 'string') {
        let startPos = params[3] === 'all' ? 0 : 3;
        for (let i = startPos; i < params.length; i ++) {
            let param = params[i];
            if ((param !== 'all')&&(param !== null)) {
                query += `${CONST.filterItems[i].name}=${param}&`;
            };
        };
    } else {
        query += `q=${params}&`;
    };
    return query + 'apiKey=' + CONST.apiKey;
}

export function fetcher(url) {
    let self = this;
    return new Promise ((resolve,reject)=>{
        fetch(url)
            .then( response => {
                return response.ok ? response.json() : reject(response);
            }).then(res => {
            if (res.sources) {
                resolve(res.sources);
            } else if (res.articles) {
                resolve(res.articles);
            }
        }).catch( e => {
            //console.error(e);
        });
    }).catch( e => {
        this.setState({
            errorMsg: e.status + ' ' + (e.status === 429 ? 'Requests limit has been reached': 'Nothing to show')
        })
    });
}

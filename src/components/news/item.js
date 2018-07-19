import React from 'react';

export class Item extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          imgIsLoading: true
        },
        this.errImgHandler = this.errImgHandler.bind(this),
        this.setImgIsLoading = this.setImgIsLoading.bind(this),
        this.endLoadImgHandler = this.endLoadImgHandler.bind(this)
    }

    blankPic = './img/picture.svg';

    dateFormat(str) {
        return str.slice(0,-4).replace(/[a-zA-Z]/g,' ');
    };

    errImgHandler(el) {
        el.target.setAttribute('src',this.blankPic);
        this.endLoadImgHandler();
    }

    setImgIsLoading(state) {
        this.setState({
            imgIsLoading: state
        });
    }

    endLoadImgHandler() {
        this.setImgIsLoading(false);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.newsItem.urlToImage !== this.props.newsItem.urlToImage) {
            this.setImgIsLoading(true);
        }
    }

    render() {
        let obj = this.props.newsItem;
        let i = this.props.num; 
        let url = obj.url;
        return (<div className="news-item" style={{animationDelay: i*200 +'ms'}}>
                    <div className="news-item__head row">
                          <div className={["col news-item__head-img", this.state.imgIsLoading ? "loading" : "loaded"].join(' ')}>
                              <a href={url}>
                                  <img className="news-item__img" src={obj.urlToImage || this.blankPic} onError={this.errImgHandler} onLoad={this.endLoadImgHandler} alt={obj.title}/>
                              </a>
                          </div>
                          <div className="col news-item__head-content">
                              <h3 className="news-item__title">
                                  <a className="news-item__link" href={url}>
                                      {obj.title}
                                  </a>
                              </h3>
                              {obj.author && (<p className="news-item__author">{obj.author}</p>)}
                          </div>
                    </div>
                    {obj.description && (<p className="news-item__descr">{obj.description}</p>)}
                    <p className="news-item__date">{this.dateFormat(obj.publishedAt)}</p>
                </div>)
    }
}
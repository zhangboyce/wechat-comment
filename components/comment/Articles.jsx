'use strict';

import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import moment from 'moment';
import Article from './Article.jsx';

export default class Articles extends Component {

    render() {
        let { articles, wechatAccount, commentTagsCountMap } = this.props;
        return (
            <div>
                <ul className="list-group">
                    { _.map(articles, article => {
                        return (
                            <li className="article list-group-item" key={ article._id }>
                                <Article
                                    onLoadComments={ this.props.onLoadComments }
                                    article={ article }
                                    wechatAccount={ wechatAccount }
                                    commentTagsCount={ commentTagsCountMap[article._id] }/>
                            </li>
                        );
                    })}

                </ul>
            </div>
        );
    }
}

Articles.propTypes = {
    wechatAccount: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired,
    commentTagsCountMap: PropTypes.object.isRequired,
    onLoadComments: PropTypes.func.isRequired
};


'use strict';

import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import moment from 'moment';
import Comments from './Comments.jsx';

export default class  Article extends Component {
    render() {
        let { article, wechatAccount, commentTagsCount, onLoadComments } = this.props;

        return (
            <div>
                <div className="article-content">
                    <div className="article-cover">
                        { article.cover ?
                            <img src={`/api/show/wechatimg?url=${ article.cover }`} /> :
                            <img src={ wechatAccount.mmhead } />
                        }
                    </div>
                    <div className="article-title">
                    <span>
                        { article.title }
                    </span>
                        {
                            article.comm_msg_info && article.comm_msg_info.datetime &&
                            <span className="article-publish-date">{ moment(article.comm_msg_info.datetime * 1000).format('YYYY-MM-DD hh:mm:ss') }</span>
                        }
                    </div>
                    <div className="article-digest">
                        <span>{ article.digest }</span>
                        <span><a href={ article.content_url } target="_blank"> 阅读原文 </a></span>
                    </div>
                    <div className="article-tips">
                    <span className="article-tag">
                        {
                            _.map(_.filter(commentTagsCount, tag => tag.count), tag => {
                                return <span key={ tag.name } className="tag tag-default">{ tag.name }<em>{ tag.count }</em></span>
                            })
                        }
                    </span>
                    </div>
                </div>
                <Comments article={ article } comments={ article.comments } onLoadComments={ onLoadComments }/>
            </div>
        );
    }
};

Article.propTypes = {
    onLoadComments: PropTypes.func.isRequired,
    wechatAccount: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    commentTagsCount: PropTypes.array.isRequired
};


'use strict';

import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import moment from 'moment';
import Comment from './Comment.jsx';
import Loading from './../common/Loading.jsx';

export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = { isOpened: false, isLoaded: false };
    }

    loadCommentsCallback = result => {
        this.setState({ isLoaded: result });
    };

    handleLoadComments = _id => () => {
        if (!this.state.isLoaded) {
            this.props.onLoadComments(_id, this.loadCommentsCallback);
        }
        this.setState({ isOpened: true });
    };

    handleCloseComments = () => {
        this.setState({ isOpened: false });
    };

    render() {
        let { article, comments } = this.props;
        let isOpened = this.state.isOpened;
        let isLoaded = this.state.isLoaded;

        let hasComments = comments && comments.length != 0;

        return (
            <div className="article-comments">
                {
                    !isOpened && !hasComments &&
                    <div className="comment-load">
                        暂无评论&nbsp;&nbsp;{ comments.length }
                    </div>
                }
                {
                    !isOpened && hasComments &&
                    <div className="comment-load">
                        <a href="javascript:void(0);" onClick={ this.handleLoadComments(article._id) }>展开评论&nbsp;<i className="fa fa-commenting-o" />&nbsp;&nbsp; { comments.length }</a>
                    </div>
                }
                {
                    isOpened && !isLoaded &&
                    <div className="article-comment">
                        <Loading />
                    </div>
                }
                {
                    isOpened && isLoaded &&
                    <div>
                        <div className="comment-load">
                            <a href="javascript:void(0);" onClick={ this.handleCloseComments }>收起评论&nbsp;<i className="fa fa-angle-up" /></a>
                        </div>
                        <div className="article-comment">
                            <div className="icon" />
                            <ul className="comment list-group">
                                { _.map(comments , comment => {
                                    return <Comment key={ comment._id } comment={ comment }/>
                                }) }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array,
    article: PropTypes.object
};


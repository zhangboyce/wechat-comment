'use strict';

import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import moment from 'moment';
import Loading from './../common/Loading.jsx';

export default class Comment extends Component {

    render() {
        let { comment } = this.props;

        return (
            <li className="list-group-item">
                <div className="comment-detail">
                    <div className="comment-avatar">
                        <img src={ comment.logo_url } />
                    </div>
                    <div className="comment-user"> { comment.nick_name } </div>
                    <div className="comment-content" dangerouslySetInnerHTML={{__html: comment.content}} />
                    <div className="comment-tips">
                        <span>{ moment(comment.create_time * 1000).format('YYYY-MM-DD hh:mm:ss') }</span>
                        <span><i className="fa fa-heart-o" /> { comment.like_num }</span>
                    </div>
                </div>
            </li>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object
};


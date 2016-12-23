'use strict';

import React from 'react';
import _ from 'lodash';
import Loading from './../common/Loading.jsx';
import Articles from './Articles.jsx';
import DatePicker from 'react-datepicker';
import '../../public/css/react-datepicker.css';
import moment from 'moment';
import wechatAccounts from '../../data/wechat_account';
import tags from '../../data/wechat_comment_tags';

const format = 'YYYY-MM-DD';

export default class Container extends React.Component {

    constructor(props) {
        super(props);
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        this.state = {
            startDate: moment(firstDay),
            endDate: moment(lastDay),
            wechatAccount: wechatAccounts[0],
            articles: [],
            commentTagsCountMap: {},
            articlesQueriedResult: { queried: true, message: '' },
            articlesReloadedResult: true
        }
    }

    componentDidMount() {
        this.queryArticles();
    }

    handleQuery = () => {
        this.queryArticles();
    };

    handleReload = () => {
        let weixinIds = _.map(wechatAccounts, wechatAccount => wechatAccount.biz).join(',');
        this.setState({ articlesReloadedResult: false });
        $.post('/api/load/data', { weixinIds: weixinIds }, result => {
            this.setState({ articlesReloadedResult: true });
        });
    };

    calculateCommentTagsCountMap = articles => {
        let commentTagsCountMap = {};

        for (let article of articles) {
            let counts = [];
            for (let tag of tags) {
                let obj = { name: tag, count: 0 };
                let comments = article.comments;
                if (comments && comments.length != 0) {
                    for (let comment of comments) {
                        comment.content && comment.content.includes(tag) && obj.count ++ ;
                    }
                }
                counts.push(obj);
            }
            commentTagsCountMap[article._id] = counts;
        }

        console.log('commentTagsCountMap' + JSON.stringify(commentTagsCountMap));

        this.setState({ commentTagsCountMap: commentTagsCountMap });
    };

    queryArticles = () => {
        let startDate = this.state.startDate.format('YYYY-MM-DD');
        let endDate = this.state.endDate.format('YYYY-MM-DD');
        let biz = this.state.wechatAccount.biz;
        let query = { startDate, endDate, biz };

        this.setState({ articlesQueriedResult: { queried: false, message: '' } });

        $.get('/api/article/list', query, result => {
            if (result.status == 200) {
                let message = result.list.length == 0 ? 'No articles!' : '';
                this.setState({ articles: result.list, articlesQueriedResult: { queried: true, message: message } });

                this.calculateCommentTagsCountMap(result.list);

            } else if (result.status == 500) {
                this.setState({ articlesQueriedResult: { queried: true, message: '系统错误, 请联系管理员!' } });
            }
        });
    };

    handleChangeWechatAccount = wechatAccount => () => {
        this.setState({ wechatAccount: wechatAccount });
    };

    handleLoadComments = (_id, loadCommentsCallback) => {
        let index = this.state.articles.findIndex(article => article._id == _id);
        if (index != -1) {
            let articles = [...this.state.articles];
            let article = articles[index];
            let comments = article.comments;

            comments.forEach( comment => {
                let content = comment.content;
                tags.forEach(tag => {
                    let rge = `(${ tag })`;
                    let re = new RegExp(rge, "g");
                    content = content && content.replace(re, '<i class="tag-highlight">$1</i>');
                });
                comment.content = content;
            });

            loadCommentsCallback(true);
            this.setState({ articles: articles });
        }
    };

    render() {

        return (
            <div className="container content">
                <div className="row operator">
                    <div className="panel wechat-dropdown">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                { this.state.wechatAccount.name }
                            </a>
                            <ul className="dropdown-menu">
                                { _.map(wechatAccounts, wa => {
                                    return <li key={ wa.biz }><a href="#" onClick={ this.handleChangeWechatAccount(wa) }>{ wa.name }</a></li>
                                }) }
                            </ul>
                        </li>
                    </div>
                    <div className="panel from">
                        <span>From:</span>
                        <DatePicker dateFormat={ format }
                                    todayButton={ "Today" }
                                    maxDate={ this.state.endDate }
                                    openToDate={ this.state.endDate }
                                    selected={ this.state.startDate }
                                    showMonthDropdown
                                    showYearDropdown
                                    scrollableYearDropdown
                                    scrollableMonthDropdown
                                    dropdownMode="select"
                                    onChange={ (date) => { this.setState({ startDate: date }) } } />
                    </div>
                    <div className="panel to">
                        <span>To:</span>
                        <DatePicker dateFormat={ format }
                                    selected={ this.state.endDate }
                                    todayButton={ "Today" }
                                    maxDate={ moment() }
                                    minDate={ this.state.startDate }
                                    showMonthDropdown
                                    showYearDropdown
                                    scrollableYearDropdown
                                    scrollableMonthDropdown
                                    dropdownMode="select"
                                    onChange={ (date) => { this.setState({ endDate: date }) } } />
                    </div>
                    <div className="panel query">
                        <button className="btn btn-query" onClick={ this.handleQuery }>Query</button>
                    </div>
                    <div className="panel reload">
                        {
                            this.state.articlesReloadedResult ?
                            <button className="btn btn-reload" onClick={ this.handleReload }>Reload</button> :
                                <Loading />
                        }
                    </div>
                </div>
                <div className="row comment-list">
                    {
                        !this.state.articlesQueriedResult.queried &&
                        <Loading />
                    }
                    {
                        this.state.articlesQueriedResult.queried &&
                        this.state.articlesQueriedResult.message &&
                        <div>{ this.state.articlesQueriedResult.message }</div>
                    }
                    {
                        this.state.articlesQueriedResult.queried &&
                        !this.state.articlesQueriedResult.message &&
                        <Articles
                            commentTagsCountMap={ this.state.commentTagsCountMap }
                            articles={ this.state.articles }
                            wechatAccount={ this.state.wechatAccount }
                            onLoadComments={ this.handleLoadComments } />
                    }
                </div>
            </div>
        );
    }
}


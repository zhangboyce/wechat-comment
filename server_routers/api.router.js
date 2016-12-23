'use strict';
const parse = require('co-body');
const router = require('koa-router')();
const redis = require('redis');
const fs = require('fs');
const request = require('request');
const ConnectMongo = require('../common/ConnectMongo');
const _ = require('lodash');

router.get('/', function *() {
    yield this.render('index');
});

router.get('/api/article/list', function *() {
    try {
        console.log('Execute /api/article/list, params: ' + JSON.stringify(this.query));

        let startTime = this.query.startDate;
        let endTime = this.query.endDate;
        let biz = this.query.biz;
        let start = new Date(startTime).getTime() / 1000;
        let end = new Date(endTime).getTime() / 1000 ;

        let match = { biz: biz, "comm_msg_info.datetime": { $gte: start, $lt: end }};
        let fields = { appmsgstat: 0, html: 0};
        console.log('match: ' + JSON.stringify(match));

        let mongodb = yield ConnectMongo.get('raw');
        let articlesCur = mongodb.collection("weixin_article_list").find(match, fields);
        let articles = yield articlesCur.toArray() || [];

        let gaid = article => `${ article.biz }_${ article.mid }_${ article.idx }`;
        let article_ids = _.map(articles, article => { return gaid(article) });

        let commentsCur = mongodb.collection("weixin_article_comment")
            .find({ article_id: { $in: article_ids } }, { article_id: 1, elected_comment: 1 });
        let comments = yield commentsCur.toArray() || [];
        let commentMap = comments.reduce((map, item) => { map[item.article_id] = item; return map; }, {});

        for (let article of articles) {
            let commentObj = commentMap[gaid(article)];
            article.comments = (commentObj && commentObj.elected_comment) || [];
        }

        console.log('articles: ' + JSON.stringify(articles));

        this.body = { status: 200, list: articles };

    } catch(e) {
        console.log(e);
        this.body = { status: 500 };
    }
});

router.get('/api/show/wechatimg', function *() {
    try {
        this.body = request.get(this.query.url);
    } catch(e) {
        console.log(e);
        this.body = { status: 500 };
    }
});

module.exports = router;
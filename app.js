'use strict';
const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const render = require('koa-swig');
const serve = require('koa-static');

const app = koa();
app.context.render = render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    //cache: 'memory', // disable, set to false
    ext: 'html'
});

// routers
const apiRouter = require('./server_routers/api.router.js');
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
app.use(logger());

app.use(serve(path.join(__dirname, 'build')));
app.use(require('koa-static-server')({rootDir: 'public', rootPath: '/public'}));

const ConnectMongo = require('./common/ConnectMongo');
require('dotenv').config({silent: true});
const env = process.env;
ConnectMongo.connect(env.MONGO_URL, 'raw');

const port = 8888;
app.listen(port);
console.log('WechatCommentSystem listening on port ' + port);
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes');
var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();/* 生成一个express实例 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));/* 设置views文件夹为存放视图文件的目录，即存放末班文件的地方,__dirname为全局变量，存放当前正在执行的脚本所在的目录 */
app.set('view engine', 'ejs');/* 默认视图引擎为ejs */

app.use(favicon());
app.use(logger('dev'));/* 加载日志中间件 */
app.use(bodyParser.json());/* 加载解析json的中间件 */
app.use(bodyParser.urlencoded());/* 加载解析urlencoded请求体的中间件 */
app.use(cookieParser());/* 加载解析cookie的中间件 */
app.use(express.static(path.join(__dirname, 'public')));/* 设置public文件夹为存放静态文件的目录。*/
app.use(app.router);

/* 路由控制 */
routes(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;/* 导出app实例供其他模块调用 */

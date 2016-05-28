/*
老师 这个我并没有跑起来 如果下次直播有空的话 麻烦老师在下次直播上讲一下
*/
var express = require('express');
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('//b.com:8080/b/data.js', function(req, res) {
    var name = req.query.name; //lynn
    res.send({
        status: 1,
        msg: name,
        errorMsg: "nothing"
    });
});
app.listen(8080);
console.log('Listening on port 8080...');
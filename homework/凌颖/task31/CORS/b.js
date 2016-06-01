/*
老师 这个我并没有跑起来 如果下次直播有空的话 麻烦老师在下次直播上讲一下
*/

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.get('//b.com:8080/b', function(req, res) {
    var name = req.query.name; //lynn
    res.send({
        status: 1,
        msg: name,
        errorMsg: "nothing"
    });
});


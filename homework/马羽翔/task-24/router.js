/**
 * 这里是接口范例，可根据需求进行修改
 * 可在当前项目文件夹下直接新建 html文件，向对应接口发送请求
 */


/**
 * 发送 GET 请求， 无参数
 * GET /hello
 * 返回响应数据
 */
app.get('/loadMore', function(req, res) {
	var start=Number(req.query.index),
		len=Number(req.query.len),
	    data=[],
        i=start;
    console.log(i);
    if(i<=17){
        for (i;i<start+len;i++){
		data.push("内容"+i);
	}
	res.send({
		status: 1,
		data:data
	});    
    }
	else {
        res.send({
            status: 0
        })
    }
});


/**
 * 发送 GET 请求, 有参数
 * GET /user/100
 * query = { name: 'ruoyu', age: 28 }
 */
app.get('/tryget', function(req, res) {
    var name=req.query.name,
        psd=req.query.password;
	var userInfo={};
    if (name=="xiaoming"){
        if(psd=="abcd1234"){
            userInfo={
                status:1,
                name: name,
                id:'qw025877',
                lvl:'15',
                character:'tank'
            }
        }
        else{
            userInfo={
                status:2,
                name:name
            }
        }
    }
    else{
        userInfo={
                status:0,
                name:name
            }
    }
	res.send(userInfo);
});


/**
 * 发送 POST 请求， 有参数
 * POST /comment
 * query = { comment: "这是评论内容" }
 */
app.post('/register', function(req, res) {
    var name=req.body.name;
    var cheRes={};
    if (name=="helloworld"){
        cheRes={
            status:0,
            name:"unavailable"
        }
    }
    else{
        cheRes={
            status:1,
            name:"available"
        }
    }
	res.send(cheRes);
});

/**
 * 发送 POST 请求， 有参数
 * POST /trypost
 * query = { comment: "这是评论内容" }
 */
app.post('/trypost', function(req, res) {
    var name=req.body.name,
        psd=req.body.password;
    var userInfo={};
    if (name=="xiaoming"){
        if(psd=="abcd1234"){
            userInfo={
                status:1,
                name: name,
                id:'qw025877',
                lvl:'15',
                character:'tank'
            }
        }
        else{
            userInfo={
                status:2,
                name:name
            }
        }
    }
    else{
        userInfoInfo={
                status:0,
                name:name
            }
    }
	res.send(userInfo);
});



/**
 * 页面路由，从模板渲染页面渲染页面, 
 * htttp://localhost:8080/user
 * 支持 ejs, jade 模板
 */
app.get('/user', function(req, res) {
	res.render('user.ejs', {
		username: '饥人谷'
	});
});
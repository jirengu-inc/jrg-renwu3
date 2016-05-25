/**
 * 这里是接口范例，可根据需求进行修改
 * 可在当前项目文件夹下直接新建 html文件，向对应接口发送请求
 */


/**
 * 发送 GET 请求， 无参数
 * GET /getMore
 * 返回响应数据
 */
app.get('/getMore', function(req, res) {
	var start =  Number(req.query.start);
	var len = Number(req.query.len);
	var data = [];
	for(var i=start;i<start+len;i++){
		data.push('内容'+i);
	}
	res.send({
		status:0,
		data: data
	});
});

/**
 * 发送 GET 请求， 有参数
 * GET /form
 * 返回响应数据
 */
app.post('/form', function(req, res) {
	var  username= req.body.username;
	var MSG = {
		'USERNAME_EXIST': '用户名已经存在',
		'USERNAME_TYPE_ERROR': '用户名格式不正确',
		'USERNAME_USEABLE': '用户名可用',
		'PASSWORD_TYPE_ERROR': '密码格式不正确',
		'PASSWORD_NOT_MATCH': '两次密码输入不一致'
	};
	var obj = {};
	if (username === 'lynn123'){
		obj = {
			status:1,
			msg_type:MSG.USERNAME_EXIST
		};
	}else{
		obj ={
			status:0
		}
	}
	res.send(obj);
});


/**
 * 发送 GET 请求, 有参数
 * GET /user/100
 * query = { name: 'ruoyu', age: 28 }
 */
app.get('/user/:uid', function(req, res) {
	console.log(req.params.uid); //100
	console.log(req.query.name); // 'ruoyu'
	res.send({
		status: 1,
		errorMsg: "请先注册"
	});
});

/**getmore
 * 发送 GET 请求
 * GET /username
 *
 */
app.get('/username/:uid', function(req, res) {
	var obj={};
	if(req.params.uid === 'hunger'){
		obj={
			sex : "男",
			age : "28"
		};
	}else if(req.params.uid === 'lynn'){
		obj={
			sex : "女",
			age : "22"
		};
	}else{
		obj={
			sex : "女",
			age : "18"
		};
	}
	res.send(obj);
});

/**
 * 发送 POST 请求， 有参数
 * POST /comment
 * query = { comment: "这是评论内容" }
 */
app.post('/comment', function(req, res) {
	console.log(req.body.comment); // "这是评论内容"
	res.send({
		status: 0,
		data: {
			cid: 100,
			comment: "这是评论内容"
		}
	});
});



/*
*
 * 页面路由，从模板渲染页面渲染页面, 
 * http://localhost:8080/user
 * 支持 ejs, jade 模板
 * */
app.get('/user', function(req, res) {
	res.render('user.ejs', {
		username: '饥人谷'
	});
});

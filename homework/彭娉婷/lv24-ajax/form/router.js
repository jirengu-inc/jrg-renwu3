/**
 * 这里是接口范例，可根据需求进行修改
 * 可在当前项目文件夹下直接新建 html文件，向对应接口发送请求
 */


/**
 * 发送 GET 请求， 无参数
 * GET /hello
 * 返回响应数据
 */
app.get('/hello', function(req, res) {
	res.send({
		status: 0,
		msg: "hello 饥人谷"
	});
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


/**
 * 发送 POST 请求， 有参数
 * POST /comment
 * query = { comment: "这是评论内容" }
 */
 app.post('/form', function(req, res) {
 	console.log(req.body.username);
 	var MSG = {
 		'USERNAME_EXIST': '用户名已经存在',
 		'USERNAME_TYPE_ERROR': '用户名格式不正确',
 		'USERNAME_USEABLE': '用户名可用',
 		'PASSWORD_TYPE_ERROR': '密码格式不正确',
 		'PASSWORD_NOT_MATCH': '两次密码输入不一致'
 	};
 	var obj={};
 	if(username==='simple'){
 		obj = {
 			status:1,
 			msg_type:MSG.USERNAME_EXIST
 		}
 	}else{
 		obj ={
 			status:0
 		}
 	}
 	res.send(obj);
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
/**
 * 这里是接口范例，可根据需求进行修改
 * 可在当前项目文件夹下直接新建 html文件，向对应接口发送请求
 */

/*约定数据格式
地址： email
传参：data{emailvalue : emailvalue}
回参：data{
	status:0//可用
       1//已经存在
	}
ype;post
*/
app.post('/email', function(req, res) {
	if(req.body.emailvalue==='4523@qq.com'){
		res.send({
		   status: 1
		})
	}
	else{
			res.send({
			status: 0
		})
	};
});

/*约定数据格式
地址：username
传参：data{name : username.value}
回参：data{
		status:0//可用
			 1//已经存在
		}
type;post
 */
app.post('/username', function(req, res) {
	console.log(req.body.name);
	if(req.body.name==='findmoon'){
		res.send({
		status: 1
		})
	}else{
		res.send({
		status: 0
		})
	}

});

// jsonp跨域请求
app.get('/data',function (req, res) {
	// console.log(req.query);
	/*var a=req.query.callback+'("我是b.com下的请求返回")';*/
/*	var a=req.query.callback+'('+ "{a:'b.com下'}" +')';

	res.send(a);
*/
	//拿到数据
	// var userData = {
	// 	name:'findmoon',
	// 	age: 24,
	// 	work: 'coder'
	// }

	// var userDataString = JSON.stringify(userData);

	// var data = req.query.callback + '(' + userDataString + ')';
	// res.send(data);

	res.set('Access-Control-Allow-Origin','http://a.com:8080');//设置响应头
	var data = 'cors请求';
	res.send(data);
});

/*
* 发送get请求，有参数
* /getmore
返回响应
 */
app.get('/getmore',function (req, res) {
	var start =  Number(req.query.start);
	var len = Number(req.query.len);
	var data = [];
	for(var i=start;i<start+len;i++){
		data.push('内容'+i);
	}
	res.send({
		status: 1,
		data: data
	});
});




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
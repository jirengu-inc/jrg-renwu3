
app.post('/register',function(req,res){
	var username = req.body.username;
	var obj = {};
	var usermsg = {
		'username_exist': '用户已存在'
	}
	if(username === 'huhuayuan'){
		obj = {
			status: 0,
			usermsg: usermsg.username_exist
		}
	}
	else {
		obj = {
			status: 1
		}
	}
	res.send(obj);
})

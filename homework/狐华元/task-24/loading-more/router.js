/**
 * 发送 GET 请求， 无参数
 * GET /setMore
 * 返回响应数据
 */
app.get('/getMore',function(req,res){
	var start = Number(req.query.current),
	    length = Number(req.query.length),
			data = [];
	for(var i=start; i<start+length; i++){
		data.push("第"+i+"条数据")
	}
	res.send({
		status: 0,
		data: data
	})
});

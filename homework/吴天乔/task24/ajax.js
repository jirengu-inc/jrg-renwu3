/**
 * @authors WTQ (tianqiaow@gmail.com)
 */

// 封装ajax函数
/**调用方式
 * ajax({
 * 	url: 'url',
 * 	type: 'get/post',
 * 	data: {
 * 		username: name1,
 * 		password: pswd
 * 	},
 * 	success: function(ret){
 * 		
 * 	},
 * 	error: function(){
 * 		
 * 	}
 * })
 */
function ajax(opts){

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadyStatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var ret = JSON.parse(xmlhttp.responseText);
			opts.success(ret);
		}
		if(xmlhttp.status !== 200){
			opts.error();
		}
	};

	var data = '';
	for(var key in opts.data){
		data += key + '=' + opts.data[key] + '&';	
	}

	data = data.substr(0, data.length-1);

	if(opts.type.toLowerCase() === 'get'){
		xmlhttp.open('get', opts.url + '?' + data, true);
		xmlhttp.send();
	}

 	if(opts.type.toLowerCase() === 'post'){
		xmlhttp.open('post', opts.url, true);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.send(data);
	}

	
}

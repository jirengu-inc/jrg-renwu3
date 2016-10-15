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
 xmlhttp.onreadystatechange = function(){
     if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
         console.log(xmlhttp.responseText);
         var ret = JSON.parse(xmlhttp.responseText);
         console.log(ret);
         opts.success(ret);
     }
     if(xmlhttp.readyState===4&&xmlhttp.status == 404){
         opts.error();
     }
 };
 var data = '';
 for(var key in opts.data){
     data += key + '=' + opts.data[key] + '&';   
 }
 data = data.substr(0, data.length-1);    // 去掉最后面的&
 if(opts.type.toLowerCase() === 'get'){
     opts.url += '?' + data;
     xmlhttp.open('get', opts.url, true);
     xmlhttp.send();
 }
     if(opts.type.toLowerCase() === 'post'){
     xmlhttp.open('post', opts.url, true);
     xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     xmlhttp.send(data);
 }
}
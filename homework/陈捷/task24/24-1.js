/**
ajax封装
 * 
 * @authors JayChenFE (chenjiehwy@163.com)
 * @date    2016-11-02 15:03:17
 * @version $1.0$
 */



// document.querySelector('#btn').addEventListener('click', function() {
// 	ajax({
// 		url: 'getData.php', //接口地址
// 		type: 'get', // 类型， post 或者 get,
// 		data: {
// 			username: 'xiaoming',
// 			password: 'abcd1234'
// 		},
// 		success: function(ret) {
// 			console.log(ret); // {status: 0}
// 		},
// 		error: function() {
// 			console.log('出错了');
// 		}
// 	});
// });

function ajax(opts) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = JSON.parse(xmlhttp.responseText);
            opts.success(result);
        }

        if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
            opts.error();
        }

    };

    var tmpArr = [];
    for (var key in opts.data) {
        tmpArr.push(key + "=" + opts.data[key]);
    }
    var data = tmpArr.join('&');

    if (opts.type.toLowerCase() === 'get') {
        xmlhttp.open('get', opts.url + '?' + data);
        xmlhttp.send(null);

    }

    if (opts.type.toLowerCase() === 'post') {
        xmlhttp.open('get', opts.url);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(data);
    }
}

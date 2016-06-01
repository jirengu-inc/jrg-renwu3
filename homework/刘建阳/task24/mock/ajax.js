function ajax(opts){
		    var xmlhttp = new XMLHttpRequest();
		    xmlhttp.onreadystatechange = function () {
		    	if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
		    		 opts.success(JSON.parse(xmlhttp.responseText));
		    	}
				if (xmlhttp.readyState == 4 && xmlhttp.status >= 500){
                	opts.error();
           		}
		    };

		    var dataStr = "";//将ajax的data转化为字符串形式
		    for(var k in opts.data){

		    	dataStr += k + "=" + opts.data[k] + "&"//拼装data的键值对，座位数据发送
		    };
		
		    dataStr = dataStr.substr(0,dataStr.length-1);//截取字符串的方式去掉最后的&
		 
		    if (opts.type.toLowerCase() == "post") {
		    	xmlhttp.open(opts.type,opts.url,true);
		    	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		    	xmlhttp.send(dataStr);
		    };
		    if (opts.type.toLowerCase() == "get") {
		    	xmlhttp.open(opts.type,opts.url+'?'+dataStr,true);
		    	xmlhttp.send();
		    };
		}//封装ajax
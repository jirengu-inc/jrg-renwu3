function ajax(opts){
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if(xml.status == 200 && xml.readyState == 4){
            if(opts.dataType.toLowerCase() == "json"){
                var json = JSON.parse(xml.responseText);//把response的字符串解析成出来
                opts.success(json);//success函数根据需求写
            }
            if(opts.dataType.toLowerCase() == "text"){
                opts.success(xml.responseText);//error函数根据需求写
            }

        }
        if(xml.status == 404){
            opts.error();
        }
    }
    var dataStr ="";// ajax 的data需要object格式
    for(k in opts.data){
      dataStr += k + '=' +opts.data[k] + '&';//拼装键值对
    }
    dataStr = dataStr.substr(0,dataStr.length-1);//并去除最后的‘&’
    if(opts.type.toLowerCase() == "post"){
        xml.open(opts.type,opts.url,true);
        xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xml.send(dataStr);
    }
    if(opts.type.toLowerCase() == "get"){
        xml.open(opts.type,opts.url+'?'+dataStr,true);
        xml.send();
    }
}

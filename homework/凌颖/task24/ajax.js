function ajax(opts){
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if(xml.status == 200 && xml.readyState == 4){
            if(opts.dataType.toLowerCase() == "json"){
                var json = JSON.parse(xml.responseText);
                opts.success(json);
            }
            if(opts.dataType.toLowerCase() == "text"){
                opts.success(xml.responseText);
            }

        }
        if(xml.status == 404){
            opts.error();
        }
    }
    var dataStr ="";
    for(k in opts.data){
      dataStr += k + '=' +opts.data[k] + '&';
    }
    dataStr = dataStr.substr(0,dataStr.length-1);
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

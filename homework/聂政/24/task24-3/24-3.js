function ajax(opts) {
    //  鍋氬弬鏁板吋瀹�
    opts.success = opts.success || function(){};
    opts.error = opts.error || function(){};
    opts.type = opts.type || 'get';
    opts.dataType = opts.dataType || 'json';
    opts.data = opts.data || {};

    //鎶� data閲岀殑鏁版嵁搴忓垪鍖栨垚 key=value&key2=value2 鐨勫舰寮�
    //
    var dataStr = '';
    for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&';
    }
    dataStr = dataStr.substr(0, dataStr.length - 1);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.status === 200){
                //濡傛暟鎹被鍨嬫槸 text, 鍒欎笉瑙ｆ瀽
                if(opts.dataType === 'text'){
                    opts.success(xmlhttp.responseText);
                }
                if(opts.dataType === 'json'){
                    var json = JSON.parse(xmlhttp.responseText);
                    opts.success(json);                 
                }
        
            }else{
                opts.error();
            }

        }
    };

    if (opts.type.toLowerCase() === 'post') {
        xmlhttp.open(opts.type, opts.url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(dataStr);
    }
    if (opts.type.toLowerCase() === 'get') {
        xmlhttp.open(opts.type, opts.url + '?' + dataStr, true);
        xmlhttp.send();
    }
}
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-07 22:34:15
 * @version $Id$
 */


function util(){};
util.prototype={
    //字符串两边的空白字符
    trim : function (str) {
        var re = /^\s*|\s*$/g;
        var result;
        result = str.replace(re,"");
        return result;
    },
    //class(类)操作的封装
    //el为dom元素，cls为操作的class， el.className获取el元素的class
    hasClass : function (el,cls) {
        var re1 = /^\b([\S]*)\b$/g;
        if (re1.test((cls))){
            var re2 = new RegExp('\\b'+cls+'\\b',"g");
            if(re2.test(el.className)){
                return true;
            }
            else{
                return false;
            }
        }
        else {
            return "这不是一个有效的类名";
        }
    },
    addClass : function (el,cls) {
        if(this.hasClass(el,cls) === false){
            el.className = el.className +" "+cls;
         }
        else{
            return "已经存在"
         }
    },
    removeClass : function (el,cls) {
        if(this.hasClass(el,cls) === true){
            var re3 = new RegExp('\\b'+cls+'\\b',"g");
            el.className = el.className.replace(re3,"");
        }
    },
    // 判断用户输入的是不是邮箱
    isEmail: function (str) {
        var re = /^[\w\.\-]+@[\w]+\.([A-Za-z\d]{2,})$/g;
        return re.test(str);
    },
    // 判断用户输入的是不是手机号
    isPhoneNum :function (str) {
        var re = /^1[3-8]\d{9}$/g;
        return re.test(str);
    },
    // 判断用户输入的是不是合法的用户名（长度6-20个字符，只能包括字母、数字、下划线）
    isValidUsername :function (str) {
        var re = /^[\w]{6,20}$/g;
        return re.test(str);
    },
    // 判断用户输入的是不是合法密码（长度6-20个字符，包括大写字母、小写字母、数字、下划线至少两种）
    isValidPassword :function (str) {
        var re = /^[\w]{6,20}$/g;
        if (re.test(str)){
            var re1 = /\d/g;
            var a=0,b=0,c=0,d=0;
            if(re1.test(str)=== false){
                a = 1;
            }
            var re2 = /[a-z]/g;
            if (re2.test(str)=== false){
                b = 1;
            }
            var re3 = /[A-Z]/g;
            if (re3.test(str)=== false){
                c = 1;
            }
            var re4 = /_/g;
            if (re3.test(str)=== false){
                d = 1;
            }
            var result = a+b+c+d;
            console.log(result);
            if(result === 3){
                return "请输入大写字母、小写字母、数字、下划线至少两种";
            }
            else {
                return "注册成功";
            }
        }
        else{
            return "密码不合法";
        }
    },
    // 从当前时间到未来日期的间隔时间
    getIntv :function (str) {
        var arr = str.split("-");
        var a = Date.parse(str)-Date.now();
        var b = 24*60*60*1000;
        var day = Math.floor(a/b);
        var hours = Math.floor((a/b - day)*24);
        var min = Math.floor(((a/b - day)*24- hours) *60);
        var seconds = Math.floor((((a/b - day)*24- hours) *60 - min)*60);
        return "现在距离"+arr[0]+"年"+arr[1]+"月"+arr[2]+"日"+"还剩"+day+"天"+(hours-8)+"小时"+min+"分钟"+seconds+"秒";
    },
            // 使用范例：getIntv("2017-01-01");现在距离2017年01月01日还剩255天10小时11分钟43秒
    // 获取n天前的日期
    getLastNDays :function (num) {
        var thatTime = new Date(Date.now()-num*24*60*60*1000);
        var years = thatTime.getFullYear();
        var month = thatTime.getMonth()+1;
        var date = thatTime.getDate();
        return years+"-"+month+"-"+date;
    },
            // 使用范例：var lastWeek =  getLastNDays(7);
            //          console.log(lastWeek);// "2016-4-13"
    // 对象深拷贝
    objCopy : function (obj) {
        var obj2 = {};
        for (var k in obj ){
            if((typeof obj[k] === "object") && (obj[k]!==null)){
                obj2[k] = copy(obj[k]);
            }
            obj2[k]= obj[k];
        }
        return obj2;
    },
    // 事件绑定的封装
    index: function(e,node){  // children No. 判断子元素序列
        for(var i=0;i<node.children.length;i++){
            if(e.target===node.children[i]){
                return i+1;
            }
        }
    },
    bind: function(elem,type,handler){
        if(elem.addEventListener){
            elem.addEventListener(type,handler,false);
        }else if(elem.attachEvent){
            elem.attachEvent("on"+type,handler);
        }else{
            elem["on"+type]=handler;
        }
    },
    unbind: function(elem,type,handler){
        if(elem.removeEventListener){
            elem.removeEventListener(type,handler,false);
        }else if(elem.detachEvent){
            elem.detachEvent("on"+type,handler);
        }else{
            elem["on"+type]=null;
        }
    },
    getTarget: function(event){
        return event.target||event.srcElement;
    },
    preventDefault: function(event){
        if(event,preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },

    // 原生js封装ajax  类似jquery
    ajax :function(opts){
    var xmlhttp = new XMLHttpRequest();
    var len = "";
    for(var k in opts.data){
        len =len + k+"="+opts.data[k]+"&";
    }
    len = len.substr(0,len.length-1);
    if(opts.type.toLowerCase()==="get"){
        opts.url = opts.url+"?"+len;
        xmlhttp.open(opts.type, opts.url,true);
        xmlhttp.send();
    }
    if(opts.type.toLowerCase()==="post") {
        xmlhttp.open(opts.type, opts.url, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(len);
    }
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState===4&&xmlhttp.status===200){
            var json = JSON.parse(xmlhttp.responseText);
            opts.success(json);
        }
        if(xmlhttp.readyState===4&&xmlhttp.status===404){
            opts.error();
        }
    }
}
    // 调用方法如下例子所示：
    // document.querySelector('#btn').addEventListener('click', function(){
    //     ajax({
    //         url: 'getData.php',   //接口地址
    //         type: 'get',               // 类型， post 或者 get,
    //         data: {
    //             username: 'xiaoming',
    //             password: 'abcd1234'
    //         },
    //         success: function(ret){
    //             console.log(ret);       // {status: 0}
    //         },
    //         error: function(){
    //             console.log('出错了')
    //         }
    //     })
    // });
};

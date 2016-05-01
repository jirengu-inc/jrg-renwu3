<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>For task 24-3</title>
  <style>
    .register{
      margin: 20px 30px;
    }
    .note{
      margin: 8px 110px;
      height: 12px;
      font-size: 12px;
      color: #aaa;
    }
    input{
      margin-left: 20px;
    }
    #name{
      margin-left: 36px;
    }
    #pwd{
      margin-left: 50px;
    }
    #submit{
      margin: 0 110px;
    }
    .warning{
      border-color: red;
    }
  </style>
</head>
<body>
  <div class="register">
    <p><strong>注册</strong></p>用户名：
    <input name="username" id="name" type="text" placeholder="用户名(hunger已被注册过)"><br>
    <p class="name-note note">只能是字母、数字、下划线，3-10个字符</p>密码：   
    <input name="pwd" id="pwd" type="text"><br>
    <p class="pwd-note note">大写字母、小写、数字、下划线最少两种，6-15个字符</p>再输一次：
    <input name="again" id="again" type="text" placeholder="请再输入一次密码"><br>
    <p class="again-note note"></p>
    <input type="submit" id="submit" value="注册">
  </div>

  <script>
    var userName =document.getElementById('name');
    var nameNote=document.getElementsByClassName('name-note')[0];
    var pwd=document.getElementById('pwd');
    var pwdNote=document.getElementsByClassName('pwd-note')[0];
    var again=document.getElementById('again');
    var againNote=document.getElementsByClassName('again-note')[0];
    var submit=document.getElementById('submit');
    var doing=false;
    pwd.addEventListener('blur',checkPwd,false);
    again.addEventListener('blur',compare,false);
    userName.addEventListener('blur',function(){ajax({
      url: 'get.php',
      method: 'get',
      data: {
        username:userName.value
      },
      pre: function(){
        return (checkName());
      },
      success: function(ret){
        doing=false;
        console.log(ret);
        console.log(ret==="false");
        console.log(ret==="true");
        if(ret==="false"){
          nameNote.innerText="用户名可用";
          removeClass(userName,'warning');
        };
        if(ret==="true") {
          nameNote.innerText="用户名已经存在 请重新输入";
          addClass(userName,'warning');
        };
      },
      error: function(){
        alert('服务器出错了');
      }
    })},false);
    submit.addEventListener('click',function(){ajax({                 // e.preventDefault();
      url: 'get.php',
      method: 'get',
      data: {
        username: userName.value,
        pwd: pwd.value
      },
      pre: function (){
        return ((!hasClass(userName,'warning')&&checkPwd()&&compare()&&checkName()));},
        success: function(ret){ 
          if(ret==='false')
            submit.value='注册中';
          alert('正在注册');
        },
        error: function(){
          alert('服务器出错了');
        }
      });
  },false);
    function ajax(opts){
      if(opts.pre()===false){
        return;
      }
      doing=true;
      var str="";
      var request = new XMLHttpRequest();
      for (var i in opts.data){
        str += i+'='+opts.data[i]+'&';
      }
      str = str.substr(0,str.length-1);
      if(opts.method === 'get'){
        request.open('get',opts.url+'?'+str,true);
        request.send();
      }
      if(opts.method === 'post'){
        request.open('post',opts.url,true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        console.log(str);
        request.send(str);
      }
      request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
          var ret=JSON.parse(request.responseText);
          opts.success(ret);
        }
        if(request.status!==200){
          opts.error();
        }
      }
    }
    function checkName(){
      if(/^\w{3,10}$/.test(userName.value)){
        nameNote.innerText='';
        removeClass(userName,'warning');
        return true;
      }else {
        nameNote.innerText='用户名格式不正确 请重新输入';
        addClass(userName,'warning');
        return false;          
      }
    }
    function checkPwd(){
      var i=0;
      if(/^\w{6,15}$/.test(pwd.value)){
        if(/[a-z]/.test(pwd.value)){
          i++;
        };
        if(/[A-Z]/.test(pwd.value)){
          i++
        };
        if(/[0-9]/.test(pwd.value)){
          i++
        };
        if(/_/.test(pwd.value)){
          i++
        };
        if(i>1){
          removeClass(pwd,'warning');
          pwdNote.innerText='';
          return true;
        }else {
          pwdNote.innerText='密码格式不正确 请重新输入';
          addClass(pwd,'warning');
          return false;
        }
      }else {
        addClass(pwd,'warning');
        pwdNote.innerText='密码格式不正确 请重新输入';
        return false;
      }
    }
    function compare(){
      if(pwd.value!==again.value){
        addClass(again,'warning');
        againNote.innerText='两次密码不一致 请重新输入';
        return false;
      }else {
        removeClass(again,'warning');
        againNote.innerText='';
        return true;
      }
    }
    function hasClass(el, cls){
      var regex=new RegExp('\\b'+cls+'\\b','g');
      return regex.test(el.className);
    }
    function addClass(el, cls){
      if(hasClass(el,cls)===false){
        el.className += " "+cls;
      }
    }
    function removeClass(el,cls){
      if(hasClass(el,cls)===true){
        var regex=new RegExp('\\b'+cls+'\\b','g');
        el.className=el.className.replace(regex,"");
        el.className=el.className.replace(/\s{2}/g," ");
      }
    }
  </script>
</body>
</html>
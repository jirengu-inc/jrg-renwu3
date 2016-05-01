<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>For task 22-2</title>
  <style>
    ul{
      padding: 0;
    }
    #list li{
      list-style: none;
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;
    }
    .ct a{
      text-decoration: none;
      color: #e27272;
      padding: 10px;
      border: 1px solid #e27272;
    }
    .ct{
      text-align: center;
    }
  </style>
</head>
<body>
  <ul id="list">
    <li>内容1</li>
    <li>内容2</li>
  </ul>
  <div class="ct">
    <a href="#" class="btn">加载更多</a>    
  </div>
  <script>
    function ajax(opts){
      var request = new  XMLHttpRequest();
      var str = '';
      for(i in opts.data){
        str += i+'='+opts.data[i]+'&';
      }
      str = str.substr(0, str.length-1); 
      if(opts.type.toLowerCase() === 'get'){
        request.open('GET', opts.url+'?'+str, true);
        request.send();
      }
      if(opts.type.toLowerCase() === 'post'){
        resuest.open('POST', opts.url, true);
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(str);
      }
      request.onreadystatechange=function(){
        if(request.readyState==4 && request.status==200){
          var ret=JSON.parse(request.responseText);
          opts.success(ret);
        }
        if(request.status!==200){
          opts.error();
        }
      }
    }
    var repeat=false;
    var count=3;
    document.querySelector('.btn').addEventListener('click', function(e){
      if(repeat){
        return;
      }
      document.querySelector('.btn').innerText="载入中..";
      repeat=true;
      e.preventDefault();
      ajax({
        url: 'getData.php',   //接口地址
        type: 'get',               // 类型， post 或者 get,
        data: {
          start: count,
          len: 6
        },
        success: function(ret){
          repeat=false;
          var docFrag=document.createDocumentFragment();
          for (var i=0;i<ret.length;i++){
            var li=document.createElement('li');
            li.innerText=ret[i];
            docFrag.appendChild(li);
          }
          var ct=document.getElementById('list');   
          console.log(ct);    // {status: 0}
          ct.appendChild(docFrag);
          document.querySelector('.btn').innerText="加载更多";
          count += 6;
        },
        error: function(){
         alert('出错了');
       }
     })
    });

  </script>
</body>
</html>
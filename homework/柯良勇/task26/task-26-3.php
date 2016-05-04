<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>For task 25-3</title>
  <style>
    .btn{
      display: block;
      text-align: center;
      width: 80px;
      height: 36px;
      line-height: 36px;
      margin: 0 auto;
      cursor: pointer;
      color: red;
      border: 1px solid red;
      border-radius: 3px;
    }
    .btn img{
      width: 36px;
      height: 36px;
    }
    .con p{
      border: 1px solid #ccc;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="ct">
    <div class="con">
      <p>内容1</p>
      <p>内容2</p>
    </div>
    <span class="btn">加载更多</span>
  </div>
  <script src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js"></script>
  <script>
    $('.con').on('mouseover','p',function(){
      $(this).css('backgroundColor','green')
    }).on('mouseout','p',function(){
      $(this).css('backgroundColor','white')
    });
    var doing=false;
    var count=2;
    $('.btn').on('click',function(){
      if(doing){
        return;
      }
      doing=true;
      $(this).html('<img src="loading.gif">');
      $.ajax({
        url:'getdata.php',
        type:'GET',
        data: {
          start: count,
          len: 6
        },
        success: success,
        error: error
      });
    });
    function success(ret){
      var ret=JSON.parse(ret);
      if(ret.status===1){
        for(var i=0;i<ret.data.length;i++){
          $('.con').append('<p>'+ret.data[i]+'</p>');
        }
        $('.btn').text('加载更多');
        doing=false;
        count+=6;
      }else error();
    }
    function error(){
      alert('服务器出错了');
    }
  </script>
</body>
</html>
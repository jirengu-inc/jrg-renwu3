#jQuery Slide插件
###这是一个面向对象的插件，使用前需要准备如下例所示的HTML：
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>slides</title>
<style>
  *{margin: 0; padding: 0;}
</style>
</head>
<body>
   <div class="arts">
          <img class="pic" src="images/slide1.jpg">
          <img class="pic" src="images/slide2.jpg">
          <img class="pic" src="images/slide3.jpg">
          <img class="pic" src="images/slide4.jpg">
          <img class="pic" src="images/slide5.jpg">
  </div>
  <script src="slides/jquery-1.11.2.js"></script>
  <script src="slides/pack.js"></script>
</body>
</html>
```
###调用方式
```
  <script>
  	$('.arts').slides({
	  width: 300,
	  height: 200,
	  auto: true,
	  nav: true
	})
  </script> 
```
###插件参数
#####设置展示区域的宽度和高度
width & height（必须） 
#####设置自动播放
auto:true/false
#####设置左右滑动按钮
nav:true
###主要功能
左右滑动、自动播放、当设置了自动播放时，鼠标移入滑动区域停止播放，鼠标离开则继续自动播放
以上便是这个插件的所有功能介绍
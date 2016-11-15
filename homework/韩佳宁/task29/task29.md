# 问答

- 如何判断一个元素是否出现在窗口可视范围

  ```javascript
  function isVisible($e) {
      var winH = $(window).height(), //窗口高度
          offsetH = $e.offset().top, //此元素垂直方向偏移
          scrollH = $(window).scrollTop() //垂直滚动距离
      if ((offsetH > scrollH) && (offsetH < scrollH + winH)) {//根据这三个参数的值进行判定
          return true
      }
      return false
  }
  ```

- 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。每次出现都在控制台打印 `true`

  ```javascript
  var $e = $("p");
  $(window).on("scroll",function(){
   isVisible($e);
  });
  function isVisible($e){
    var winHeight = $(window).height(),
        WinTop = $(window).scrollTop(),
        offsetTop = $e.offset().top
    if(offsetTop < winHeight+WinTop){
        console.log("位于可视区域内")
        return true
    }else{
        return false
   }
  }
  ```

- 图片懒加载的原理是什么？    
  把图片真实的**URL** 放在`data-img`的值中,当图片进入可视区域的瞬间把`data-img`赋给`src`

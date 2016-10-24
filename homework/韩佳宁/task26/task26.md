## 问答   
- `Jquery` 中， `$(document).ready()`是什么意思？和`window.onload` 的区别？ 还有其他什么写法或者替代方法？
  - `onload`
  在页面还有图像**全部**加载完成后立即发生
  一般绑定在`body`元素上(当然也可以绑定在别的元素)
  如果有多个`window.onload`,那么只会有一个(最后一个)起作用
  ```js
  window.onload = function () {
    console.log("1");
  }
  window.onload = function () {
    console.log("2");
  }
  window.onload = function () {
    console.log("3");
  }
  //3
  ```
  - `$(document).ready()`
  是当DOM结构加载完毕时,执行传入的函数.   
  可以有`$(document).ready()`,都会被执行.
  可以简写为`$(callback)`
  `$()`参数为函数时,代表着当DOM结构加载完毕时,执行传入的函数.
  ```js
  $(document).ready(console.log("1"))
  $(document).ready(console.log("2"))
  $(document).ready(console.log("3"))
  //1
  //2
  //3
  ```

- `$node.html()`和`$node.text()`的区别?
  - `$node.html()`
  ** 获取**`$node.html()`中第一个匹配元素的HTML内容   
  当传入参数时
    - `$node.html() `
    `.html( htmlString )`  ** 设置**`$node.html()`中每一个匹配元素的html内容。
  - `$node.text()`
    无参数时为取得所有匹配元素的内容
    有参数时为设置所有匹配元素的内容
- `$.extend` 的作用和用法?
  `$.extend()` 函数用于将一个或多个对象的内容**合并**到目标对象
  ```js
  jQuery.extend( [deep],target [, object1 ] [, objectN ] )
  ```
  `deep`设置是否进行深拷贝,默认false仅仅浅拷贝.设置为true后为深拷贝.


  - `extend`实现深拷贝
  ```js
  var obj1 = {
  a:{a:1,b:2},
  }
  var j1 =$.extend({},obj1)
  var j2 =$.extend(true,{},obj1)
  obj1.a.b =33333
  console.log(obj1)//{a:{a:1,b:2},}
  console.log(j1)//{a:{a:1,b:2},} 浅拷贝
  console.log(j2)//{a:{a:1,b:33333},} 深度拷贝
  ```
  - 深度合并
   就像Windows里合并两个文件夹一样
  ```js
  var obj1 = {
    a:{a:1,
      b:2,
      c:{a:1}
    }
  }
  var obj2 = {
    a:{
      c:3,
      d:4,
      c:{a:222,b:2}}
  }
  var j1 =$.extend(true,{},obj1,obj2)
    console.log(j1)
/**  
  {
   a:{
     a: 1,
     b: 2,
     c:{
       a: 222,
       b: 2
     }
   }
 }
**/  
  ```

- `JQuery` 的链式调用是什么？
  链式调用指的是在调用完一个函数之后，不需要新建一个对象变量，能够继续调用其他函数。
  ```js
  $("li").removeClass("hide").addClass("active").removeClass("ct").addClass("clearfix")
  ```
- `JQuery ajax` 中缓存怎样控制?
  通过控制`cache`参数.禁止为false,允许为true.
- `jquery 中 data` 函数的作用
  `data([key],[value])`在元素上存放数据,返回jQuery对象。
  参数也可以是对象

## 代码   

- - 写出以下功能对应的 jQuery 方法：   

   - 给元素 `$node` 添加 `class` `active`，给元素 `$noed` 删除 `class` `active`
     ```js
     $node.addClass('active')
     $node.removeClass('active')
     ```
   - 展示元素`$node`, 隐藏元素`$node`
     ```js
     $node.hide()
     $node.show()
     ```
   - 获取元素`$node` 的 属性: `id`、`src`、`title`， 修改以上属性
    ```js
    $node.attr(id,"box")
    $node.attr(src,"https://google.com")
    $node.attr(title,"23333")
    $node.attr(id) //box
    $node.attr(src)//https://google.com
    $node.attr(title)//23333
    ```
   - 给`$node` 添加自定义属性`data-src`
     ```js
     $node.data('data-src',"hello")
     ```
   - 在`$ct` 内部最开头添加元素`$node`
     ```js
     $ct.prepend($node)
     ```
   - 在`$ct` 内部最末尾添加元素`$node`
      ```js
      $ct.append($node)
      ```
   - 删除`$node`
      ```js
      $ct.remove($node)
      ```
   - 把`$ct`里内容清空
     ```js
     $ct.empty()
     ```
   - 在`$ct` 里设置 `html` `<div class="btn"></div>`
     ```js
     $ct.html(`<div class="btn"></div>`)
     ```
   - 获取、设置`$node` 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
     - `.width()`和`.height()`
       没有参数时获得匹配的元素集合中的第一个元素的当前经**计算**的宽度/高度
       `.css( "height" )`和`.height()`的区别在后
       `.height()`返回一个**无单位**的**像素值**（比如说，400）
       `.css( "height" )`返回一个带完整单位的值（比如说，400px）
       如果元素的宽度/高度需要用在数学计算中，应使用`.height()`方法

       **注意**!!!不同版本的jQuery对于`box-sizing:border-box`的情况返回值有差异
       1.9.1版
       ```html
       <style>
       div{
         box-sizing:border-box;
         width:100px;
         border:5px solid black;
       }
       </style>
       <body>
         <div>1.9.1</div>
         <script type="text/javascript">
            $("div").css("width")//"90.4px"
            $("div").width() //90.4
         </script>
       </body>
       ```

       1.11.1版本和2.1.1版
       ```html
       <style>
       div{
         box-sizing:border-box;
         width:100px;
         border:5px solid black;
       }
       </style>
       <body>
         <div>1.11.1和2.1.1</div>
         <script type="text/javascript">
            $("div").css("width")//"100px"
            $("div").width() //90.4
         </script>
       </body>
       ```
       有参数时,是设置`width`,`height`
      - `.innerWidth()`和`.innerHeight()`   
        无参数时获取包含`padding`,`的宽度/高度`.
        有参数时是设置
      - `.outerWidth()`和`.outerHeight()`
        无参数时获取包含`padding` `border`,的宽度/高度.
        参数为`true`时获取包含`padding` `border`,`margin`的宽度/高度
        参数为`true`时获取包含`padding` `border`,`margin`的宽度/高度
        有参数时为设置整个盒模型的

      **当元素为`box-sizing:border-box;`时,使用和获取/设置宽高的方法要慎重.**

   - 获取窗口滚动条垂直滚动距离
     `$(document).scrollTop()`
     `scrollTop()`用于获得针对匹配的元素集合中第一个元素的滚动条的当前垂直位置

   - 获取`$node` 到根节点水平、垂直偏移距离   
      `$node.offset();`
   - 修改`$node` 的样式，字体颜色设置红色，字体大小设置14px   
      `$node.css({
        'color': 'red',
        'font-size': '14px'
        });`
      一般情况下不推荐直接用JS操作css
      使用增删class的手段更好
   - 遍历节点，把每个节点里面的文本内容重复一遍   
      ```js
        .each(function(index,element){
        $(this).text($(this).text()+$(this).text());
        });
      ```
   - 从`$ct` 里查找 `class` 为 `.item`的子元素   
    `$ct.find('.item')`
   - 获取`$ct` 里面的所有孩子   
      `$ct.children()`
   - 对于`$node`，向上找到 `class` 为`.ct`的父亲，在从该父亲找到`.panel`的孩子   
    `$node.parents('.ct').find('.panel')`
   - 获取选择元素的数量   
    `.length`
   - 获取当前元素在兄弟中的排行
      `.index()`

-------------------------------------
## 代码题
- 简单实现以下操作
  当点击$btn 时，让 $btn 的背景色变为红色再变为蓝色
  当窗口滚动时，获取垂直滚动距离
  当鼠标放置到$div 上，把$div 背景色改为红色，移出鼠标背景色变为白色
  当鼠标激活 input 输入框时让输入框边框变为蓝色，当输入框内容改变时把输入框里的文字小写变为大写，当输入框失去焦点时去掉边框蓝色，控制台展示输入框里的文字
  当选择 select 后，获取用户选择的内容

-

```php
<?php
    // 后端 php 测试接口文件
    $start = $_GET['start']; //2
    $len = $_GET['len'];  //6
    $items = array();

    for($i = 0; $i < $len; $i++){
        array_push($items, '内容' . ($start+$i));
    }
    $ret = array('status'=>1, 'data'=>$items);

    //{status: 1, data: ['内容1','内容2','内容3']}
    sleep(0.5);
    echo json_encode($ret);
```

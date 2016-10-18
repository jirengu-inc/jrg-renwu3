# 问答

- 说说库和框架的区别？   
  - 库（Library），可理解为工具箱，里面有可以直接拿来使用的方法和工具，以及可以调用的API。
    一些原生JS实现起来较为复杂的操作,都被封装进了库中,以备使用.
    比如jQuery,Underscore等
  - 框架（Framework），可以理解为搭好的模型架子，可以直接往里面添加内容或进行装饰。
    比如 react,vue,angular,bootstrap.
  - jQuery 是个库
- jQuery 能做什么？   
  1. 操控数据
  2. 操作DOM节点
  3. 事件
  4. AJAX
  5. 效果和动画
  6. HTML模板
  7. 主题和组件
  8. 插件
  9. 图标
  10. APP的架构

- jquery 对象和 DOM 原生对象有什么区别？如何转化？   
  DOM 原生对象是用原生js获取的DOM对象
  jquery 对象是类数组,是被选择器选中元素的集合.jquery 对象有自己的方法
  ```js
  var obj = querySelector('.class')
  var $obj = $(obj) //原生DOM对象obj转jQuery对象
  var obj2 = $("selecter")[2]//原生DOM对象
  var $obj3 = $("selecter").eq(2)//jQuery对象
  ```

- jquery中如何绑定事件？   

- `bind`、`unbind`、`delegate`、`live`、`on`、`off`都有什么作用？推荐使用哪种

  - `bind()`
  绑定事件
  ```js
  $('a').bind('click', function() {
    alert("That tickles!")
  })
  ```
  - `unbind`   
    解除事件绑定
    ```js
    $('#test-bind').unbind('mouseenter');
    ```
  - `live()`   
  用于绑定事件

  ```js
  $('a').live('click', function() {
    alert("That tickles!")
  })
  ```
  把函数绑定到`$(document)`上,并使用`click`和`a`作为参数
  所有事件冒泡到document节点时,就查看该事件是否是一个`click`事件
  以及该事件的目标元素与`a`选择器是否匹配，如果都是的话，则执行函数

  这种机制想想就挺慢的,所以理所当然的被废弃了
  - `.delegate()`
  与`live()`类似
  ```js
  $('#container').delegate('a', 'click', function() {
    alert("That tickles!")
  })
  ```
  当有事件冒泡到`$('#container')`时，    
  查看该事件是否是`click`事件，以及该事件的目标元素是否与选择器相匹配   
  如果都是的话，则执行函数

  现在推荐使用`on()`,`off()`来绑定/解除事件.

- `on()`   
  用于绑定事件处理函数
  ```js
  .on( events [,selector ] [,data ], handler(eventObject) )
  ```
  - `events`   
  一个或多个空格分隔的事件类型和可选的命名空间，或仅仅是命名空间，比如`click`,`mouseenter`,`mouseleave`
  - `selector`   
  一个选择器字符串，用于过滤出被选中的元素中能触发事件的**后代**元素   
  如果选择器是` null `或者忽略了该选择器，那么被选中的元素总是能触发事件

  - `data`   
  当一个事件被触发时，要传递给事件处理函数的`event.data`

  - `handler(eventObject)`   
  事件被触发时，执行的函数。若该函数只是要执行`return false`的话，那么该位置可以写成 `false`

- `off()`   
移除事件处理函数
```js
  .off( events [, selector ] [, handler ] )
```
移除一个事件处理函数

- jquery 如何展示/隐藏元素？   

  `show()`/`hide()`用于展示/隐藏元素
  除此之外还可以通过`addClass()/removeClass()`控制CSS来展示/隐藏元素.

- jquery 动画如何使用？  
  - `animate()`
    ```js
    $(selector).animate({params},speed,callback)
    ```
    - `params` 定义形成动画的 CSS 属性(动画结束后的CSS)必选
    - `speed` 规定效果的时长.值:`slow`,`fast`或**毫秒**可选
    - `callback` 动画完成后所执行的函数,可选
  - `.delay()` 设置一个定时器，以**延迟** 执行**队列**中后续的项目。
  - `.clearQueue() `从队列中**删除所有**还**没有运行**过的项目。
  - `.stop() `在匹配的元素上**停止当前**正在运行的动画。
  - `.finish() `   
   针对匹配的元素  **停止当前** 正在运行的动画，**删除所有** 队列中的动画，并**结束所有** 动画

- 如何设置和获取元素内部 HTML 内容？如何设置和获取元素内部文本？   
  `$(selector).html()`设置html内容   
  `$(selector).text()`设置文本内容
  如果括号**为空则获取**, **有值则设置**

- 如何设置和获取表单用户输入或者选择的内容？如何设置和获取元素属性？   
  `$(selector).val`获取和设置表单内容   
  `$(selector).attr()`获取和设置元素属性。


`

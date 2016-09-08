函数：具有一定功能的一块代码
---------------------------
声明:
```js
function functionName() {

}

var a = function =() {

}
var b = function functionName() {
  functionName 只能在这里用
}
```   
具名行数
匿名函数
给匿名函数命名



声明了立即调用
(function(){}).call()
!function(){}.call()
var a = function(){}.call()


  调用 基本等于 执行 基本等于 运行




.call 进入代码块

return  退出




this 执行上下文  默认指向 window
每个函数都有  this auguments

.call() 第一个参数 是 this 后面的是  默认指向 window
不传入的话 默认 this  默认指向 window

 默认指向 window


arguments是个伪数组
 arguments 伪数组
{
    0: 第一个参数,
    1: 第二个参数
    2
    "length":  3
}
function area(){
   var width = arguments[0];
   var height = arguments[1];
   return width * height;
}
方 2016/8/28 21:25:31
4.4 形参  - 给实参取名字



5.3 JS(ES6之前) 没有块级作用域




所有调用都应该脑补成 call的形式

obj1.prop.foo(1)



window.aaaa()  
=>   
window.aaaa.call(window)
方 2016/8/28 22:04:18
var obj = {  xxx: function(){}  }
方 2016/8/28 22:04:23
obj.xxx(1)
方 2016/8/28 22:04:31
obj.xxx.call(obj, 1)


内存泄漏: 有一块内存，你没有引用它，但是它一直占着这块内存，无法释放以被重新使用
闭包不存在泄露 (但是IE9和之前的版本有这个问题)

1.创建一个 Car 对象，拥有属性name、color、status；拥有方法run，stop，getStatus
```js
function Car(name,color,status){
  this.name = name;
  this.color = color;
  this.status = status;
}
Car.prototype = {
  run: function(){
    //...
  },
  stop: function(){
    //...
  },
  getStatus: function(){
    //...
  }
}
```
2.创建一个 GoTop 对象，当 new 一个 GotTop 对象则会在页面上创建一个回到顶部的元素，点击页面滚动到顶部。拥有以下属性和方法
 ct属性，GoTop 对应的 DOM 元素的容器
 target属性， GoTop 对应的 DOM 元素
 bindEvent 方法， 用于绑定事件
 createNode 方法， 用于在容器内创建节点
 ```js
 var $goTop = $('<button>返回顶部</button>');
 function GotTop($ct,$target){
   this.ct = $ct;
   this.target = $target;
 }
 GotTop.prototype = {
   bindEvent: function(){
     var self = this;
     this.target.on('click',function(){
       $(window).scrollTop(0);
     })
     $(window).on('scroll',function(){
       if($(this).scrollTop() > 600){
         self.target.show();
       } else {
         self.target.hide();
       }
     })
   },
   createNode: function(){
     this.ct.append(this.target)
   }
 }
 var GotTopFunc = new GotTop($('.content'),$goTop);
 GotTopFunc.createNode();
 GotTopFunc.bindEvent();
 ```

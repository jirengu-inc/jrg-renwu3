### 问答
#### apply、call 有什么作用，什么区别?
> apply、call都是为了改变当前this对象的指向。
apply和call的接受参数的方式不一样，apply是把参数放数组里传入，call是把参数一个个按书顺序传入（ func.apply(this,[arrr1,arr2...]),func.call(this,arr1,arr2,...) ）

### 代码
1.下面代码输出什么，为什么?

```js
var john = {
  firstName: "John"
}
function func() {
  alert(this.firstName + ": hi!")
}
john.sayHi = func //将func函数绑定到john对象上的sayHi属性上。现在func为john对象上的方法，调用函数时，this就绑定到john对象上
john.sayHi()  //执行结果为： John： hi！
//john调用sayHi函数，此时this为john，所以 this.firstName 的值为John
```

2.下面代码输出什么，为什么
```js
func() //函数被调用时，this被绑定到全局对象，浏览器中，window为全局对象。
function func() {
  alert(this) //执行结果为 object window 。
}
```

3.下面代码输出什么，为什么
```js
function fn0(){
    function fn(){
        console.log(this);
    }
    fn();
}

fn0(); // 执行结果为 window， 调用此函数的对象为window


document.addEventListener('click', function(e){
    console.log(this); // 点击页面，输出document。此时是因为document绑定click事件触发的，所以此时的this为document。
    setTimeout(function(){
        console.log(this); //setTimeout函数的this为window。
    }, 200);
}, false);

```

4.下面代码输出什么，为什么
```js
var john = {
  firstName: "John"
}

function func() {
  alert( this.firstName )
}
func.call(john) //执行结果为 John ，call方法将func函数内的this对象指向为john对象，john.firstName的值为John。
```

5.下面代码输出什么，为什么
```js
var john = {
  firstName: "John",
  surname: "Smith"
}

function func(a, b) {
  alert( this[a] + ' ' + this[b] )
}
func.call(john, 'firstName', 'surname') //执行结果为 John Smith ，call方法将func函数内的this对象指向为john对象，并传入参数firstName和surname，执行函数时，获取john[firstName]和john[surname]的值。
```

6.以下代码有什么问题，如何修改
```js
var module= {
  bind: function(){
    //添加  var self = this;   将this对象保存起来，此时的this为module对象。
    $btn.on('click', function(){
      console.log(this) //此处this指触发函数的 $btn对象。
      this.showMsg(); // 此时this无法触发showMsg函数。正确触发showMsg函数的对象应该为module。
      // this.showMsg(); 此句改为 self.showMsg();  self此时为module对象，可正确执行showMsg函数。
    })
  },

  showMsg: function(){
    console.log('饥人谷');
  }
}
```

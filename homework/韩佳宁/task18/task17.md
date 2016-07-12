---
title: task17
date: 2016-07-1 15:56:33
tags: javascript
---


## 代码题目

1. 以下代码输出什么？ （难度**）

``` javascript
    function getInfo(name, age, sex){
        console.log('name:',name);
        console.log('age:', age);
        console.log('sex:', sex);
        console.log(arguments);
        arguments[0] = 'valley';
        console.log('name', name);
    }

    getInfo('hunger', 28, '男');
    getInfo('hunger', 28);
    getInfo('男');

```    

分析如下

``` javascript
function getInfo(name, age, sex){
    console.log('name:',name);//打印字符串 name,打印参数name的值
    console.log('age:', age);//打印字符串 age,打印参数 age的值
    console.log('sex:', sex);//打印字符串 sex,打印参数sex的值
    console.log(arguments);// 打印 arguments对象
    arguments[0] = 'valley';// 把arguments对象的第一个值赋值为 字符串valley
    console.log('name', name);//打印字符串 name,打印参数name的值
}
getInfo('hunger', 28, '男');
// name:hunger
// age:28
// sex:男
// name:valley
getInfo('hunger', 28);
// name:hunger
// age:28
// sex:undefined
// name:valley
getInfo('男');
// name:男
// age:undefined
// sex:undefined
// name:valley
```


2 . 写一个函数，返回参数的平方和（难度**）


``` javascript
   function sumOfSquares(){
   }
   sumOfSquares(2,3,4);   // 29
   sumOfSquares(1,3);   // 10
```
分析

``` javascript
function sumOfSquares(a,b,c){
  if (a === undefined) {//计算之前先进行验证参数是否传入
    a = 0;
  }
  if (b === undefined) {
    b = 0;
  }
  if (c === undefined) {
    c = 0;
  }
var l = a*a;//算平方
var m = b*b;
var n = c*c;
console.log(l+m+n);//计算平方和
}

sumOfSquares(2,3,4);   // 29
sumOfSquares(1,3);   // 10
```






 3 . 如下代码的输出？为什么 （难度*）





``` javascript
    console.log(a);
    var a = 1;
    console.log(b);
```
分析

``` javascript

    var a;//变量提升,此时还是 undefined
    console.log(a);//undefined
    a = 1;
    console.log(b);// b 没有声明 b is not defined

//显示结果为
//undefined
//b is not defined



```



4 .  如下代码的输出？为什么 （难度*）

``` javascript
    sayName('world');
    sayAge(10);
    function sayName(name){
        console.log('hello ', name);
    }
    var sayAge = function(age){
        console.log(age);
    };
```
分析

``` javascript
function sayName(name){
    console.log('hello ', name);
}
var sayAge;

sayName('world'); //   hello world
sayAge(10);//在函数表达式之前sayAge()无法调用 ,sayAge还是undefined状态
var sayAge = function(age){
    console.log(age);
};
sayName('world'); //   hello world

//显示结果为
//hello world
//sayAge is not a function

```

5 .  如下代码的输出？为什么 （难度**）

``` javascript

    function fn(){}
    var fn = 3;
    console.log(fn);

```
分析

``` javascript
function fn(){}
var fn;
fn = 3;
console.log(fn);//3 函数fn被赋值操作覆盖掉了
//显示结果为
//3
```







6 .  如下代码的输出？为什么 （难度***）


```javascript
    function fn(fn2){
       console.log(fn2);
       var fn2 = 3;
       console.log(fn2);
       console.log(fn);
       function fn2(){
            console.log('fnnn2');
        }
     }
    fn(10);
```
分析

```javascript

function fn(fn2){
    var fn2;//fn2 此时是 undefined 吗?未必!
           //因为这个位置的fn2的值(也是初始值)由传入的参数决定
    function fn2(){
         console.log('fnnn2');
     }
   console.log(fn2);//fn2此时是函数 //打印函数fn
   fn2 = 3;// fn2被赋值为3 之前的内容被3覆盖掉
   console.log(fn2);//打印3
   console.log(fn);//fn是啥呢?找遍当前作用域没找到,
                    //最后在上一层作用域找到了,fn个是函数 打印函数fn

 }
fn(10);
//显示结果为
/*
function fn2(){
console.log('fnnn2');
}
3
 function fn(fn2){
 console.log(fn2);
    var fn2 = 3;
    console.log(fn2);
    console.log(fn);
    function fn2(){
    console.log('fnnn2');
     }
  }
  */
```


7 . 如下代码的输出？为什么 （难度***）

```javascript
    var fn = 1;
    function fn(fn){
         console.log(fn);
    }
    console.log(fn(fn));
```


分析

```javascript
var fn;
function fn(fn){
     console.log(fn);
}
fn = 1;    //函数fn被覆盖
console.log(fn(fn));

//显示结果为
// fn is not a function

```

8 . 如下代码的输出？为什么 （难度**）


```javascript
    //作用域
    console.log(j);
    console.log(i);
    for(var i=0; i<10; i++){
        var j = 100;
    }
    console.log(i);
    console.log(j);
```
分析

```javascript
var i;
var j;
console.log(j);//undefined
console.log(i);undefined
for(var i=0; i<10; i++){//只有函数才能构成作用域
    var j = 100;
}// i现在为10
console.log(i);//10
console.log(j);// 100


//显示结果为
//10
//100
```


9 . 如下代码的输出？为什么 （难度****）


```javascript
    fn();
    var i = 10;
    var fn = 20;
    console.log(i);
    function fn(){
        console.log(i);
        var i = 99;
        fn2();  
        console.log(i);
        function fn2(){
            i = 100;
        }
    }
```
分析

```javascript

var i;
var fn;
function fn(){
  var i;//在当前作用域下 i是 undefined
  function fn2(){
      i = 100;
  }
    console.log(i);//打印 i  此时i是 undefined
    i = 99;// i被赋值为99
    fn2();  //调用函数fn2() i被赋值为100
    console.log(i);  //100
}
fn();
i = 10;//i被赋值为10
fn = 20;//fn被赋值为20
console.log(i);// 10

//显示结果为
// undefined
//100
//10
```


10 . 如下代码的输出？为什么 （难度*****）

```javascript
    var say = 0;
    (function say(n){
        console.log(n);
        if(n<3) return;
        say(n-1);
    }( 10 ));
    console.log(say);
```
分析

```javascript
var say;
say = 0;
(
  function say(n){
    var n;
    console.log(n);//打印n 此时n 的值是参数传入值

    if(n<3) return;

    say(n-1);
}( 10 )
);//立即执行函数内的东西都是封闭的,对外界环境没有影响
// 10
//  9
//  8
//  7
//  6
//  5
//  4
//  3
//  2

console.log(say);//

//显示结果为
// 10 9 8 7 6 5 4 3 2 0

```

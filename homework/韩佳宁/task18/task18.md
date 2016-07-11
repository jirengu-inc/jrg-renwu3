---
title: task18
date: 2016-07-9 2:35:22
tags: javascript  代码题
---
# 代码题
## 数组

- 用 splice 实现 push、pop、shift、unshift方法

push

末尾添加一个或多个元素，并返回新的length

```js

  var arr1 = [1,2,3,4,5,6]
  var pushFunction = function(arr,val){
  var b = arr.splice(arr.length,0,val)
  return arr.length
}
  console.log(pushFunction(arr1,7))//7
  console.log(arr1)                //[1, 2, 3, 4, 5, 6, 7]

```

pop

删除最后一个元素,把length减1,返回所删除的元素的值

```js
var popFunction = function(arr){
  var b = arr.splice(arr.length-1,1)
  return b
}
var arr1 = [1,2,3,4,5,6,7,8]
console.log(popFunction(arr1)) // [8]
console.log(arr1);             // [1,2,3,4,5,6,7]
```

shift

删除第一个元素,返回删除的元素的值(若已为空，则不改变数组,返回undefined)

```js


var arr1 = [0,1,2]

var shiftFunction = function(arr){
  var a = arr.splice(0,1)
 if (arr.length ==0) {
     return undefined
 }
    return a
}
console.log(shiftFunction(arr1))// [0]
console.log(arr1)               // [1, 2]
console.log(shiftFunction(arr1))// [1]
console.log(arr1)               // [2]
console.log(shiftFunction(arr1))// undefined
console.log(arr1)               // []
```


unshift

数组的开头添加一个或多个元素，并返回新的length


```js

var arr1 = [1,2,3,4,5,6]

var unshiftFunction = function(arr,val){
  var a = arr.splice(0,0,val)
  return arr.length
}
console.log(unshiftFunction(arr1,0)) // 7
console.log(arr1)                    // [0, 1, 2, 3, 4, 5, 6]


```

- 使用数组拼接出如下字符串

```js
var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};
function getTpl(data){
//todo...
};
var result = getTplStr(prod);  //result为下面的字符串
```


```
<dl class="product">
    <dt>女装</dt>
    <dd>短款</dd>
    <dd>冬季</dd>
    <dd>春装</dd>
</dl>
```


```js
var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};
function getTpl(data){
  var tpl = '<dl class ="product">\n';  //注意 用 \n 换行
  tpl = tpl +'<dt>' + data.name + '</dt>\n';//把name中的内容转换成 字符串 并连接进tpl
  for (var i = 0; i < prod.styles.length; i++) {//遍历 style
    tpl = tpl +'<dd>'+data.styles[i] + '</dd> \n';
  }
  tpl = tpl + '</dl>';
  return tpl;
}
  var result = getTpl(prod)
  console.log(result)
 //"<dl class =\"product\">
 //<dt>女装</dt>
 //<dd>短款</dd>
 //<dd>冬季</dd>
 //<dd>春装</dd>
 //</dl>"
 ```


- 写一个find函数，实现下面的功能


```js
var arr = [ "test", 2, 1.5, false ]
find(arr, "test") // 0
find(arr, 2) // 1
find(arr, 0) // -1
```
功能:
传入 数组的某一元素,返回这个元素的键值,
如果传入的不是该数组的元素,返回-1

```js

var arr = [ "test", 2, 1.5, false ]

function find(arr, val){
        for(var i=0; i<arr.length; i++){// i 从0开始计数
            if(arr[i] === val){         //当 arr[i] 与 要查询的 val相等时 返回i
                return i;
            }
        }
          return -1;                    //要查询的  val 不是 数组内的元素返回 -1
    }


    find(arr, "test") // 0
    find(arr, 2)      // 1
    find(arr, 0)      // -1
    find(arr, 12)     //-1
```





- 写一个函数filterNumeric，实现如下功能

```js
arr = ["a", "b", 1, 3, 5, "b", 2];
newarr = filterNumeric(arr);  //   [1,3,5,2]
```

功能:
把传入的数组内的数值取出,放入一个新的数组

```js

function filterNumeric(arr){
  var = newarr[];                       //声明一个空数组 newarr
  for (var i = 0; i < arr.length; i++) {//遍历 arr
    if (typeof arr[i] === 'number') {  //判断 arr[i] 是否是 数值
      newarr.push(arr[i]);// 如果arr[i]是数值 就把它用push()装填进 newarr
    }
  }
  return newarr;
}
console.log(filterNumber(arr)) //[2, 1.5]

```






- 对象obj有个className属性，里面的值为的是空格分割的字符串(和html元素的class特性类似)，写addClass、removeClass函数，有如下功能：


```js
var obj = {
  className: 'open menu'
}
addClass(obj, 'new') // obj.className='open menu new'
addClass(obj, 'open')  // 因为open已经存在，此操作无任何办法
addClass(obj, 'me') // obj.className='open menu new me'
console.log(obj.className)  // "open menu new me"

removeClass(obj, 'open') // obj.className='menu new me'
removeClass(obj, 'blabla')  // 不变
```


#### addClass 思路

 1.把 className 里的字符串 转换成数组 放入 classArray 内
 2.判断数组 classArray 中是否存在与 cla 相同的元素
 3.存在则直接 break 什么也不做,不存在则继续执行下面的操作步骤
 4.用push()把 ela 作为新元素加入classArray  把新的 classArray 转换成字符串  覆盖obj.className
 4.或者直接将 className 与 ' ela' 进行拼接,赋给obj.className





```js
function addClass(obj,cla){
  var classArray = [];
  classArray = obj.className.split(' ');
  for (var i = 0; i < classArray.length; i++) {
    if (cla === classArray[i]) {
        return '元素 ' + cla +' 已存在';
    }
  }
  classArray.push(cla);
  obj.className = classArray.join(' ');// 这两行也可写成 obj.className = obj.className + ' ' + cla;
  return '元素 ' + cla +' 已添加';
}

var obj = {className: 'open menu'};

console.log(obj.className);   //"open menu"

console.log(addClass(obj,'open'));  //"元素 open 已存在"
console.log(obj.className);         //"open menu"

console.log(addClass(obj,'header'));//"元素 header 已添加"
console.log(obj.className);         //"open menu header"
```


#### removeClass思路
  1.把 className 里的字符串 转换成数组 放入 classArray 内
  2.判断数组 classArray 中是否存在与 cla 相同的元素
  3.不存在则直接 break 什么也不做,存在则输出该元素键值i 并继续执行下面的操作步骤
  4.用splic(classArray,i)删除 该元素,把新的 classArray 转换成字符串  覆盖obj.className


```js
function removeClass(obj,cla){
  var classArray = [];
  classArray = obj.className.split(' ');
  for (var i = 0; i < classArray.length; i++) {
    if (cla === classArray[i]) {
        classArray.splice(i,1);
        obj.className =classArray.join(' ');
      return cla + '已被删除';
    }
  }

  return '元素 ' + cla +'不存在';
}
var obj = {
  className: 'open menu'
};
console.log(obj.className);             //"open menu"
console.log(removeClass(obj,'open'));   //"open已被删除"
console.log(obj.className);             //"menu"
console.log(removeClass(obj,'header')); //"元素 header 不存在"
console.log(obj.className);             //"menu"
```




- 写一个camelize函数，把my-short-string形式的字符串转化成myShortString形式的字符串，如


```js
camelize("background-color") == 'backgroundColor'
camelize("list-style-image") == 'listStyleImage'
```
代码如下
```js

function camelize(str) {
  return str = str.split('-').join('');
}
console.log(camelize("background-color") );//"backgroundcolor"
console.log(camelize("list-style-image") );//"liststyleimage"

```


- 如下代码输出什么？为什么?
```js
arr = ["a", "b"];
arr.push( function() { alert(console.log('hello hunger valley')) } );
arr[arr.length-1]()
```
输出为 : // "hello hunger valley"

分析如下:

```js
arr = ["a", "b"];//建立一个数组
arr.push( function() { alert(console.log('hello hunger valley')) } );
//在数组末尾添加一个元素,这个元素是个函数
arr[arr.length-1]()
```

对于`arr[arr.length-1]()`
可以理解为
`arr[2]()`

即 `function() { alert(console.log('hello hunger valley')) }()`
所以输出结果为 "hello hunger valley"


- 写一个函数filterNumericInPlace，过滤数组中的数字，删除非数字

```js
arr = ["a", "b", 1, 3, 4, 5, "b", 2];
//对原数组进行操作，不需要返回值
filterNumericInPlace(arr);
console.log(arr)  // [1,3,4,5,2]
```


```js
function filterNumericInPlace(arr){
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number') {
      arr.splice(i,1);
      i--; //执行一次删减元素的操作后 arr.length发生了变化
    }      //相应的i也要跟着做出改变
  }
}

arr = ["a", "b", 1, 3, 4, 5, "b", 2];
filterNumericInPlace(arr);
console.log(arr)  // [1,3,4,5,2]    
```








- 写一个ageSort函数实现如下功能

```js
var john = { name: "John Smith", age: 23 }
var mary = { name: "Mary Key", age: 18 }
var bob = { name: "Bob small", age: 6 }
var people = [ john, mary, bob ]
ageSort(people) // [ bob, mary, john ]
```
功能:
根据people[i].age 对people内的对象排序

```js

function ageSort(people){
  var a;
  var b;
  people.sort(function(a,b){
    return a.age - b.age;
    // function(a,b)小于0,a排b之前;
    //等于0,a和b位置不变;
    //大于0 b在a之前
  });
  return people;
}

var john = { name: "John Smith", age: 23 };
var mary = { name: "Mary Key", age: 18 };
var bob = { name: "Bob small", age: 6 };
var people = [ john, mary, bob ];
console.log(ageSort(people));
/*
[
[object Object] {
  age: 6,
  name: "Bob small"
},
[object Object] {
  age: 18,
  name: "Mary Key"
},
 [object Object] {
  age: 23,
  name: "John Smith"
}
]
*/
```




- 写一个filter(arr, func) 函数用于过滤数组，接受两个参数，第一个是要处理的数组，第二个参数是回调函数(回调函数遍历接受每一个数组元素，当函数返回true时保留该元素，否则删除该元素)。实现如下功能：

```js
function isNumeric (el){
    return typeof el === 'number';
}
arr = ["a",3,4,true, -1, 2, "b"]

arr = filter(arr, isNumeric) ; // arr = [3,4,-1, 2],  过滤出数字
arr = filter(arr, function(val) { return val > 0 });  // arr = [2] 过滤出大于0的整数
```

```js

function isNumeric(el){
  return typeof el === 'number';//判断el是否是数值
}
function filter(arr,num){
  for (var i = 0; i < arr.length; i++) {
    if (!num(arr[i])) { // 根据回调函数的结果给出true或者false
      arr.splice(i,1);  // 删掉arr内不是数值的元素
      i--;              // 并相应的调整i
    }
  }
  return arr; //返回修改后的arr
}
var arr = ["a",3,4,true, -1, 2, "b"];
arr = filter(arr,isNumeric);                    //过滤出 不是数值的元素
console.log(arr);                               //[3, 4, -1, 2]
arr = filter(arr,function (val){return val >0});//过滤出小于0的元素
console.log(arr);                               //[3, 4, 2]
arr = filter(arr,function (val){return val%2 == 0});//过滤出奇数元素的元素
console.log(arr);                                   //[4, 2]
```
##　字符串


- 写一个 ucFirst函数，返回第一个字母为大写的字符

```js
ucFirst("hunger") == "Hunger"
```

需求:
1.把字符串第一个字母改为大写
2.如果遇到空字符串或者传入的不是字符串,得报错

```js
function ucFirst(str){
  if (typeof str === 'string'&&str !=='') {  // str 是字符串,且不是空字符串
    var firstLetter = str.charAt(0).toUpperCase();
    str = firstLetter + str.substring(1,str.length);
    return str;
  }
  return false;
}
console.log(ucFirst('panda')); //"Panda"
console.log(ucFirst(''));      // false 空字符串 报错
console.log(ucFirst(2016));    // false 非字符串 报错
```


- 写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上...，如

```js
truncate("hello, this is hunger valley,", 10) == "hello, thi...";
truncate("hello world", 20) == "hello world";
```
分析

```js
function truncate(str,maxlength){
  if (str.length>maxlength) {         //先判断str的长度是否大于maxlength
    str = str.substring(0,maxlength); //提取0到maxlength之间的字符
    str = str + '...'                 //把0到maxlength之间的字符和'...'拼接
  }
  return str;
}
console.log(truncate("hello, this is hunger valley,", 10));
console.log(truncate("hello world", 20));
console.log(truncate("早起的虫儿被鸟吃", 6));
```

## 数学函数

- 写一个函数limit2，保留数字小数点后两位，四舍五入， 如:

```js
var num1 = 3.456
limit2( num1 );  //3.46
limit2( 2.42 );    //2.42
```

需要用到Math对象的round方法
保留2位小数就先 "乘100 再/100 "

```js
function limit2(num){
  return num = Math.round(num*100)/100;

}
console.log(limit2(3.454));//3.45
console.log(limit2(3.455));//3.46
```
- 写一个函数，获取从min到max之间的随机数，包括min不包括max


random()方法提供的是0~1之间的伪随机数 需要*(max-min)
要注意的是random()的结果大于**等于**0,小于1
```js
function ranNum(min,max){
  var num;
  return num = Math.random()*(max-min) + min;
}
console.log(ranNum(1,100));
console.log(ranNum(200,15000));
```

- 写一个函数，获取从min都max之间的随机整数，包括min包括max
```js
function ranNum(min,max){
  var num;
  return num = Math.floor(Math.random()*(max-min) + min);
}
console.log(ranNum(1,100));
console.log(ranNum(200,15000));

```

- 写一个函数，获取一个随机数组，数组中元素为长度为len，最小值为min，最大值为max(包括)的随机数

```js
function ranArr(len,max,min) {
    var arr = [];
    for (var i = 0;i<len; i++) {
      arr.push(Math.floor(Math.random()*(max-min) + min));
    }
    return arr;
}
console.log(ranArr(8,88,95));//[92, 92, 92, 93, 93, 88, 93, 89]
                             //随机的 不唯一


```

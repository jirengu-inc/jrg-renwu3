---
title: 数组
date: 2016-07-10 23:2:19
tags: javascript
---

# 数组(array)

### 数组（array）是按**序**排列的一组值.每个值的位置都有编号（从0开始）

  ```javascript
  var arr = ['a', 'b', 'c'];
  ```
  a、b、c就构成一个数组,两端的方括号是数组的标志.a是0号位,b是1号位,c是2号位.

  数组属于一种特殊的对象.`typeof`运算符会返回数组的类型是object。
  ```javascript
  typeof [1, 2, 3] // "object"

  ```
### 数组的创建与修改

  ```js

  var food = new Array('fish','chicken','chips')
  var food = Array('fish','chicken','chips') //new操作符可以省略
  var food = ['fish','chicken','chips']
  var arr1 = [1, 2, , 3] //1,2,undefined, 3

  var a = arr1[0] // 访问第1个元素 1
  var b = arr1[2] // undefined
  arr1[1] = 33   //设置元素
  arr1[5] = 22   //此时 arr1 为1,33,undefined, 3,undefined,22
  ```
  需要注意的是
  ```js
  var arr2 = [1, 2, 3,]  // IE8及以下是1,2,3,undefined 长度4
                         // chrome 为1，2，3 长度3  此写法不推荐
  ```

### JS的数组中可以保存任意类型的数据

  ```javascript
  var arr = [
      {a: 45},                //对象
    [1, 2, 3],                //数组
    function() {return true;} //函数
    ];
  ```
### JS数组的大小是可以动态调整的,即可随着数据的添加自动增长以容纳新增数据

```js
var arr = [0,1,2]
console.log(arr.length)  //3
arr[3] = 3
console.log(arr.length)  //4
arr[99] = 99
console.log(arr.length)  //100
```


# Array方法

### 遍历

  ```js
  var cars =['Saab','Volvo','BMW']
  for(var i = 0; i< cars.length; i++){
  console.log(cars[i]);
  }
  ```
### 检测
  ```js
  var arr = [1, 3, 4];
  arr instanceof Array //true
  ```
### 连接

  concat()  连接数组,不会改变现有的数组,仅返回被连接数组
  ```js
  var food1 = ['鸡蛋','牛奶']
  var food2 = ['米饭','面包']
  var food3 = ['香肠','罐头']
  var food4 = food1.concat(food2,food3)
  console.log(food4)//"鸡蛋", "牛奶", "米饭", "面包", "香肠", "罐头"
  ```


### 删减

- pop()

  删除最后一个元素,把length减1,返回所删除的元素的值(若数组已为空，则不改变数组,返回undefined)

  ```js
  var arr = [2,4]
  arr1             // [2,4]
  arr.pop()        // 4
  arr              // [2]
  arr.pop()        // 2
  arr              //[]
  arr.pop()        //undefined
  arr               //[]
  ```

- push()

  末尾添加一个或多个元素，并返回新的length

  ```js
  var sports = ["soccer", "baseball"];
  var total = sports.push("football", "swimming");
  console.log(sports); // ["soccer", "baseball", "football", "swimming"]
                       // 原数组sports被改变
  console.log(total);  // 4
                       // 返回的是新的长度
  ```

- shift()

  删除第一个元素,返回删除的元素的值(若已为空，则不改变数组,返回undefined)

  ```js
  var food = ['rice', 'milk', 'egg']
  console.log(food)            //["rice", "milk", "egg"]
  var shifted = food.shift()
  console.log(food)            //["milk", "egg"]  原数组被改变
  console.log(shifted)         //"rice"   返回的是被删除的元素的值
  ```

- unshift()

  数组的开头添加一个或多个元素，并返回新的length

  ```js
  var arr = [1, 2];
  arr.unshift(0)      //3
  arr                 //[0, 1, 2]
  arr.unshift(-2, -1) //   5
  arr                 //[-2, -1, 0, 1, 2]
  arr.unshift( [-3] ) //6
  arr                 //[[-3], -2, -1, 0, 1, 2]
  ```
- splice()

  添加/删除元素，然后返回被删除的元素
  ```js
  array.splice(start, deleteCount, item1,item2...)

  ```
  - start​
  从数组的哪一位开始修改内容。如果超出了数组的长度，则从数组末尾开始添加内容;
  如果是负值，则表示从数组末位开始向左计数

  - deleteCount
  表示要移除的数组元素的个数,为整数
  如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素.
  如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。

  - itemN
  要添加进数组的元素。如果不指定，则 splice() 只删除数组元素。

  - 返回值
  由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

  ```js  
  var food = ['鸡蛋','牛奶','米饭','面包','香肠']

  //从第 2 位开始删除 0 个元素，插入 '罐头'
  var removed = food.splice(2, 0,'罐头')
  food       //["鸡蛋", "牛奶", "罐头", "米饭", "面包", "香肠"]
  removed    //[] 什么也没删除 返回的是空数组

  //从第 3 位开始删除 1 个元素
  removed = food.splice(3, 1)
  food      //["鸡蛋", "牛奶", "罐头", "面包", "香肠"]
  removed   //["米饭"]

  //从第 2 位开始删除 1 个元素，然后插入 '面条'
  //删除一个 插入一个 实际上相当于替换
  removed = food.splice(2, 1, '面条');
  food      //["鸡蛋", "牛奶", "面条", "面包", "香肠"]
  removed   //["罐头"]

  //从第 0 位开始删除 2 个元素，然后插入 "包子", "饺子" 和 "烤肉"
  removed = food.splice(0, 2, "包子", "饺子", "烤肉")
  food      //["包子", "饺子", "烤肉", "面条", "面包", "香肠"]
  removed   //["鸡蛋", "牛奶"]

  //从第 3 位开始删除 后面所有元素
  removed = food.splice(3, Number.MAX_VALUE);
  food      //["包子", "饺子", "烤肉"]
  removed   //["面条", "面包", "香肠"]

  //在从后面数第二个元素 删除一个元素' 插入'烤鸭','烧鸡'
  removed = food.splice(-2,1,'烤鸭','烧鸡')
  food      //["包子", "烤鸭", "烧鸡", "烤肉"]
  removed   //饺子
  ```

  ** 以上五种方法都会对原数组进行修改 **

- slice()

  从已有的数组中选取元素存入到新数组中,返回新数组(不会改变原数组)

  ```js
  arrayObject.slice(start,end)
  ```

  从star开始(包括star)在end结束(不包括end)

  ```js
  var food = ['鸡蛋','牛奶','米饭','面包','香肠']
  var breakfast = food.slice(0,1)
  food      //['鸡蛋','牛奶','米饭','面包','香肠']
  breakfast //['鸡蛋','牛奶']

  ```

### 转换

  - join()

  把所有元素放入一个**字符串**,通过传入的参数连接各元素,不改变原数组
  如果传入的参数是空字符串,那么数组中的所有元素将被直接连接。
  如果省略传入的参数，默认用逗号连接


  - toString()

  把数组转换为字符串，并返回结果,不改变原数组

  ```js
  var acter1 = ['特朗普','克林顿','桑德斯']
  var acter2 = acter1.toString()
  var acter3 = acter1.join('++')
  acter1          //["特朗普", "克林顿", "桑德斯"]
  acter2          //"特朗普,克林顿,桑德斯"
  acter3          //"特朗普++克林顿++桑德斯"
  typeof acter1   //"object"
  typeof acter2   //"string"
  typeof acter3   //"string"
  ```

  - split
  把一个字符串分割成字符串数组
  ```js
  stringObject.split(separator,howmany)
  ```
    - separator
    必需,字符串或正则表达式，从该参数指定的地方分割stringObject.
    如果把空字符串 ("") 用作 separator，那么 stringObject 中的**每个字符之间**都会被分割。
    - howmany
    可选,该参数指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。
    如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
    - 返回值
    返回一个由字符串元素组成的数组。
    该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。
    ** 返回的数组中的字串不包括 separator 自身 **
    但是，如果 separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的文本）

  ```js

  var str1 = 'a-b,ds-d,-,asd,ds-ad,';
  var str2 = str1.split(',');
  var str3 = str1.split('-');
  console.log(str1); //"a-b,ds-d,-,asd,ds-ad,"
                     //split()方法不改变原字符串
  console.log(str2); //["a-b", "ds-d", "-", "asd", "ds-ad", ""]
  console.log(str3); //["a", "b,ds", "d,", ",asd,ds", "ad,"]
  console.log(typeof str3[2]); //分割后形成的新数组的元素是字符串    
  ```

** String.split() 执行的操作与 Array.join 执行的操作是相反的 **

### 排序

- reverse()
    方法用于颠倒数组中元素的顺序

- sort()
    方法用于对数组的元素进行排序
    ```js
    arr.sort([compareFunction])
    ```

- compareFunction
    	可选.用来指定按某种顺序进行排列的函数。
      如果省略，元素按照转换为的字符串的诸个字符的Unicode位点进行排序
      如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序
    - 记 a 和 b 是两个将要被比较的元素：
     - compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
     - compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。
         备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
     - 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
     - compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
- 返回值
  对数组的引用。
请注意,数组在**原数组**上进行排序，不生成副本

```js
var fruit = ['cherries', 'apples', 'bananas'];
    fruit.sort(); // ['apples', 'bananas', 'cherries']

var scores = [1, 10, 2, 21];
    scores.sort(); // [1, 10, 2, 21]


var things = ['word', 'Word', '1 Word', '2 Words'];
    things.sort(); // ['1 Word', '2 Words', 'Word', 'word']
```

- 比较函数格式如下：
```js
function compare(a, b) {
  if (a小于b) {
    return -1;
  }
  if (a大于b) {
    return 1;
  }
  //a等于 b
  return 0;
}
```
```js
希望比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

function compareNumbers(a, b) {
  return a - b;
}
sort 方法可以使用 函数表达式 方便地书写：

var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
```



  ** 这两种方法都会使原数组发生改变 **

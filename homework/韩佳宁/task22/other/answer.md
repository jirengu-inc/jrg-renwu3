## 问答题

#### dom对象的innerText和innerHTML有什么区别？
- `innerText`写入时其内会容覆盖原节点内所有内容，且输入内容会转义为**纯文本**
- `interHTML`写入时也是覆盖内部内容，输入内容的标签会被当做`html`元素进行编译.


#### elem.children和elem.childNodes的区别？

- elem.children只会返回**元素节点**集合
- elem.childNodes返回包含**所有类型**的节点，不仅是元素节点，空格和换行符都会被是节点

常用节点类型

| 节点类型       |数值常量           | 字符常量  |
| ------------- |:-------------:| -----:|
| Element(元素节点)| 1 |ELEMENT_NODE |
| Attr(属性节点)  | 2    |  ATTRIBUTE_NODE|
| Text(文本节点) |3     |  TEXT_NODE|
|Comment(注释节点)|8|COMMENT_NODE|
|Document(文档节点)|9|DOCUMENT_NODE|
|DocumentType(文档类型节点)|10|DOCUMENT_TYPE_NODE|
|DocumentFragment(文档片断节点)|11|DOCUMENT_FRAGMENT_NODE|

#### 查询元素有几种常见的方法？
- getElementById: 通过`id`来查询元素，返回和`id`对应的元素节点   

  ** 注意!** 该方法不会搜索不在文档中的元素。
  当创建一个元素，并且分配ID后，必须要使用`insertBefore`或其他类似的方法把元素插入到文档中之后才能使用   

  ```js
  var element = document.createElement("div");
  element.id = 'testqq';
  var el = document.getElementById('testqq'); // 返回为 null
  ```
- getElementsByClassName：通过类名来选择元素，返回一个储存对应类名的类数组对象   
`document`和 `enement`都可以使用此方法   
- getElementsByTagName：通过标签名来选择元素，返回一个由查询到的元素组成的**类数组**对象.   
`document`和 `enement`都可以使用此方法   
- getElementByName：用来选择一些具有name属性的html元素，比如form、img等，返回一个储存对应类名的类数组对象，要用arr[i]来使用，只有 `document` 能使用   
** 注意!** IE会返回没有`name`属性的同名**id**元素！
- querrSelector：
使用css选择器语法来选中目标元素，会返回匹配到的元素节点   
如果有多个满足条件的元素节点将**只**返回**第一个**
- querySelectorAll
与querrSelector类似，返回**所有**满足条件的元素节点


#### 如何创建一个元素？如何给元素设置属性？


创建一个元素:
   ```js
var element=document.createElement（元素名）
```
设置元素属性:
```js
element=.setAttribute（'属性名'，'值'）
```

#### 元素的添加、删除？
使用`node.appendChild（新元素节点）`将新元素节点插入到`node`节点作为最后一个子节点;   
也可以用`node.inserBefore（新元素节点，子参照节点）`将元素插入到`node`的参照子节点前;   
用`removeChild（要移除的元素）`将节点的子元素删除


#### DOM0 事件和DOM2级在事件监听使用方式上有什么区别？

- DOM0   
  DOM0级处理程序是传统处理程序方式，将一个函数赋值给一个时间处理程序，
  特点：一个函数只能**直接绑定**在元素上，且只能处理**一个**事件   

- DOM2的事件监听规定了事件有三个阶段，捕获 目标 冒泡   
  可以对一个元素添加多个监听器，也可以制定在哪个阶段来执行处理程序

#### attachEvent与addEventListener的区别？

- 适用的浏览器不同：   
`addEventListener`适用于现代浏览器
`attachEvent`是低版本IE浏览器的私有方法
- 参数和触发阶段不同:   
`addEventListener`有三个参数，最后一个参数可以定义处理程序在捕获/冒泡阶段触发   
`attachEvent`只有两个传递参数，只能在冒泡阶段触发   
- 第一个参数的形式不同：   
如果`addEventListener`的第一个参数是`click`   
而`attachEvent`的第一个参数是`onclick`   
- this不同:
`addEventListener`中的`this`是触发事件的元素   
`attachEvent`的`this`指代的是window
- 在同一个事件上绑定多个事件处理程序时的执行顺序不同   `addEventListener`会按添加顺序并按照第三个参数执行   
而 `attachEvent` 的执行是无序的


#### 解释IE事件冒泡和DOM2事件传播机制？
- IE事件冒泡：事件发生在触发元素上，从触发元素开始，事件向其父元素传播,   
即由嵌套层次较深的节点向上传播   
最终到html根节点。
- DOM2事件传播机制   
DOM2事件传播分三个阶段   
 1. 捕获阶段   
 2. 位于目标阶段   
 3. 冒泡阶段     

事件处理程序将在捕获**或**冒泡阶段执行   
事件行为发生后.由根节点开始逐级向下传递,直到到达事件发生的元素这是捕获阶段   
事件到达目标元素后，此为处于目标阶段   
然后再从目标元素逐级往上传递，直到到达根节点，这是冒泡阶段。


#### 如何阻止事件冒泡？ 如何阻止默认事件？   

- 阻止冒泡   
  在目标元素节点的处理程序中添加`e.stoppropagation()`来让停止冒泡，   
  在ie中则用`cancelBubble()`   
- 阻止默认事件   
  使用`e.preventDefault()`
  ie中需要把`returnValue`设为 `false`

# DOM


- HTMLCollection

  `HTMLCollection` 接口表示一个包含了元素（元素顺序为文档流中的顺序）的集合，还提供了用来从该集合中选择元素的方法和属性。
  HTML DOM 中的 HTMLCollection 是**即时**更新的；当其所包含的文档结构发生改变时，它会自动更新。

- NodeList
  `NodeList` 对象是一个节点的集合，是由 `Node.childNodes `和 `document.querySelectorAll` 返回的.

  属性有:
  - `length` 为NodeList 对象中包含的节点个数.
  方法
  - `item(idx)`
  返回`NodeList`对象中指定索引的节点,如果索引越界,则返回`null`.
  等价的写法是`nodeList[idx]`, 不过这种情况下越界访问将返回`undefined`.




- document.getElementsByClassName('className')
  返回一个**类似数组**的**对象**，包含了所有指定 `class` 名称的子元素
  ```js
  var elements = document.getElementsByClassName(names);
  ```
  - `elements` 是查找到的所有元素的集合 `HTMLCollection` .
  - `names` 是一个**字符串**，表示用于匹配的 `class` 名称列表; `class` 名称通过空格分隔

  `getElementsByClassName` 可以在**任意元素**上调用，不仅仅是 `document`
  调用这个方法的元素将作为本次查找的根元素.

- document.getElementById('id')

  返回一个匹配特定 ID的元素.
  根据元素的 `ID` 来查找
  ```js
  element = document.getElementById(id);
  // 注意拼写是 Element 和Id
  // Elements ID 是无效的
  ```
  - `element` 是一个 Element 对象。如果当前文档中拥有特定ID的元素不存在则返回**null**.
  - id 是**大小写敏感**的**字符串**，代表了所要查找的元素的唯一ID.
    `document.getElementById("Main")`无法获取到元素`<div id="main">`，因为'M'和'm'是不一样的。
  - `getElementById`方法不会搜索不在文档中的元素。
    当创建一个元素，并且分配ID后，必须要使用`insertBefore`或其他类似的方法把元素插入到文档中之后才能使用 `getElementById` 获取到:

    ```js
    var element = document.createElement("div");
    element.id = 'testqq';
    var el = document.getElementById('testqq'); // 返回为 null
    ```


- document.getElementsByName('name')

  根据给定的 `name` 返回一个在 `(X)HTML document`的节点列表集合。
  根据元素的`name`属性的值来查找
  ```js
  elements = document.getElementsByName(name)
  ```
  `elements` 是一个 `NodeList` 集合。
  `name` 是元素的 `name` 属性的值。
  例如
  ```js
  <!DOCTYPE html>
  <html lang="en">
  <head>
  ...
  </head>
  <body>
  <form name="up"><input type="text"></form>
  <div name="down"><input type="text"></div>

  <script>
  var up_forms = document.getElementsByName("up");
  console.log(up_forms[0].tagName); // returns "FORM"
  </script>
  </body>
  </html>
  ```

- document.getElementsByTagName('tagName')


```js
document.coll

```













------------

## 常用节点类型
| 节点类型       |数值常量           | 字符常量  |
| ------------- |:-------------:| -----:|
| Element(元素节点)| 1 |ELEMENT_NODE |
| Attr(属性节点)  | 2    |  ATTRIBUTE_NODE|
| Text(文本节点) |3     |  TEXT_NODE|
|Comment(注释节点)|8|COMMENT_NODE|
|Document(文档节点)|9|DOCUMENT_NODE|
|DocumentType(文档类型节点)|10|DOCUMENT_TYPE_NODE|
|DocumentFragment(文档片断节点)|11|DOCUMENT_FRAGMENT_NODE|




```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>DOM</title>
  </head>
  <body>
    <div class="box1">

    </div>
    <!--这是一段没有什么用的注释-->
    <div id="btn1">

    </div>
    <p>今天天气不错啊</p>
    <script type="text/javascript">
      function functionName() {
        console.log(111111);
      }
    </script>
  </body>
</html>
```
在这段代码中
`<html><head><meta><title><body><div>`都是`Element` 元素节点
属性节点代表了元素的属性,属性都是附属于元素的,所以并不作为单独的节点在文档树中
`DOM` `今天天气不错啊`  节点下面的空白也属于文本节点.比如`<body>` 和`<div class="box1">`之间的空白 属于文本节点文本节点是只包含文本内容的节点




`<!--这是一段没有什么用的注释-->`是注释节点
文档节点是文档的根节点,是所有文档的父节点


`<!DOCTYPE html>`

整块代码之上 称为文档节点 代码中文档节点下面有一个文档类型节点
`<!DOCTYPE html>` 和一个元素节点 `html`



通常来说，使用nodeType属性确定一个节点的类型，比较方便。

document.querySelector('a').nodeType === 1
// true

document.querySelector('a').nodeType === Node.ELEMENT_NODE
// true
上面两种写法是等价的。
IE不支持字符常量,支持数值常量

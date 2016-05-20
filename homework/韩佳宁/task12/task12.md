# task12

## 负边距在让元素产生偏移时和position: relative有什么区别?
- 负边距会改变元素在文档流中的位置(margin border     padding 内容 共同决定盒模型的大小),
   后续元素可能会占据其移动出的空间.
- 使用`position:relative`的元素仅仅相对于原本文档流中   的位置偏移
  其在文档流中的位置不变,对其他元素没有影响(后面的元素会以为它还在原来的位置)
![0_1463684309100_upload-09a1a2a7-6d98-470c-aea2-2dcce51ce853](http://7xpvnv.com2.z0.glb.qiniucdn.com/b75ac079-6e03-40a7-9211-4ef0c38e9014)


## 使用负 margin 形成三栏布局有什么条件?

   - 三栏在html中排列顺序为 中间栏,左边栏 ,右边栏
    - 三栏全部设为**左浮动**,
      (因为全都浮动,所以为了不影响header footer的位置,三栏需要BFC空间包裹)
    - 两个侧边栏要**宽度固定**,中间栏宽度100%自适应
    - 左边栏设置`margin-left:-100%`100%是父元素的宽度
      右边栏设置`margin-left:-220px;`220px是**设定的固定宽度**
    - 中间的主体部分要使用双层结构
      外层div宽度100% 左浮动
      内层为真正的主体内容,左右留出足够的`margin`
    - 留出的左右`margin`**必须大于或等于侧边栏固定宽度**
![0_1463684543086_upload-930e2b68-73e8-4665-8db2-b6065a4a3955](http://7xpvnv.com2.z0.glb.qiniucdn.com/c9f6e9de-064d-43d1-8f3d-10ab2abc4bfe)

除此之外还有[浮动三栏布局demo](链接地址)

## 圣杯布局的原理是怎样的? 简述实现圣杯布局的步骤
html结构
```
    <div class="父元素">
      <div class="内容主体"></div>
      <div class="小左"></div>
      <div class="小右"></div>
    </div>
```
三栏全部设置浮动,主体元素宽度100% 俩侧边栏定宽
两个给侧边栏设负margin,让其"上去"(左栏为-100% ,右栏为其自身宽度的负值)
![0_1463684782083_upload-52cc7648-60b1-46d6-8759-c13de5200133](http://7xpvnv.com2.z0.glb.qiniucdn.com/f4e27954-6391-4a64-a8bd-1e416000184d)
父元素的左右设置padding(需要大于等于侧边栏定宽)，侧边栏用相对定位把自己定位到预留的padding空间上
父元素需要清除浮动 形成BFC空间,
![0_1463684953120_upload-881c07b7-68e3-49ac-a504-637f99094ed7](http://7xpvnv.com2.z0.glb.qiniucdn.com/0f6bd53b-d1e9-4fc8-88f5-4d53229770da)
## 双飞翼布局的原理? 实现步骤?
html结构
```
    <div class="BFC的父元素">
      <div class="center"><div  class="content"></div></div>
      <div class="right"></div>
      <div class="left"></div>
    </div>
```
将`center` `left` `right` 设为左浮动  `left` `right`固定宽度 ,`center`宽度为100%
`content`设置左边边距 其值需要大于等于侧边栏定宽
给`left` `right`设置负边距 (左`-100%` 右`-定宽`)让他们定位到左右两侧
对父元素 清除浮动,并使其形成BFC

- 对于圣杯和双飞翼的个人理解

  中间栏想要给左边的`left`和右边`right`都让出一定空间
  只有两种方式
  一种是`padding：0 220px;`
  或者是`margin：0 220px;`

  这两条路线，
  如果选择用padding给两侧留出空间，那就是圣杯
  如果用`margin`的方式，最后的结果就是双飞翼

  这两种布局作为核心内容的主体放在前面,有限渲染显示
  这两种布局中,三栏都**必须都放置在一个BFC空间**中,不然因为浮动元素高度塌陷,会影响到header footer 的位置

----------
## 代码题

[链接标题](http://aaa)

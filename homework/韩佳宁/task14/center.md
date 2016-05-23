# 居中

## 文字水平方向居中:
`text-align:center`对行inline元素,inline-block元素有效.可被继承.
## 块级元素居中
- 水平居中

   block元素默认宽度100%,需要水平居中的block元素必然是有具体宽度的
   方法:`margin:0 auto;`
- 垂直居中

  首先要明白需要垂直居中的场景
    - 父级元素高度不定水平居中

     方法:让父级包裹块上下padding相等

    - 单行文字垂直居中

     让line-height与height相等

  - layout固定宽度居中

     大部分网站都是这么做的

  - 父元素宽高自适应绝对居中(task14第一页)

     绝对定位 宽高偏移50% 负margin 共同使用

   (要被居中的元素自身宽高确定)




- 全屏方式

 - 宽高100%

  需要在根元素事先声明

 - position:absolute
    top:0;
    bottom:0;
    left:0;
    right:0;
    适合用于弹窗

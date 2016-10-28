* 给元素 $node 添加 class `active`，给元素 $noed 删除 class `active`

		$node.addClass('active'); // 给元素$node添加class active
		$node.removeClass('active');// 给元素$node删除class active

* 展示元素$node, 隐藏元素$node

		$node.show(speed, callback); // 展示$node
		$node.hide(speed, callback); // 隐藏元素$node

* 获取元素$node 的属性: id、src、title， 修改以上属性

		$node.attr('id');
		$node.attr('id', value);
		$node.attr('src');
		$node.attr('src', value);
		$node.attr('title');
		$node.attr('title', value);
		$node.attr({
			id: value,
			src: value,
			title: value
		});

* 给$node 添加自定义属性`data-src`

		$node.attr('data-src', value);

* 在$ct 内部最开头添加元素$node

		$ct.prepand($node);
		$node.prependTo($ct);

* 在$ct 内部最末尾添加元素$node

		$ct.append($node);
		$node.appendTo($ct);

* 删除$node

		$node.remove(); // 同时移除元素内部的一切，包括元素上的事件及jQuery数据
		$node.detach(); // 删除的元素不删除数据和事件

* 把$ct里内容清空

		$ct.empty();

* 在$ct 里设置 html `<div class="btn"></div>`

		$ct.html('<div class="btn"></div>');

* 获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)

		$node.height(); // 获取内容高度（不包括内边距）
		$node.height(100); // 设置内容高度为100px（单位默认是px）

		$node.innerHeight(); // 获取高度（包括内边距）
		$node.innerHeight(100); // 设置高度（包括内边距）

		$node.outerHeight(false); // 获取高度（包括边框，但不包括外边距）
		$node.outerHeight(100); // 设置高度（包括边框，但不包括外边距）

		$node.outerHeight(true); // 获取高度（包括外边距）
		$node.outerHeight(100); // 设置高度（包括外边距）

		// 宽度的设置和高度设置一样

* 获取窗口滚动条垂直滚动距离

		$(document).scrollTop();

* 获取$node 到根节点水平、垂直偏移距离

		$node.offset(); // 获取或设置元素当前坐标（相对于根节点）
		$node.offset().left; // 获取到根结点的水平偏移距离
		$node.offset().top; // 获取到根结点的垂直偏移距离

		$node.offset({
			left: 10,
			top: 20
		}); // 设置元素坐标

* 修改$node 的样式，字体颜色设置红色，字体大小设置14px

		$node.css({
			`color`: 'red',
			`font-size`: `14px`
		});

* 遍历节点，把每个节点里面的文本内容重复一遍

		$node.each(function(){
			console.log($(this).text());
		});

* 从$ct 里查找 class 为 .item的子元素

		$ct.find('.item');

* 获取$ct 里面的所有孩子

		$ct.children();

* 对于$node，向上找到 class 为’.ct’的父亲，在从该父亲找到’.panel’的孩子

		$node.parent('.ct').find('.panel');

* 获取选择元素的数量

		$node.length();

* 获取当前元素在兄弟中的排行

		$node.index();

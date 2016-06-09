$.fn.stickup=function(){    //stickup插件
		var $nav=this,
		width=$nav.width(),
		height=$nav.height,
		offsetTop=$nav.offset().top,
		offsetLeft=$nav.offset().left;
		var $cloneNav=$nav.clone()
						  .css("opacity",0)
						 .insertBefore($nav)
						 .hide();	//clone$nav元素，放在$nav元素前面，并将其隐藏
		$(window).on("scroll",function(){
			var scrollTop=$(this).scrollTop();	//获取窗口滚动条垂直滚动的距离
			if(scrollTop>=offsetTop){
				setChange();
			}else{
				cancelChange();
			}
		});
		function setChange(){    //超过距离，改变导航条样式
			$nav.css({
				"position":"fixed",
				"top":0,
				"left":offsetLeft,
				"width":width,
				"height":height,
				"z-index":999
			});
			$cloneNav.show();
		}
		function cancelChange(){
			$nav.removeAttr('style');
			$cloneNav.hide();
		}
	}
	function skipList($node1,$node2){  //导航条跳转函数
		this.$node1=$node1;
		this.$node2=$node2;
		this.offsetTop=$node2.offset().top;
		var _this=this;
		_this.$node1.on("click",function(){
			$(window).scrollTop(_this.offsetTop);
			console.log(_this.offsetTop);
		});
	}
	var node1=$(".navigation p").eq(0);
	var node2=$(".wrap-skills").eq(0);
	var n1=new skipList(node1,node2);

	var node3=$(".navigation p").eq(1);
	var node4=$(".wrap-works").eq(0);
	var n2=new skipList(node3,node4);

	var node5=$(".navigation p").eq(2);
	var node6=$(".wrap-cv").eq(0);
	var n3=new skipList(node5,node6);

	var node7=$(".navigation p").eq(3);
	var node8=$(".wrap-contact").eq(0);
	var n4=new skipList(node7,node8);

	$(".wrap-navigation").stickup();
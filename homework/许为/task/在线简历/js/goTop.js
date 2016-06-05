	//回到顶部函数
	function GoTop($node){
		this.$node=$node;
		this.bind();
	}
	GoTop.prototype={
		bind:function(){
			var _this=this;
			$(window).on("scroll",function(){
				var scrollTop=$(this).scrollTop();
				// console.log(scrollTop);
				if(scrollTop>170){
					_this.$node.css("display","block");
					_this.$node.on("click",function(){
						scrollTop=0;
					});
				}else{
					_this.$node.removeAttr("style");
				}
			});
		}
	}
	var goTop=$(".go-top");
	var g1=new GoTop(goTop);


	//点击出现微信二维码
	$(".weixin p").eq(1).on("click",function(){
		$(".weixin-code").css({   //每次点击时把二维码框的宽、高重新进行设置
			"width":"63px",
			"height":"320px",
			"display":"block"
		});
		$(".weixin-code").animate({
			width:306,
			height:350
		});
	});
	$(".weixin-code p").on("click",function(){
		$(".weixin-code").css({
			"display":"none"
		});
	});
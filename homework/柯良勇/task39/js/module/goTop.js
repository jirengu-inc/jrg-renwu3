// 当滚动条大于100时 创建一个回到顶部的标志 点击回到顶部
define(['jquery'],function($){

	function GoTop(){
		this.creatHtml();
		this.bind();
	};

	GoTop.prototype = {

		creatHtml: function(){
			this.$gotop = $('<div id="gotop"><span>∧</span></div>').hide();
			this.$gotop.css({
				position: 'fixed',
				right: '30px',
				bottom: '30px',
				textAlign: 'center',
				width: '50px',
				fontSize: '36px',
				backgroundColor: '#fed136',
				border: '1px solid #ccc',
				borderRadius: '3px',
				cursor: 'pointer',
			});
			$('body').append(this.$gotop);
		},

		bind: function(){
			var _this=this;
			this.$gotop.on('click',function(){
				$('body').animate({scrollTop:0},500);
			});
			$(window).on('scroll',function(){
				_this.checkShow();
			})
		},

		checkShow: function(){
			var _this=this;
			if($(window).scrollTop()>100){
				_this.$gotop.show(400);
			}else _this.$gotop.hide(400);
		},
		
	};
	return GoTop;
})
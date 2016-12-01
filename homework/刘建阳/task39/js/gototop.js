define(['jquery'], function($) {
	function goTop(){
				this.$goTop = $('<div class="go-top">回到顶部</div>');
				$('body').append(this.$goTop);
				this.bind();
	}

	goTop.prototype.bind = function (){
		var self = this;
				$(window).on('scroll',function(){
					if($('body').scrollTop() > 100){
						self.$goTop.show();
					}else{
						self.$goTop.hide();
					};
				});

				self.$goTop.on('click',function(){
					$(window).scrollTop(0);
				});
			};

	return goTop;
})


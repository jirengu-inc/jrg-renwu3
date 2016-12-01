define(['jquery'], function($) {
	function carousel($carousel){
			        this.$ct = $carousel.find('.img-ct'),
		    		this.$next = $carousel.find('.next'),
		    		this.$pre = $carousel.find('.pre'),
		    		this.$items = this.$ct.children(),
		    		this.$bullet = $carousel.find('.bullet'),
		    		this.imgCount = this.$ct.children().size(),
		    		this.imgWidth = $(window).width();

					this.curIdx = 0;
				    this.isAnimate = false;

			}
			

			carousel.prototype = {
				init : function () {
			    	this.$ct.prepend(this.$items.last().clone());
			    	this.$ct.append(this.$items.first().clone());
			    	this.$ct.find('.bg').css('width',this.imgWidth);
			    	this.imgRealCount = this.$ct.children().size();
			    	this.$ct.css({'width':this.imgRealCount*this.imgWidth,'left':0-this.imgWidth});

			    	this.setBg(1);
			    	this.bind();
				    this.autoPlay();
			    },
				bind : function () {
					var self = this;
					$(window).on('resize',function(){
					
						self.imgWidth = $(window).width();
						self.$ct.find('.bg').css('width',self.imgWidth);
						self.imgRealCount = self.$ct.children().size();
						self.$ct.css({'width':self.imgRealCount*self.imgWidth,'left':0-self.imgWidth});

					});

					this.$next.on('click',function(){
						self.playNext();
					});

					this.$pre.on('click',function(){
						self.playPre();
						
					});
					this.$bullet.find('li').on('click',function(){
						console.log(1);
						var idx = $(this).index();

						if(idx>self.curIdx){
							self.playNext(idx-self.curIdx);
						}else if(idx<self.curIdx){
							self.playPre(self.curIdx-idx);
						};
					});
				},		
				playNext : function (idx) {
					var idx = idx||1;
					if (this.isAnimate) {
						return ;
					};
					this.isAnimate = true;
					for (var inter = 1; inter <= idx; inter++) {//idx代表轮播跳转的间隔或距离，并不是序号
						this.setBg(this.curIdx+1+inter);
					};
					
						var self = this;
						this.$ct.animate({left:'-='+(this.imgWidth*idx)},function(){
							self.curIdx = (self.curIdx+idx)%self.imgCount;
							self.setBullet(self.curIdx);

							if(self.curIdx===0){
								self.$ct.css('left',0-self.imgWidth);
							};
							self.isAnimate=false;
						});				
				},
				autoPlay : function (){
					var self = this;
					setInterval(function(){
						self.playNext();
					},2000);
				},
				playPre : function (idx) {
					var idx = idx||1;
					if (this.isAnimate) {
						return ;
					};
					this.isAnimate = true;

					for (var inter = 1; inter <= idx; inter++) {//idx代表轮播跳转的间隔或距离，并不是序号
						this.setBg(this.curIdx+1-inter);
					};
					
					var self = this;
					self.$ct.animate({left:'+='+(self.imgWidth*idx)},function(){
						self.curIdx = (self.imgCount+self.curIdx-idx)%self.imgCount;
						self.setBullet(self.curIdx);

						if(self.curIdx===(self.imgCount-1)){
								self.$ct.css('left',0-self.imgWidth*self.imgCount);
								self.setBg(self.imgCount);
							};
						self.isAnimate=false;
						});				
				},
				setBullet : function (idx){
					this.$bullet.find('li').removeClass('active')
									  .eq(idx).addClass('active');
				},			
				setBg : function (idx){
					var idx = idx||0;
					var $bg = this.$ct.find('.bg').eq(idx);

					var imgUrl = $bg.attr('data-img');

					if($bg.data('isBgSet')){ return ;};

					$bg.css('background-image','url('+imgUrl+')');
					$bg.data('isBgSet', true);

				}
			}
		
		return carousel;

/*		var carousel = new carousel($('.carousel'));
		carousel.init();*/
})



		

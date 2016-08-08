$(function(){
			$('#fullpage').fullpage({
				continuousVertical: true,
				anchors:['page1','page2','page3','page4'],
				navigation: true,
				navigationPosition: 'left',
				navigationTooltips:['index','works','skills','introduce'],
				navigationColor:'red',
				afterRender:function(){
					$('.item').each(function(idx,ele){
						$(ele).on('click',function() {
							if($(ele).data('animated')){
								return ;
							}
							$(ele).data('animated',true);
							if(!$(ele).attr('showed')){
								$(ele).find('.detail-wrap').show().animate({width:350},700,function(){
										$('.detail-wrap a').on('click',function(e){
												e.stopPropagation();	
										});
								});
								$(ele).attr('showed',true);
								$(ele).siblings().removeAttr('showed');
								$(ele).siblings().find('.detail-wrap').animate({width:0},700,function(){
										$(this).hide();
										$(ele).data('animated',false);
									});								
							}else{
								$(ele).find('.detail-wrap').animate({width:0},700,function(){
										$(this).hide();
										$(ele).removeAttr('showed');
										$(ele).data('animated',false);
									});
							}
						});
					});
					
					$('.skills .skilltip').on('click',function(){
						var $this = $(this),
							idx = $this.index();
						$this.parents('li').siblings().find('.skilltip').removeClass('active');
						$this.addClass('active');
						$this.parents('li').siblings().find('.active').fadeOut(1000,function(){
							   //console.log(1);
								$(this).removeClass('active');
								$this.parents('li').find('.content').addClass('active').fadeIn(1000);
							});
					});
				}
			});

		});
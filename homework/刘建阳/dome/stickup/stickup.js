$.fn.stick = function () {
				var $cur = this,
					curW = $cur.width(),
					curH = $cur.height(),
					offsetTop = $cur.offset().top,
					offsetLeft = $cur.offset().left;

				var $div = $cur.clone().css('opacity',0)
									   .insertBefore($cur)
									   .hide();

				$(window).on('scroll',function(){
					var scrollTop = $(this).scrollTop();			

					if (scrollTop>=offsetTop) {
						if (!isFixed()) {
							setFixed();
						};
					}else{
						if (isFixed()) {
							unsetFixed();
						};
					};
				});

				function isFixed() {
					
					return !!$cur.attr('data-fixed');
				}

				function setFixed(){
					$cur.attr('data-fixed',true)
						.css({
							'position': 'fixed',
							'top': 0,
							'left': offsetLeft,
							'width': curW,
							'margin': 0,
							'z-index': 111
						});

					$div.show();
				};
				function unsetFixed() {
					$cur.removeAttr('data-fixed')
						.removeAttr('style');

					$div.hide();
				};

				return this;
			};
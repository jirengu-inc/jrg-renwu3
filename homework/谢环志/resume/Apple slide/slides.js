 $.fn.slides = function(){

	var width = $('.slides').width();
	var length = $(this).length
	// console.log(length)
	$('li.menu-items').on('click',function(e){
		var $current = $(this)
		$current.addClass('active').siblings('.active').removeClass('active');
		var index = $current.attr('data-index');
		var left = index*width;
		$('.art').stop(true,true).animate({left: -left},500)
	})
	//自动点击事件
	var currentIndex = 1;
	function autoPlay(){
		if (currentIndex === -1) {return false;}
		$('li.menu-items').eq(currentIndex%length).triggerHandler('click',[true]);
		// console.log('ni')
		currentIndex++;
	}
	var changeEvery = 5;
	var itvl = setInterval(function(){autoPlay()},changeEvery*1000);

 }


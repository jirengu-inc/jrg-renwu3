var $ct = $('.img-ct'),
	$next = $('.next'),
	$pre = $('.pre'),
	$items = $ct.children(),
	$bullet = $('.bullet'),
	imgCount = $ct.children().size(),
	imgWidth = $(window).width()*0.7;

	


	$ct.prepend($items.last().clone());
	$ct.append($items.first().clone());
	$ct.find('.bg').css('width',imgWidth);
	imgRealCount = $ct.children().size();
	$ct.css({'width':imgRealCount*imgWidth,'left':0-imgWidth});


	$(window).on('resize',function(){

		imgWidth = $(window).width()*0.7;
		$ct.find('.bg').css('width',imgWidth);
		$ct.css({'width':imgRealCount*imgWidth,'left':0-imgWidth});
	});

	$next.on('click',function(){
		playNext();
	});

	$pre.on('click',function(){
		playPre();
	});
	$bullet.find('li').on('click',function(){
		var idx = $(this).index();

		if(idx>curIdx){
			playNext(idx-curIdx);
		}else if(idx<curIdx){
			playPre(curIdx-idx);
		};
	});


	var curIdx = 0;
    var isAnimate = false;

    setBg(1);
    autoPlay();
	

	function playNext(idx) {
		var idx = idx||1;
		if (isAnimate) {
			return ;
		};
		isAnimate = true;
		for (var inter = 1; inter <= idx; inter++) {//idx代表轮播跳转的间隔或距离，并不是序号
			setBg(curIdx+1+inter);
		};
		

			$ct.animate({left:'-='+(imgWidth*idx)},function(){
				curIdx = (curIdx+idx)%imgCount;
				setBullet(curIdx);

				if(curIdx===0){
					$ct.css('left',0-imgWidth);
				};
				isAnimate=false;
			});				
	};

	function autoPlay(){
		setInterval(function(){
			playNext();
		},2000);
	}

	function playPre(idx) {
		var idx = idx||1;
		if (isAnimate) {
			return ;
		};
		isAnimate = true;

		for (var inter = 1; inter <= idx; inter++) {//idx代表轮播跳转的间隔或距离，并不是序号
			setBg(curIdx+1-inter);
		};
		

		$ct.animate({left:'+='+(imgWidth*idx)},function(){
			curIdx = (imgCount+curIdx-idx)%imgCount;
			setBullet(curIdx);

			if(curIdx===(imgCount-1)){
					$ct.css('left',0-imgWidth*imgCount);
				};
				isAnimate=false;
			});				
	}

	function setBullet(idx){
		$bullet.find('li').removeClass('active')
						  .eq(idx).addClass('active');
	}


	
	function setBg(idx){
		var idx = idx||0;
		var $bg = $ct.find('.bg').eq(idx);

		var imgUrl = $bg.attr('data-img');

		if($bg.data('isBgSet')){ return ;};

		$bg.css('background-image','url('+imgUrl+')');
		$bg.data('isBgSet', true);

	}
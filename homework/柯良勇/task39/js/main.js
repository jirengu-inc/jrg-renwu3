requirejs.config({
	baseUrl:'js/module',
	paths:{
		jquery:'../lib/jquery'
	}
});
requirejs(['jquery', 'goTop', 'waterFall', 'expose', 'carousel'],function($, GoTop, WaterFall, Expose, Carousel){

	new GoTop(); // 回到顶部

	var waterF=new WaterFall($('#portfolio .port-item'),$('#portfolio .btn'),3); // 瀑布流布局

	$('#about .item').find('li').each(function(){        // 出现后渐显
		Expose($(this));
	})

	new Carousel($('#header .ct'));    // 全屏轮播

});
requirejs.config({
    baseUrl: 'js/app',
    paths: {
 		'jquery':'../lib/jquery-2.2.4'
    }
})
require(['jquery','carousel','exposure','waterfall','gototop','getdata'],function($,Carousel,Exposure,Waterfall,Gotop,Getdata){

//轮播
var car = new Carousel($('.carousel'));
car.init();

//曝光显示
	var $timeli = $('.time-panel li');
	$timeli.each(function(){
		new Exposure($(this));
	});

//回到顶部
 new Gotop();



	var $load = $('#loadmore');

	var $ct = $('#portfolio ul'),
		 $items = $ct.children();

	var water = new Waterfall($ct,$items);//里面预先放了几个图片先建立瀑布流
		 water.render()//启动瀑布流

		 var perPageCount = 8,curPage = 1,loadRenderData = false;

		 	function getRenderData(){
		 		if(loadRenderData){return}
		 			loadRenderData = true;
		 		 $.ajax({
		 		  	 	url:'http://platform.sina.com.cn/slide/album_tech',
		 		  	 	dataType:'jsonp',
		 		  	 	jsonp:'jsoncallback',
		 		  	 	data:{
		 		  	 		app_key:'1271687855',
		 		  	 		num:perPageCount,
		 		  	 		page:curPage
		 		  	 	},
		 		  	 	success:function(res){
		 		  	 		if(res.status.code === '0'){
		 		  	 			loadRenderData = false;
		 		  	 			onSuccess(res.data);//成功得到数据
		 		  	 		}
		 		  	 	}
		 		  	 })
		 	}
		 	function tmplTojQElem(data){
		 	  	var tpl = "";
		 	  	var $nodes;
		 	  	for(var i=0;i<data.length;i++){
		 	  		tpl += '<li class="list-item portfolio-item">'+'<a href="'+data[i].url+'">'+'<img src="'+data[i].img_url+'">'+'</a>';
		 	  		tpl += '<h4>'+data[i].short_name+'</h4>';
		 	  		tpl += '<p>'+data[i].short_intro+'</p>';
		 	  		tpl += '</li>';
		 	  	}
		 	  	$nodes = $(tpl);
		 	  	return $nodes;//返回数据
		 	}
		 	function onSuccess(ret){
		 			curPage++;
		 		 var $nodes = tmplTojQElem(ret), defereds = []; 
		 	    $nodes.find('img').each(function () {
		 	    var defer = $.Deferred();
		 	    $(this).load(function() {
		 	    	defer.resolve();
		 	    });
		 	    defereds.push(defer);
		       });

		 	   $.when.apply(null,defereds).done(function() { 
		 			water.render($nodes);//之前建立了瀑布流对象，在这个基础上渲染
		 		});
		 	}
		 	$load.on('click',function(){
		 		getRenderData();
		 	})

/*	var getData = new Getdata();
	$load.on('click',function(){
		var $nodes = getData.getRenderData();
		console.log($nodes);
		water.render($nodes);//之前建立了瀑布流对象，在这个基础上渲染
	})
*/
})
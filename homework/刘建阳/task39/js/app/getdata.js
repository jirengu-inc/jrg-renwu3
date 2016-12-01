define(['jquery'],function($) {

		function getData(){
			this.perPageCount = 6;
			this.curPage = 1;
			this.loadRenderData = false;
		}
		
/*
		getData.prototype = {
			getRenderData : function(){
							if(this.loadRenderData){return}
								this.loadRenderData = true;
							var $nodes;
							var self = this;
							
							 $.ajax({
							  	 	url:'http://platform.sina.com.cn/slide/album_tech',
							  	 	dataType:'jsonp',
							  	 	jsonp:'jsoncallback',
							  	 	data:{
							  	 		app_key:'1271687855',
							  	 		num: self.perPageCount,
							  	 		page:self.curPage
							  	 	},
							  	 	success:function(res){
							  	 		console.log(res);
							  	 		if(res.status.code === '0'){
							  	 			self.loadRenderData = false;
							  	 			$nodes = self.onSuccess(res.data);//成功得到数据//self.onSuccess is not a function(…)
							  	 			console.log($nodes);
							  	 		}
							  	 	}
							  	 })
							 // if($nodes !== undefined){
							 // 	console.log($nodes);
							 	return $nodes;
							 // }
						},
			tmplTojQElem : function(data){
							  	var tpl = "";
							  	var $nodes;
							  	for(var i=0;i<data.length;i++){
							  		tpl += '<li>'+'<a href="'+data[i].url+'">'+'<img src="'+data[i].img_url+'">'+'</a>';
							  		tpl += '<h4>'+data[i].short_name+'</h4>';
							  		tpl += '<p>'+data[i].short_intro+'</p>';
							  		tpl += '</li>';
							  	}
							  	$nodes = $(tpl);
							  	return $nodes;//返回数据
							},
			onSuccess : function(ret){

								$nodes = this.tmplTojQElem(ret);
								var defereds = []; 
							    $nodes.find('img').each(function () {
									    var defer = $.Deferred();
									    $(this).load(function() {
									    	defer.resolve();
									    });
									    defereds.push(defer);
								      });

							   $.when.apply(null,defereds).done(function() { 
							   		// console.log($nodes);
									return $nodes;
								});
	 						}
		}
		*/

			getData.prototype.getRenderData = function(){
								if(this.loadRenderData){return}
									this.loadRenderData = true;
								var $nodesRender;
								var self = this;
								
								 $.ajax({
								  	 	url:'http://platform.sina.com.cn/slide/album_tech',
								  	 	dataType:'jsonp',
								  	 	jsonp:'jsoncallback',
								  	 	data:{
								  	 		app_key:'1271687855',
								  	 		num: self.perPageCount,
								  	 		page:self.curPage
								  	 	},
								  	 	success:function(res){
								  	 		// console.log(res);
								  	 		if(res.status.code === '0'){
								  	 			self.loadRenderData = false;
								  	 			$nodesRender = onSuccess(res.data);//成功得到数据//self.onSuccess is not a function(…)
								  	 			setTimeout(function(){
								  	 				console.log($nodesRender);
								  	 			},3000);
								  	 			// return $nodesRender;
								  	 		}
								  	 	}
								  	 })


								 function tmplTojQElem(data){
								 	  	var tpl = "";
								 	  	var $nodes;
								 	  	for(var i=0;i<data.length;i++){
								 	  		tpl += '<li>'+'<a href="'+data[i].url+'">'+'<img src="'+data[i].img_url+'">'+'</a>';
								 	  		tpl += '<h4>'+data[i].short_name+'</h4>';
								 	  		tpl += '<p>'+data[i].short_intro+'</p>';
								 	  		tpl += '</li>';
								 	  	}
								 	  	$nodes = $(tpl);
								 	  	return $nodes;//返回数据
								 	}
								 	function onSuccess(ret){

								 		 var $nodes = tmplTojQElem(ret), defereds = []; 
								 	    $nodes.find('img').each(function () {
								 	    var defer = $.Deferred();
								 	    $(this).load(function() {
								 	    	defer.resolve();
								 	    });
								 	    defereds.push(defer);
								       });


								 	   $.when.apply(null,defereds).done(function() { 
								 			// $nodesRender = $nodes;
								 			console.log($nodes);
								 			return $nodes;
								 		});

								 	}
							}

		// var a= getRenderData();
		// console.log(a);
		return getData;
})
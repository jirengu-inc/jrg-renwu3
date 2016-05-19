// 获取数据 创造元素 并对给定节点内的子元素进行瀑布流布局
define(['jquery'],function($){

	function waterFall($ct,$btn,num){
		this.start=0;
		this.num=num;
		this.$ct=$ct;
		this.loading=false;
		this.setPosition($ct);
		this.bind($btn);
	}

	waterFall.prototype={

		bind:function($btn){
			var _this=this;
			$btn.on('click',function(){
				_this.ajax();
			})
		},

		ajax: function(){  
		var _this=this;  
			if(this.loading===true)return;
			this.loading=true;          
			$.ajax({
				url: 'data.php',
				type: 'GET',
				data: {
					start: _this.start,
					len: _this.num
				},
			})
			.done(function(ret){
				var ret=JSON.parse(ret);
				_this.creatAppend(_this.$ct,ret);
				_this.start++;
				if(_this.start===4)_this.start=0;
				_this.loading=false;
			})
			.fail(function(){
				alert('server error');
				_this.loading=false;
			});
		},

		creatAppend: function($ct,data){  
			var html='';                    
			for(var i=0;i<data.length;i++){
				html += '<li class="item">';
				html += '<a href="#"><div class="box" style="background: url('+data[i].url;
				html += ') no-repeat;background-size: cover;"></div></a>';
				html += '<h3>'+data[i].h+'</h3>';
				html += '<p><i>'+data[i].p+'</i></p>';
				html += '</li>';    
			};
			var $item=$(html);
			$ct.append($item);
			this.setPosition($item);
		},

		setPosition: function($node){ 
			var _this=this;   
			if(this.min === undefined){ 
				this.itemWidth=$node.find('.item').outerWidth(true);   
				this.colNum=parseInt(this.$ct.width()/this.itemWidth);
				this.cloHeight=[];
				for(var i=0;i<this.colNum;i++){
					this.cloHeight.push(0);
				};
				$node=$node.find('li');
			};
			$node.each(function(){
				_this.min=0;
				for(var i=0;i<_this.colNum;i++){
					if(_this.cloHeight[i]<_this.cloHeight[_this.min]){
						_this.min=i;
					}
				};
				$(this).css({
					left: _this.min*_this.itemWidth,
					top: _this.cloHeight[_this.min],
				});
				_this.cloHeight[_this.min] += $(this).outerHeight(true);
				_this.$ct.height(Math.max.apply(null,_this.cloHeight));
			});
		}
	}
	return waterFall;
})
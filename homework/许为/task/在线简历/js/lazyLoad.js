function LazyLoading($node1,$node2){
		this.$node1=$node1;
		this.$node2=$node2;
		this.bind();
	}
	LazyLoading.prototype={
		bind:function(){
			var _this=this;
			$(window).on("scroll",function(){
				_this.load();
				// console.log(_this.reach());
				// console.log(_this.scrollTop);
				// console.log(_this.offsetTop);
			});
		},
		reach:function(){
			var widH=$(window).height();
			this.offsetTop=this.$node1.offset().top;
			this.scrollTop=$(window).scrollTop();
			if(this.scrollTop+widH>=this.offsetTop){
				return true;
			}else{
				return false;
			}
		},
		load:function(){
			var _this=this;
			this.$node2.each(function(){
				if(_this.reach()){
					$(this).animate({
						opacity:1
					},6000);
				}
			})
		}
	}
	var $nodeSkill1=$(".wrap-skills").eq(0);
	var $nodeSkill2=$(".wrap-skills div");
	var nodeSkill=new LazyLoading($nodeSkill1,$nodeSkill2)

	var $nodeWorks1=$(".wrap-works").eq(0);
	var $nodeWorks2=$(".wrap-works li");
	var nodeWorks=new LazyLoading($nodeWorks1,$nodeWorks2);
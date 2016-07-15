define(['jquery'],function ($) {
    function Carousel($node){
        this.ct = $node.find(".ct") ;
        this.$children = this.ct.children("li");
        this.prev = this.ct.siblings(".prev");
        this.next = this.ct.siblings(".next");
        this.bullet = this.ct.siblings(".bullet");
        this.length = this.$children.size();//克隆前图片的数量
        this.imgWidth = this.ct.children("li").width();
        this.cur = 0;
        this.isAnimate =true;//全局变量状态锁，允许执行自动播放的功能
        this.ct.append(this.$children.first().clone());
        this.ct.prepend(this.$children.last().clone());
        this.imgRealCount = this.ct.children().size();//克隆后图片的数量
        this.ct.css({left:0-this.imgWidth,width:this.imgRealCount*this.imgWidth});
        this.init();
    }
    Carousel.prototype = {
        init:function () {
            var me = this;
            me.bind();
            me.autoPlay();
        },
        bind : function () {
            var me = this;
            me.next.on("click",function (e) {
                e.preventDefault();
                me.stop();
                me.playNext();
                me.autoPlay();
            });
            me.prev.on("click",function (e) {
                e.preventDefault();
                me.stop();
                me.playPrev();
                me.autoPlay();
            });
            me.bullet.find("li").on("mouseenter",function () {
                var index = $(this).index();  //找出点击bullet的li元素的编号
                me.stop();
                if (index>me.cur){
                    me.playNext(index-me.cur);
                }
                else if(index<me.cur){
                    me.playPrev(me.cur-index);
                }
                me.autoPlay();
            });
        },
        playNext: function (idx) {
            var me = this;
            var idx = idx || 1; //移动图片的数量
            if(me.isAnimate){
                me.isAnimate = false;
                me.ct.animate({     //让装载图片的火车，移动
                    left : "-=" +(me.imgWidth*idx)
                },function () {
                    me.cur = (me.cur + idx)%me.length;//改变编号
                    if(me.cur===0){//如果是第一号 虽然展示的是克隆体，但应该展示第一号，所以
                        me.ct.css({left:0-me.imgWidth});//瞬间移动为第一个,因为前面有一个克隆的，所以要减去一个imgWidth
                    }
                    me.isAnimate = true;
                    me.setBullet();
                })
            }
        },
        playPrev: function(idx) {
            var me = this;
            var idx = idx || 1; //移动图片数的数量
            if(me.isAnimate){
                me.isAnimate = false;
                me.ct.animate({     //让装载图片的火车，移动
                    left : "+=" +(me.imgWidth*idx)
                },function () {
                    me.cur = (me.length+me.cur-idx)%me.length;//改变编号
                    if(me.cur===me.length-1){//如果是最后一号 虽然展示的是克隆体，但应该展示最后一号，所以
                        me.ct.css({left:0-me.imgWidth*me.length});//瞬间移动为最后一个,因为前面有一个克隆的，所以要减去imgWidth*length
                    }
                    me.isAnimate = true;
                    me.setBullet();
                })
            }
        },
        setBullet:function () {//给相应bullet的li元素加上背景色
            var me =this;
            me.bullet.children().removeClass("active").eq(me.cur).addClass("active");
        },
        autoPlay:function  (){//自动播放
            var me = this;
            me.start = setInterval(function () { //编号start为全局变量，不然的话stop函数找不到这个编号了
                me.playNext();
            },2500)
        },
        stop:function () {//停止自动播放功能
            var me =this;
            clearInterval(me.start);
        }
    };
    return Carousel;
});

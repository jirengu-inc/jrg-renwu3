//开始配置
$('.description-ct .description').hide();
$('.description-ct').find('.description').eq(0).show();

$('.demo-tab .demo-module').hide();
$('.demo-tab').find('.demo-module').eq(0).show();
function Tab2($select1,$select2) {//$select1是导航栏中的每一个li
    this.$el1 = $select1;         //$select2是tab中的每一个li
    this.$el2 = $select2;
    this.bind();
}
Tab2.prototype = {
    bind:function () {
        var me = this;
        me.$el1.on("click",function (e) {
            e.preventDefault();
            me.$el1.removeClass('active');
            $(this).addClass('active');
            var index = $(this).index();     //index()，返回的是该元素在同辈中的位置，而不是在选择器集合中的位置；
            me.$el2.hide();             //index()返回的数值是从0开始的，和选择器数组相对应；
            me.$el2.eq(index).show();
        });
    }
};
new Tab2($('.skill-description').find('li'),$('.description-ct').find('.description'));
new Tab2($('.skill-nav-ct').find('li'),$('.demo-tab').find('.demo-module'));

//无缝滚动轮播
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
$('.carousel').each(function(){
    new Carousel($(this));
});

//商品导航栏的Tab
function Tab1($select1,$select2) {
    this.$el1 = $select1;
    this.$el2 = $select2;
    this.bind();
}
Tab1.prototype={
    bind:function () {
        var me = this;
        me.$el1.on("mouseenter",function () {
            $(this).addClass('nav-active');
            $(this).find('.cate-title').addClass('font-active');
            $(this).find('.icon-goto').addClass('font-active');
            var index = $(this).index();     //index()，返回的是该元素在同辈中的位置，而不是在选择器集合中的位置；
            me.$el2.eq(index).show();
        });
        me.$el1.on("mouseleave",function () {
            $(this).removeClass('nav-active');
            $(this).find('.cate-title').removeClass('font-active');
            $(this).find('.icon-goto').removeClass('font-active');
            var index = $(this).index();
            me.$el2.eq(index).hide();
        });
    }
};
new Tab1($('.category'),$('.child-panel'));

//瀑布流布局
function Waterfall($select1,$select2){//对选择器进行瀑布流布局，共用一个数组
    this.$el = $select1;             //$select1是li元素
    this.$ct = $select2;             //$select2是父容器
    this.rend();
}
Waterfall.prototype ={
    _isAdd :false,
    colSumHeight:[],
    rend:function () {
        var me = this;
        var nodeWidth= me.add().nodeWidth;
        me.$el.each(function () {
            var idx = me.idx().idx;
            var min = me.idx().min;
            $(this).css({
                left:nodeWidth*idx,
                top: min
            });
            me.colSumHeight[idx] = me.colSumHeight[idx]+$(this).outerHeight(true);
        });
        me.max = Math.max.apply(null,me.colSumHeight);
    },
    add:function () {
        var me = this;
        var nodeWidth = me.$el.outerWidth(true);
        var ctWidth = me.$ct.width();
        var colNum = parseInt(ctWidth/nodeWidth);
        if(!me._isAdd){    //确定列数这件事只做一次
            for(var i=0;i<colNum;i++){
                me.colSumHeight.push(0);
            }
            Waterfall.prototype._isAdd = true; //确定列数这件事只做一次
        }
        return{
            nodeWidth:nodeWidth
        }
    },
    idx:function () {
        var me =this;
        var idx = 0;
        var min = me.colSumHeight[0];
        for(var i=0;i<me.colSumHeight.length;i++){
            if(me.colSumHeight[i]<min){
                min = me.colSumHeight[i];
                idx = i;
            }
        }
        return{
            idx : idx,
            min : min
        }
    }
};
$('.waterfall li').each(function () {
    var $li = $(this);
    $li.find('img').each(function () {
            if(this.complete){ //对于那些不会触发load事件，但已经加载好的图片，我们让它进行瀑布流布局
                var a = new Waterfall($li,$('.waterfall'));
                $('.waterfall').height(a.max);
            }
            else{ //对于那些一开始就没有加载好的图片，则要等到load事件后，再进行瀑布流的布局
                $(this).on('load',function () {
                    var a = new Waterfall($li,$('.waterfall'));
                    $('.waterfall').height(a.max);
                });
            }
        }
    );
});



//曝光组件
function Expourse($selector,callback,boolean) {
    boolean = boolean || false;        //$selector选择器
    this.$el = $selector;               //callback回调函数，当选择器曝光时执行的回调函数
    this.cb = callback;                 //boolean为false时，代表只执行一次回调函数，为true时，代表每一次曝光都会执行此回调函数
    this.boolean = boolean;             //boolean默认值为false
    this.queue = [];
    this.isBind = false;
    this.add();
    this.init();
}
Expourse.prototype={
    add:function () {
        var me =this;
        me.$el.each(function () {
            var o = {
                el:$(this),
                cb:me.cb
            };
            me.queue.push(o);
        });
    },
    init:function () {
        var me =this;
        me.isBind || me.bind();
        me.boolean ? me.moreDo() : me.oneDo();  //为了第一次还没有滚动的时候加载一次
    },
    bind:function () {
        var me =this;
        var clock = false;
        $(window).on("scroll",function () {
            clock && clearTimeout(clock);
            clock = setTimeout(function () {
                if(me.boolean){
                    me.moreDo()
                }
                else{
                    me.oneDo()
                }
            },300)
        });
        me.isBind = true;
    },
    oneDo:function () { //用于图片加载，性能更好
        var me =this;
        var arrTmp = [];
        for(var i =0;i<me.queue.length;i++){
            var item = me.queue[i];
            if(me.isShow(item.el)){
                item.cb.call(item.el[0]);
            }
            else{
                arrTmp.push(item);
            }
        }
        me.queue = arrTmp;
    },
    moreDo:function () { //用于无限滚动
        var me =this;
        for(var i =0;i<me.queue.length;i++){
            var item = me.queue[i];
            if(me.isShow(item.el)){
                item.cb.call(item.el[0]);
            }
        }
    },
    isShow:function ($el) {
        var me =this;
        var winHeigth = $(window).height(),
            winScrollTop = $(window).scrollTop(),
            nodeTop = $el.offset().top;
        if(nodeTop<winHeigth){ //第一次还没有滚动的时候，加载一次
            return true;
        }
        return (winHeigth+winScrollTop>=nodeTop) ? true : false;
    }
};

function showTimeLine($el) {
    $el.siblings('.timeline-list').show();
}
new Expourse($(".lazy"),function () {
    showTimeLine($(this));
});

//回到顶部
function Gotop(distance) {
    this.distance = distance;
    this.createNode();
    this.bind();
}
Gotop.prototype = {
    createNode:function () {
        var me = this;
        me.$node = $('<div id="go-top"><i class="fa fa-angle-up"></i></div>');
        $('body').append(me.$node);
        me.$node.on('click',function () {
            $(window).scrollTop(0);
        });
        me.hide();
    },
    bind:function () {
        var me = this;
        $(window).on('scroll',function () {
            if($(window).scrollTop()>=me.distance){
                me.show();
            }
            else{
                me.hide();
            }
        });
    },
    show:function () {
        var me =this;
        me.$node.show();
    },
    hide:function () {
        var me = this;
        me.$node.hide();
    }
};
new Gotop(300);

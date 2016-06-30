define(['jquery'],function ($) {
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
    return Expourse;
});

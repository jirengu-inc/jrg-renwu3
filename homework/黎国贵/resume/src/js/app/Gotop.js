define(['jquery'],function ($) {
    function Gotop(distance,time) {
        this.distance = distance;
        this.time = time || 1000;
        this.createNode();
        this.bind();
    }
    Gotop.prototype = {
        createNode:function () {
            var me = this;
            me.$node = $('<div id="go-top"><i class="fa fa-angle-up"></i></div>');
            $('body').append(me.$node);
            me.$node.on('click',function () {
                $('html,body').animate({scrollTop:0},me.time);
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
    return Gotop;
});

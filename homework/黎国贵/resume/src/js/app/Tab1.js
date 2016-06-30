define(['jquery'],function ($) {
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
    return Tab1;
});

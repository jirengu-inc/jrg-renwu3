define(['jquery'],function ($) {
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
    return Tab2;
});
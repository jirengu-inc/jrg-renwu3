define(['jquery'],function ($) {
    function init(distance) {
        if($("#go-top")>0){
            return;
        }
        var $goTop = $('<div id="go-top">回到顶部</div>');
        $megoTop = $goTop;
        $("body").append($megoTop);
        bind($megoTop,distance);
    }
    function bind($megoTop,distance) {
        $(window).on("scroll",function () {
            var scrollTop = $(window).scrollTop();
            if(scrollTop>distance){
                $megoTop.show();
            }
            else {
                $megoTop.hide();
            }
        });
        $megoTop.on("click",function () {
            $(window).scrollTop(0);
        })
    }
    return{
        init:init //参数是出现的距离
    }
});
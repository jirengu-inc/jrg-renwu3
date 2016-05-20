define(['jquery'],function ($) {
    var arr=[];
    var idx;
    function _push() {
        arr=[];//差点又忘记清空原有的数组了，到时候数组长度又增加了好多。。
        arr.push($("#header").height());
        arr.push($(".services").height()+$("#header").height());
        arr.push($(".portfolio").height()+$(".services").height()+$("#header").height());
        arr.push($(".about").height()+$(".portfolio").height()+$(".services").height()+$("#header").height());
        arr.push($('.client').height()+$('.team').height()+$(".about").height()+$(".portfolio").height()+$(".services").height()+$("#header").height());
    }
    function init($el) {
        _push(); //每次调用都会重新计算一次高度
        console.log(arr);
        _bind($el);
    }
    function _bind($el) {
        $(window).on("scroll",function () {
           if(_isShow($el)){
                $el.removeClass("nav-color");
               $el.eq(idx).addClass('nav-color');
           }
        });
        $($el).on("click","a",function () {
            $el.removeClass("nav-color");
            $(this).parents("li").addClass('nav-color');
        })
    }
    function _isShow($el) {
        var wt = $(window).scrollTop();
        if(wt>arr[0]){
            $('.navbar-header').css({
                fontSize:20
            });
            $('#navbar').css({
                backgroundColor:'black'
            })
        }
        if(wt<arr[0]){
            $el.removeClass("nav-color");
            $('.navbar-header').css({
                fontSize:30
            });
            $('#navbar').css({
                backgroundColor:'rgba(225,225,225,0)'
            });
            return false;
        }
        if(arr[0]<wt&&wt<arr[1]){
            idx = 4;
            return true;
        }
        if(arr[1]<wt&&wt<arr[2]){
            idx = 3;
            return true;
        }
        if(arr[2]<wt&&wt<arr[3]){
            idx = 2;
            return true;
        }
        if(arr[3]<wt&&wt<arr[4]){
            idx = 1;
            return true;
        }
        if(wt>arr[4]){
            idx = 0;
            return true;
        }
    }
    return{
        init:init
    }
});

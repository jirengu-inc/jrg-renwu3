
requirejs.config({
    baseUrl:"src/js/lib",
    paths: {
        jquery: "../com/jquery-2.2.3.min",
        goTop:"../app/回到顶部插件",
        allCarousel:"../app/全屏轮播插件",
        lazyLoad:"../app/懒加载插件",
        navColor:"../app/导航栏变色插件",
        waterfall:'../app/瀑布流插件',
        ajaxLi:"../app/ajax生成li"
    }
});
requirejs(['jquery','goTop','allCarousel','lazyLoad','navColor','waterfall','ajaxLi'], function ($,goTop,allCarousel,lazyLoad,navColor,waterfall,ajaxLi) {
    var $navli = $('.navbar-nav').find("li");
    goTop.init($("#header").height());
    allCarousel.init();
    var $lazy = $(".lazy");
    lazyLoad.one($lazy, function () {
       $(this).siblings(".timeline-list").fadeIn(1000);
    });
    var $pful = $('.portfolio-list');
    var $pfli = $('.portfolio-list').find('li');
    waterfall.init($pfli,$pful);
    $pful.css({
        height:waterfall.maxH()
    });
    navColor.init($navli);
    $('.more').on("click",function (e) {
        e.preventDefault();
        ajaxLi.init();
    });
});

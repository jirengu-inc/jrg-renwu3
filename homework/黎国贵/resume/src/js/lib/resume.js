requirejs.config({
    baseUrl:"src/js/lib",
    paths: {
        jquery: "../../jq/jquery-2.2.3.min",
        Tab1:"../app/Tab1",
        Tab2:"../app/Tab2",
        Gotop:"../app/Gotop",
        Expourse:"../app/Expourse",
        Waterfall:'../app/Waterfall',
        Carousel:"../app/Carousel"
    }
});
requirejs(['jquery','Tab1','Tab2','Gotop','Expourse','Waterfall','Carousel'],function ($,Tab1,Tab2,Gotop,Expourse,Waterfall,Carousel) {
    //开始配置
    $('.description-ct .description').hide();
    $('.description-ct').find('.description').eq(0).show();

    $('.demo-tab .demo-module').hide();
    $('.demo-tab').find('.demo-module').eq(0).show();
    new Tab2($('.skill-description').find('li'),$('.description-ct').find('.description'));
    new Tab2($('.skill-nav-ct').find('li'),$('.demo-tab').find('.demo-module'));

    //无缝滚动轮播
    $('.carousel').each(function(){
        new Carousel($(this));
    });

    //商品导航栏的Tab
    new Tab1($('.category'),$('.child-panel'));

    //瀑布流布局
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
    function showTimeLine($el) {
        $el.siblings('.timeline-list').show();
    }
    new Expourse($(".lazy"),function () {
        showTimeLine($(this));
    });

    //回到顶部
    new Gotop(300,1500);
});
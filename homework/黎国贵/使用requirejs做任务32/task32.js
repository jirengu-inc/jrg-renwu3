
//别名配置
requirejs.config({
    paths: {
        jquery: "jquery-2.2.3.min",
        lazyLoad: "懒加载插件",
        waterfall: "瀑布流插件",
        newElement:"发送新浪云的JSONP插件并生成li元素"
    }
});
requirejs(['jquery', 'lazyLoad','newElement'], function ($, lazyLoad,newElement){
    var $load = $("#load");
    lazyLoad.one($load, function () {
        newElement.init();
    },true);
});


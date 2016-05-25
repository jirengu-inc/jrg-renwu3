define(['jquery','waterfall','navColor'],function ($,waterfall,navColor) { //发送jsonp请求，生成li元素，调用瀑布流布局
    var isClose =false;
    function init() {
        _ajax();
    }
    function _ajax() {
        if(isClose){
            return;
        }
        isClose = true;
        $.ajax({
            url: 'src/js/app/task32.php',
            type: 'get',
            dataTypr:'json',
            data: {
                len: 6
            },
            success: function(data){//data对象字符串
                // console.log(data);
                var ret = JSON.parse(data);
                // console.log(ret);
                if(ret && ret.status && ret.status.code === "0") {
                    _composition(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
                }
            },
            error: function(){
                console.log('get error data');
                isClose = false;
            }
        });
    }
    function _composition(nodeList) {
        //nodeList就是ret.data
        var tpl = '';
        var $nodes;
        for(var i=0;i<nodeList.length;i++){ //遍历整个data数组
            tpl += '<li class="'+nodeList[i].liClass+'">';
            tpl += '<a href="" class="'+nodeList[i].aClass+'"><div class="portfolio-hover-centent"><i class="fa fa-plus vertical-middle"></i></div></a>';
            tpl += '<h4>'+nodeList[i].htext+'</h4>';
            tpl += '<p>'+nodeList[i].ptext+'</p>';
            tpl += '</li>';
        }
        $nodes = $(tpl);
        $('.portfolio-list').append($nodes);
        _bind($nodes);
    }
    function _bind($nodes) {
        waterfall.init($nodes,$('.portfolio-list'));
        $('.portfolio-list').css({
            height:waterfall.maxH()
        });
        navColor.init($('.navbar-nav').find("li"));
        isClose = false;
    }
    return{
        init : init
    }
});

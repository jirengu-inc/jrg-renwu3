
define(['jquery'],function ($) {
    var _queue = [];
    var _isBind = false;
    function one($selector,callback,boolean) { //第三个参数代表是否执行多次回调函数，默认值为false,回调函数只执行一次。
        boolean = boolean || false;            //true的话，回调函数执行多次。
        _add($selector,callback);
        _init(boolean);
    }
    function _add($selector,callback) {
        $selector.each(function () {
            var o = {
                el:$(this),
                cb:callback
            };
            _queue.push(o);
        });
    }

    function _init(boolean) {
        _isBind || _bind(boolean);
        boolean ? _moreDo() : _oneDo();  //为了第一次还没有滚动的时候加载一次
    }

    function _bind(boolean) {
        var  clock = false,
            interval = 300;
        $(window).on("scroll",function () {
            clock && clearTimeout(clock);
            clock = setTimeout(function () {
                if(boolean){
                    _moreDo()
                }
                else{
                    _oneDo()
                }
            },interval)
        });
        _isBind = true;
    }
    function _oneDo() { //用于图片加载，性能更好
        var arrTmp = [];
        for(var i =0;i<_queue.length;i++){
            var item = _queue[i];
            if(isShow(item.el)){
                item.cb.call(item.el[0]);
            }
            else{
                arrTmp.push(item);
            }
        }
        _queue = arrTmp;
    }
    function _moreDo() { //用于无限滚动
        for(var i =0;i<_queue.length;i++){
            var item = _queue[i];
            if(isShow(item.el)){
                item.cb.call(item.el[0]);
                console.log("执行b")
            }
        }
    }
    function isShow($el) {
        var winHeigth = $(window).height(),
            winScrollTop = $(window).scrollTop(),
            nodeTop = $el.offset().top;
        if(nodeTop===0){
            return false;
        }
        if(nodeTop<winHeigth){ //第一次还没有滚动的时候，加载一次
            return true;
        }
        return (winHeigth+winScrollTop>=nodeTop) ? true : false;
    }
    return{
        one:one
    }
});



define(['jquery'],function ($) {  //对选择器进行瀑布流布局，不清空数组
    var colSumHeight= [];
    var _isAdd = false;
    function init($el) {
        _rend($el);
    }
    function _add($el) {
        var nodeWidth = $el.outerWidth(true);
//            var winWidth = $(window).width();
        var ctWidth = $("#pic-ct").width();
        var colNum = parseInt(ctWidth/nodeWidth);
        if(!_isAdd){    //确定列数这件事只做一次
            for(var i=0;i<colNum;i++){
                colSumHeight.push(0);
            }
            _isAdd = true;
        }
        return{
            nodeWidth:nodeWidth
        }
    }
    function _idx() {
        var idx = 0;
        var min = colSumHeight[0];
        for(var i=0;i<colSumHeight.length;i++){
            if(colSumHeight[i]<min){
                min = colSumHeight[i];
                idx = i;
            }
        }
        return{
            idx : idx,
            min : min
        }
    }
    function _rend ($el) {
        var nodeWidth= _add($el).nodeWidth;
        $el.each(function () {
            var idx = _idx().idx;
            var min = _idx().min;
            var $cur = $(this);
            $cur.css({
                left:nodeWidth*idx,
                top: min
            });
            colSumHeight[idx] = colSumHeight[idx]+$cur.outerHeight(true);
        });
    }
    return {
        init :init
    }
});


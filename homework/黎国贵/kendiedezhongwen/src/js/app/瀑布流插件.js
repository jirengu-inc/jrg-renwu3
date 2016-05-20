
define(['jquery'],function ($) {  //对选择器进行瀑布流布局，不清空数组
    var colSumHeight= [];
    var _isAdd = false;
    var maxH;
    function init($el,$ul) {
        _rend($el,$ul);
    }
    function _add($el,$ul) {
        var nodeWidth = $el.outerWidth(true);
        var ctWidth = $ul.width();
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
    function _rend ($el,$ul) {
        var nodeWidth= _add($el,$ul).nodeWidth;
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
        maxH = Math.max.apply(null,colSumHeight);
        // console.log(maxH);
    }
   function _maxH() {
       return maxH;
   }
    return {
        init :init,
        maxH : _maxH  //maxH的作用是进行瀑布流布局之后，返回数组的最大值。
                      // 所以使用maxH时一定要先启动init
    }
});


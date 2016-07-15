/*第一篇有了li节点 先计算他的窗口一排可以放多少个li ，得到后放到一个数组里面，
 每加载一个都要计算他的高度和,比较他的高度和在这一排里面取最小，得出offset().top/offset().left
*定位 判断是否visible 就在此加载
* */

define(function(require,exports,module){
    var $ = require('jquery');
    function waterFull(heightSumArr,itemW){
        this.heightSumArr = heightSumArr;
        this.itemW = itemW;
    }
    module.exports = waterFull;
    waterFull.prototype.init = function($nodes){
        var me = this;
        $nodes.each(function(){
            var $cur = $(this);
            $(this).find('img').on('load',function(){
                var minHeight = me.heightSumArr[0],idx = 0;
                for(var i = 0;i<me.heightSumArr.length;i++){
                    if(minHeight > me.heightSumArr[i]){
                        idx = i;
                        minHeight = me.heightSumArr[i];
                    }
                }
                $cur.css({
                    left : me.itemW * idx,
                    top : minHeight,
                    opacity : 1
                });
                me.heightSumArr[idx] = $cur.outerHeight(true) + me.heightSumArr[idx];
                $('#pic-ct').height(Math.max.apply(null,me.heightSumArr));//这是js方法操作撑开item父容器的高度
            })
        })
    }
});
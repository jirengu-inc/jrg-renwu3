define(['jquery'],function ($) {
    function Waterfall($select1,$select2){//对选择器进行瀑布流布局，共用一个数组
        this.$el = $select1;             //$select1是li元素
        this.$ct = $select2;             //$select2是父容器
        this.rend();
    }
    Waterfall.prototype ={
        _isAdd :false,
        colSumHeight:[],
        rend:function () {
            var me = this;
            var nodeWidth= me.add().nodeWidth;
            me.$el.each(function () {
                var idx = me.idx().idx;
                var min = me.idx().min;
                $(this).css({
                    left:nodeWidth*idx,
                    top: min
                });
                me.colSumHeight[idx] = me.colSumHeight[idx]+$(this).outerHeight(true);
            });
            me.max = Math.max.apply(null,me.colSumHeight);
        },
        add:function () {
            var me = this;
            var nodeWidth = me.$el.outerWidth(true);
            var ctWidth = me.$ct.width();
            var colNum = parseInt(ctWidth/nodeWidth);
            if(!me._isAdd){    //确定列数这件事只做一次
                for(var i=0;i<colNum;i++){
                    me.colSumHeight.push(0);
                }
                Waterfall.prototype._isAdd = true; //确定列数这件事只做一次
            }
            return{
                nodeWidth:nodeWidth
            }
        },
        idx:function () {
            var me =this;
            var idx = 0;
            var min = me.colSumHeight[0];
            for(var i=0;i<me.colSumHeight.length;i++){
                if(me.colSumHeight[i]<min){
                    min = me.colSumHeight[i];
                    idx = i;
                }
            }
            return{
                idx : idx,
                min : min
            }
        }
    };
    return Waterfall;
});

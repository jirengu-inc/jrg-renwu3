
define(function(require,exports,module){
    var $ = require('jquery');
    function goTop(){
        if($("#go-top").length>0){
            return;
        }
        var $goTop = $("<div id='go-top'>回到</br>顶部</div>")
        $("body").append($goTop);
        this.$goTop = $goTop;
    }
    module.exports = goTop;
    goTop.prototype.bind = function(){
        var me = this;
        $(window).on("scroll",function(){
            var scrollOffset = $("body").scrollTop();
            if(scrollOffset > 100){
                me.$goTop.show();
            }else{
                me.$goTop.hide();
            }
        });
        $("#go-top").on("click",function(){
            $(window).scrollTop(0);
        });
    }
    var p = new goTop();
    p.bind();
});
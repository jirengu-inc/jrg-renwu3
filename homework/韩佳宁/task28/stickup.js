(function($) {
    $.fn.stickup = function(handler) {
        var $cur = this,
            curHeight = $cur.height(),
            curWidth = $cur.width(),
            offsetTop = $cur.offset().top,
            offsetLeft = $cur.offset().left,
            onChange = handler || function() {};

        //克隆目标元素,并让其暂时隐藏以保证同时只能看到一个
        var $clone = $cur.clone()
            .css('opacity', 0)
            .insertBefore($cur)
            .hide()
        //监听窗口滚动
        $(window).on('scroll', function() {
            if ($(this).scrollTop() >= offsetTop) {
                if (!isFixed()) {
                    setFixed()
                }
            } else {
                if (isFixed()) {
                    unsetFixed()
                }
            }
        })
        //检查fixed状态
        function isFixed() {
            return !!$cur.attr('fixed')//两个感叹号是为了保证转换出来的值一定是布尔值
        }
        //设置fixed状态
        function setFixed() {
            $cur.attr('fixed', true) //自定义属性fixed作为标识
                .css({
                    position: 'fixed',
                    top: 0,
                    left: offsetLeft,
                    'z-index': 999,
                    width: curWidth,
                });
            $clone.show();
        }
        //解除stick状态
        function unsetFixed() {
            $cur.removeAttr('fixed')
                .removeAttr('style')
            $clone.hide()
        }
    }
})(jQuery)

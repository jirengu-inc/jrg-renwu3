(function ($) {
    /**
     *
     * @param opts
     *         opts.ct  目标所在容器对象
     *         opts.callBack  曝光后触发的回调
     */
    $.fn.exposure=function (opts) {
        // var target = this.get(0);
        var option = {
            init:function (target,ct,callBack) {
                this.$ct=ct;
                this.$target=target;
                this.callBack=callBack;
                this.checkVisible();
                return this;
            },
            bindEvent:function () {
                var self=this;
                $(window).on('scroll',function (e) {
                    self.timer && clearTimeout(self.timer);
                    self.timer = setTimeout(function() {
                        self.checkVisible();
                    }, 200);
                })
                return this;
            },
            checkVisible:function () {
                var self=this;
                this.$target.each(function() {
                    var $cur = $(this);
                    if (self.isVisible($cur)) {
                        self.callBack && self.callBack.call($cur);
                        $cur.data('loaded', true);
                    }
                });
            },
            hasLoaded:function ($e) {
                return !!$e.data('loaded')
            },
            isVisible:function ($cur) {
                return (this.$ct.height() +　this.$ct.scrollTop()) > $cur.offset().top;
            }
        };
        option.init(this,opts.ct || $(window),opts.callBack).bindEvent();
    }

})(jQuery)
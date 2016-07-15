 var EventCentor = (function () {
    var events = {};

    function on(eventName ,handler) {
        events[eventName] = events[eventName] ||[];
        events[eventName].push({handler:handler});
    }

    function fire(eventName,contenxt,args) {
        if(!events[eventName])return ;
        events[eventName].forEach(function (e,i,a) {
            e.handler.apply(contenxt,args || []);
        });
        return this;
    }
    
    function off(eventName,handler) {
        if(!events[eventName])return ;
        var index = events[eventName].indexOf(handler);
        events[eventName].splice(index,1);
    }
    return {
        on:on,
        off:off,
        fire:fire
    }
})();
var Exposure= (function () {
    var utils = {
        isVisible:function ($target) {
            return ( $(window).height() +　$(window).scrollTop()) > $target.offset().top;
        },
        check : function ($target,callback) {
            $(window).on('scroll',function (e) {
                if(utils.isVisible($target)){
                    callback && callback.call();
                }
            });
        },
        work:function ($target,callback,one) {
            EventCentor.on('window_scroll_exposure',callback);
            utils.check($target,function () {
                EventCentor.fire('window_scroll_exposure',$target) ;
                one && EventCentor.off('window_scroll_exposure',callback);
            });
        }
    }
    return {
        bind:function ($target,callback) {
            utils.work($target,callback);
        },
        one:function ($target,callback) {
            utils.work($target,callback ,true)
        }
    }
})();


function Dialog(options) {
    //options=$.extend
    this.render(options).bindEvent();
}
Dialog.prototype={
    defaultOption:{
        width:'350',
        model:false,
        title:'hunger',
        content:'hello boys~',
        isClose:true,
        isSure:true,
        onClose:function () {},
        onSure:function () {}
    },
    bindEvent:function () {
        var _this = this;
        _this.$dialog.find('.dialog-btns>.cancel').add('.head-close').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            _this.opts.onClose();
            _this.close();
        });
        _this.$dialog.find('.dialog-btns>.sure').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            _this.opts.onSure();
            _this.close();
        });

        this.$dialog.on('mousedown',function (e) {
            e.stopPropagation();
            var $dialog = $(this),
                evtX = e.pageX - $dialog.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
                evtY = e.pageY - $dialog.offset().top;
                $dialog.addClass('draggable').data('evtPos', {x:evtX, y:evtY});
        }).on('mouseup',function () {
            //e.stopPropagation();
            $(this).removeClass('draggable').removeData('pos');
        });
        $('body').on('mousemove',function (e) {
            e.stopPropagation();
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
                left: e.pageX-$('.draggable').data('evtPos').x
            });
        })
    },
    setOpts:function (opts) {
       if (typeof opts === 'object'){
            this.opts = $.extend({}, this.defaultOption, opts);
        }
        return this;
    },
    render:function (opts) {
        var html =  '<div class="main-dialog undisplay">'+
                                '<div class="dialog-header justify">'+
                                    '<span class="head-title"><h2>title</h2></span>'+
                                    '<span class="head-close small-hand">X</span>'+
                                '</div>'+
                                '<div class="dialog-content"></div>'+
                                '<div class="dialog-footer clear">'+
                                    '<div class="dialog-btns">'+
                                        '<a href="javascript:void(0);" class="btn cancel">取消</a>'+
                                        '<a href="javascript:void(0);" class="btn sure">确定</a>'+
                                    '</div>'+
                                '</div>'+
                    '</div>';

        this.$dialog=$(html);
        this.setOpts(opts).setDialog( this.$dialog);
        $('body').append(this.$dialog)
        return this;
    },
    setDialog: function(){
        var $dialog = this.$dialog;
        if(!this.opts.title){
            $dialog.find('.dialog-header').hide();
        }else{
            $dialog.find('.dialog-header').show();
        }
        if(!this.opts.isClose){
            $dialog.find('.dialog-footer .cancel').hide();
        }else{
            $dialog.find('.dialog-footer .cancel').show();
        }
        if(!this.opts.isSure){
            $dialog.find('.dialog-btns >.sure').hide();
        }else{
            $dialog.find('.dialog-btns >.sure').show();
        }
        if(!!this.opts.model){
            $('body').append('<div class="model-dialog"></div>');
        }

        $dialog.find('.dialog-header h2').text(this.opts.title);
        $dialog.find('.dialog-content').html(this.opts.content);
        return $dialog;
    },

    open:function () {
        this.$dialog.show();
    },
    close:function () {
        this.$dialog.hide();
        this.opts.model && $('.model-dialog').remove();
    }
};
        function Dialog() {
        	//创建窗口
            this.createDialog()
            //绑定事件
            this.bindEvent()
        }

        Dialog.prototype = {
            defaultOpts: {//设置传入参数的缺省值
                title: '',//空字符串
                message: '',//空字符串
                isShowCloseBtn: true,//是否展示关闭按钮
                isShowConfirmBtn: false,
                onClose: function() {},
                onConfirm: function() {}
            },

            open: function(opts) {
                this.setOpts(opts)//设置项目
                this.setDialog()//设置弹窗
                this.showDialog()//展示弹窗
            },

            close: function() {
                this.hideDialog()//隐藏弹窗
            },

            setOpts: function(opts) {
                if (typeof opts === 'string') {//如果传入的opts是字符串
                    this.opts = $.extend({}, this.defaultOpts, {//就把opts的值放入this.opts的message里
                        message: opts
                    })
                } else if (typeof opts === 'object') {//如果传入的opts是个对象
                    this.opts = $.extend({}, this.defaultOpts, opts)//就把opts和缺省值合并后放入this.opts里
                }
            },

            bindEvent: function() {//事件绑定
                var _this = this 
                _this.$dialog.find('.btn-close').on('click', function(e) {
                    e.preventDefault()//阻止默认
                    _this.opts.onClose()//执行关闭
                    _this.hideDialog()//隐藏窗口
                })
                _this.$dialog.find('.btn-confirm').on('click', function(e) {
                    e.preventDefault()
                    _this.opts.onConfirm()
                    _this.hideDialog()
                })

                _this.$dialog.on('mousedown', function(e) {
                    
//			                    事件对象e有四对XY 
//					clientX clientY 浏览器可视范围 
//					offsetX offsetY 距离最近的div 
//					pageX pageY 页面左上角 
//					screenX screenY 屏幕坐标
                    
                    // $dialog.offset(): dialog的左上角到页面左上边缘的绝对位置
                    var $dialog = $(this),
                        eX = e.pageX - $dialog.offset().left, //eX 事件的触发点在 dialog内部到 dialog 的左边界的距离
                        eY = e.pageY - $dialog.offset().top
                    $dialog.addClass('draggable').data('evtPos', {
                        x: eX,
                        y: eY
                    })
                })
                $('body').on('mousemove', function(e) {
                    $('.draggable').length && $('.draggable').offset({
                        top: e.pageY - $('.draggable').data('evtPos').y, // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
                        left: e.pageX - $('.draggable').data('evtPos').x
                    })
                })

                $('body').on('mouseup', function() {
                    $('.draggable').length && $('.draggable').removeClass('draggable').removeData('pos');
                })


            },


            //创建Dialog
            createDialog: function() {
                var tpl = '<div class="dialog" style="display:none">' + '<div class="dialog-box">' + '<div class="dialog-header"><h3></h3><span class="btn-close">x</span></div>' + '<div class="dialog-content">' + '</div>' + '<div class="dialog-footer">' + '  <a href="#" class="btn btn-close">取消</a>' + '  <a href="#" class="btn btn-confirm">确定</a>' + '</div>' + '</div>' + '</div>';
                this.$dialog = $(tpl);
                $('body').append(this.$dialog)
            },

            //根据参数设置 Dialog 样式和内容
            setDialog: function() {
                var $dialog = this.$dialog
                if (!this.opts.title) {//如果title不存在则不显示  .dialog-header
                    $dialog.find('.dialog-header').hide()
                } else {
                    $dialog.find('.dialog-header').show()//存在就显示
                }
                if (!this.opts.isShowCloseBtn) {//根据isShowCloseBtn的值设置是否显示关闭按钮
                    $dialog.find('.dialog-footer .btn-close').hide()
                } else {
                    $dialog.find('.dialog-footer .btn-close').show()
                }
                if (!this.opts.isShowConfirmBtn) {//根据其值   是否显示
                    $dialog.find('.btn-confirm').hide()
                } else {
                    $dialog.find('.btn-confirm').show()
                }
                $dialog.find('.dialog-header h3').text(this.opts.title)//title的值写入 标题中
                $dialog.find('.dialog-content').html(this.opts.message)//message的值写入 content里
            },
	
			//显示
            showDialog: function() {
                this.$dialog.show()
            },
			//隐藏
            hideDialog: function() {
                this.$dialog.hide()
            },
			//销毁
            distoryDialog: function() {
                this.$dialog.remove()
            }

        }






        $('#btn1').on('click', function() {
            var dialog1 = new Dialog()
            dialog1.open('hello, 这里是SCP基金会赞助')
        })

        $('#btn2').on('click', function() {
            var dialog2 = new Dialog()
            dialog2.open('<a href="http://www.baidu.com">SCP基金会赞助</a>')
        })

        $('#btn3').on('click', function() {
            var dialog3 = new Dialog()
            dialog3.open({
                title: '苟利国家生死已',
                message: 'hello',
                isShowCloseBtn: true,
                isShowConfirmBtn: true,
                onClose: function() {
                    alert('close')
                },
                onConfirm: function() {
                    alert('确定')
                }
            })
        })

        var tpl = '<ul><li>列表1</li><li>列表2</li><li>列表1</li><li>列表1</li></ul>'
        $('#btn4').on('click', function() {
            var dialog4 = new Dialog();
            dialog4.open({
                title: '苟利国家生死已',
                message: tpl,
                isShowCloseBtn: true,
                isShowConfirmBtn: true,
                onClose: function() {
                    alert('关闭')
                },
                onConfirm: function() {
                    alert('确定')
                }
            })
        })
        $('#btn5').on('click', function() {
            var dialog5 = new Dialog();
            dialog5.open({
                title: '苟利国家生死已',
                message: 'hello',
                isShowCloseBtn: false,
                isShowConfirmBtn: false
            })
        })

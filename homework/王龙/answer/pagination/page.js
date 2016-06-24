(function ($) {
    $.fn.pagination=function (opts) {
        opts = $.extend({
            curPage:0,//当前页
            edge:3,//边界显示个数
            totalItem:100,//总记录数
            displayPageNum:5,//固定显示页码个数
            pageSize:10,//每页显示记录数
            ellipsis:'...',
            preText:'<<',//上一页
            nextText:'>>',
            pageChange:function () {},
            links:'',//TODO 同步跳转
            goto:false
        },opts||{});
        var self = this;
        this.each(function () {
            var utils={
                /**
                 * 计算总页数
                 */
                totalPage:function () {
                    return Math.ceil(opts.totalItem/opts.pageSize);
                },
                addTip:function (text) {
                    self.find('.page-tip').text(text).addClass('active').parent().addClass('error');
                },
                delTip:function () {
                    self.find('.page-tip').removeClass('active').parent().removeClass('error');
                },
                bindEvent:function () {
                    /**
                     * 页码的点击事件
                     */
                    self.on('click','.page-item',function (e) {
                        e.stopPropagation();e.preventDefault();
                        opts.curPage=parseInt($(e.target).data('index'));
                        utils.render();
                    });
                    /**
                     * 数字验证
                     */
                     opts.goto && self.find('.page-to').on('input',function (e) {
                         var text = $(this).val();
                         (text && !/^\d*$/.test(text)) ? utils.addTip('亲，我只接受不超过'+utils.totalPage()+'的数字~，~谢谢~') :utils.delTip();
                     });
                    /**
                     * 跳转至页码
                     */
                    opts.goto && self.find('.page-go').on('click',function (e) {
                        var to = self.find('.page-to').val();
                        to && (to=parseInt(to));
                        to = to > utils.totalPage() ? utils.totalPage() :to;
                        opts.curPage=to-1;
                        utils.render();
                    });
                    /**
                     * pre和next每次都会被重新渲染，要么重复绑定吗 OR 事件冒泡
                     */
                    if(opts.preText || opts.preText){
                        self.on('click',function (e) {
                            e.stopPropagation();
                            //e.preventDefault(); 完蛋，阻止了默认行为，goto就下岗啦~~~
                            if( $(e.target).is('.page-pre') && opts.curPage!==0){
                                console.log('pre')
                                opts.curPage-=1;
                                opts.curPage =  opts.curPage>0 ? opts.curPage :0;
                                utils.render();
                            }
                            var total = utils.totalPage()-1;
                            if( $(e.target).is('.page-next') && opts.curPage!==total){
                                console.log('next')
                                opts.curPage+=1;
                                opts.curPage =  opts.curPage> total ? total: opts.curPage;
                                utils.render();
                            }
                            // if(opts.goto && $(e.target).is('.page-to')){
                            //     $(e.target).focus();
                            // }

                        });
                    }
                },
                /**
                 * 计算固定显示页码的起始/终止角标
                 * @return [start,end]
                 */
                edgeIndex:function () {
                    var totalPage = this.totalPage();
                    var half = Math.ceil(opts.displayPageNum/2);
                    var start = opts.curPage> half ? Math.min(opts.curPage-half,totalPage-opts.displayPageNum) :0;
                    var end  = opts.curPage> half ?  Math.min(opts.curPage+half,totalPage) :opts.displayPageNum;
                    return [start,end]
                },
                /**
                 * 计算上边界显示多少个
                 */
                upEdge:function (start) {
                    if(opts.edge && opts.edge>0 && start>0){
                        var end = Math.min(opts.edge, start);//这种判断正棒；我喜欢
                        // if(opts.edge>start){end = start ;}else{end = opts.edge;}
                        this.appendItem([0,end]);
                        if(opts.edge < start &&opts.ellipsis){
                            self.append($('<span class="page-ellipse">'+opts.ellipsis+'</span>'));
                        }
                    }
                },
                /**
                 * 计算上边界显示多少个
                 */
                downEdge:function (end) {
                    var total = utils.totalPage();
                    if(opts.edge && opts.edge>0 && total>end){
                        if(end < total-opts.edge && opts.ellipsis){
                            self.append($('<span class="page-ellipse">'+opts.ellipsis+'</span>'));
                        }
                        var last = Math.max(total-opts.edge,end)
                        // if(end < total-opts.edge){var last  = total-opts.edge;}else{last=end;}
                        this.appendItem([last,total]);
                    }
                },
                appendItem:function (range ,callBack) {
                    for(var i=range[0] ;i<range[1];i++){
                        var item =$('<a href="javascript:void(0);" class="page-item">'+(i+1)+'</a>');
                         callBack && (item = callBack.call(this,i,item));
                        item.data('index',i);
                        self.append(item);
                    }
                },
                render:function () {
                    var range = this.edgeIndex();
                    self.empty();
                    //计算上边界显示多少个 & append
                    this.upEdge(range[0]);
                    //固定显示页码的起始/终止角标,设置当前页码；
                    this.appendItem(range,function (i,item) {
                        if (opts.curPage===i){
                            item =$('<span class="page-cur">'+(i+1)+'</span>');
                        }
                        return item;
                    })
                    //计算下边界显示多少个 & append
                    this.downEdge(range[1]);
                    if(opts.preText){
                        self.prepend($('<span class="page-pre">'+opts.preText+'</span>'));
                    }

                    if(opts.nextText){
                        self.append($('<span class="page-next">'+opts.nextText+'</span>'));
                    }
                    if(opts.goto){
                        self.append('<div class="page-goto"><input type="text" name="pageTo" value="" class="page-to"><div class="page-tip"></div><div class="page-go">GO</div> </div>')
                    }
                    opts.pageChange && opts.pageChange.call(opts,opts.curPage);
                    return this;
                }
            }
            utils.render().bindEvent();
        });

    }
})(jQuery)

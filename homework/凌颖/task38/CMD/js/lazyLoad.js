/**
 * Created by lynn on 2016/6/30.
 */
define(function(require,exports,module){
    var $ = require('jquery');
    var lazyLoad = {
        init : function($ele){
            this.$load = $ele;
            this.isSend = false;
            this.$node = [];
            var me = this;
            this.checkShow();//原始加载一次
            this.itemW = $('.item').outerWidth(true);
            this.winW = $('#pic-ct').width();
            this.counts = parseInt(this.winW/this.itemW);
            this.heightSumArr = [];
            for(var i = 0; i< this.counts; i++){
                this.heightSumArr.push(0);
            }
            $(window).on('scroll',function(){
                if(!!me.isVisible(me.$load)){
                    me.checkShow();
                };
            })
        },
        isVisible : function($ele){
            var scrollT = $(window).scrollTop(),
                winH = $(window).height(),
                offsetT = $ele.offset().top;
            if(scrollT + winH > offsetT){
                return true;
            }else{
                return false;
            }
        },
        checkShow : function(){
            if(this.isSend){
              return;
            }
            this.isSend = true;
            var me = this;
            $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',
                jsonp:"jsoncallback",
                data: {
                    app_key: '1271687855',
                    num: 9,
                    page: 1
                },
                success : function(ret){
                    //console.log(ret);
                    if(ret.status.code == 0){
                        me.place(ret.data);
                    }
                    me.isSend = false;
                },
                error : function(){
                    console.log('error');
                    me.isSend = false;
                }
            })
        },
        place :function($nodeList){
            this.$node = this.renderPlace($nodeList);
           // console.log(this.$node);
            var waterFull = require('waterFull');
            var p = new waterFull(this.heightSumArr,this.itemW);
            p.init(this.$node);
        },
        renderPlace : function($data){
            var html = "";
            var items;
            for(var k = 0,l=$data.length; k< l; k++){
                html+= '<li class="item"><a href="#" class="link"><img src="'+$data[k].img_url+'" alt="">'+
                    '</a><h4 class="header">'+$data[k].short_name+'</h4><p class="desp">'+
                    $data[k].short_intro+'</p></li>';
            }
            items = $(html);
            $("#pic-ct").append(items);
            return items;
        }
    }
    lazyLoad.init($('#load'));
})
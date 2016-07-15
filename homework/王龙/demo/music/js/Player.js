var player = (function(){


    function Player() {}

    /**
     * 
     * @param opts{
     * media  媒体播放元素
     *  0 = NETWORK_EMPTY - 音频/视频尚未初始化
        1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
        2 = NETWORK_LOADING - 浏览器正在下载数据
        3 = NETWORK_NO_SOURCE - 未找到音频/视频来源
     *
     *
     * loop  循环播放
     * }
     */
    Player.prototype.init = function(opts){
        this.switch=opts.switch//
        this.media = opts.media;
        this.loop=opts.loop;
        this.bindEvent(this.media);
        this.lyricURL = opts.lyricURL;
        this.lyricCT = opts.lyricCT;
        this.progressBar=opts.progressBar;
        this.volumeBar=opts.volumeBar;


        //音量滑块
        this.volume = this.volumeBar.slider({
            maxValue:1,//最大值
            defaultValue:0.8,//默认值
            direction:'x',//方向   x y all
            unit:0.1,//单位步长
            moveCallback:function (pos,utils) {
                $('.slider-range').width(pos*100+'%')
                //console.log(pos)
                player.setVolume(pos);
            }
        });

        //频道
        $.ajax({url:'http://api.jirengu.com/fm/getChannels.php', type:'get',
            success:function(data){
                $.each(JSON.parse(data).channels,function (i,e) {
                    $('.channel>ul').append('<li data-id='+ e.channel_id +'>'+ e.name+'<span class="bg"></span></li>')
                });
            },
            error:function(e){if(e)console.log('error',e);}
        });
        return this;
    }


    Player.prototype.bindEvent=function(media) {
        $('.music-ct').mousedown(function(e) {e.stopPropagation();})

        var self = this;
        //开关切换
        self.switch.on('click',function (e) {
            self.switch.hasClass('play') ? self.pause() : self.start();
        });

        //单曲循环 TODO
        //hide or show
        $('.music').on('click',function (e) {
            e.stopImmediatePropagation();
            var isMove = $(this).data('move');
            //利用move和谐mousedown 和 click之间的冲突
            if(isMove){
                $(this).removeData('move');
                return;
            }
            var target = $('.music-ct');
            target.toggleClass('cur');
            //target.hasClass('cur') ? target.addClass('display') : target.removeClass('display')
        });
        
        //FM的显示和隐藏
        $('.open,.close').on('click',function (e) {
            $('.channel').toggleClass('active4channel')
            var info= localStorage.getItem('info');
            info = info && JSON.parse(info)
            if( info  && info.channelID){
               var text=  $('.channel>ul>li[data-id='+info.channelID+']').text()//.css({left:0})
                console.log(text)
                $('.channel>ul>li[data-id='+info.channelID+']').addClass('view').siblings().removeClass('view')
            }
        });
        //频道点击
        $('.channel>ul').on('click','li',function (e) {
            $('.channel').toggleClass('active4channel')
            var channelID = $(e.target).attr('data-id');
            console.log(channelID)
            localStorage.setItem('info',JSON.stringify({channelID:channelID}));
            self.pause().setURL('http://api.jirengu.com/fm/getSong.php?channel='+channelID);//.start();
        });

        /**
         * 下一曲
         */
        $('.next').on('click',function (e) {
            e.stopImmediatePropagation();
            self.next();
        });

        $('.display-Lyric').on('click',function (e) {
            e.stopPropagation();
            var $target = $(this).find('i'),$musicLyric=$('.music-lyric');
            $target.toggleClass('fa-toggle-on').toggleClass('fa-toggle-off')
            $target.hasClass('fa-toggle-off') ? $musicLyric.addClass('transparent').removeClass('opaque') : $musicLyric.addClass('opaque').removeClass('transparent');
        });
        $(self.media).on('timeupdate',function () {
            //音乐当前位置
            var curr = Math.floor(media.currentTime);
            //音乐长度
            var dur = Math.floor(media.duration);
            if(self.media.networkState!=3){
                $(".duration").text(formatTime(dur));
                $(".currentTime").text(formatTime(curr));
            }
            //console.log('timeupdate',self.media.networkState)
            //进度条位置
            self.progress && self.progress.setVal(curr,function (pos) {
                $('.progress-range').width(pos)
            });
            
            rollLyric(self,curr);
            
        });
        //成功获取资源长度, init
        $(self.media).on('loadedmetadata',function () {
            //console.log('loadedmetadata',self.media.networkState)
            //页面滑块初始化--播放进度条
            self.progress =self.progressBar.slider({
                maxValue:self.media.duration,//最大值
                defaultValue:0,//默认值
                direction:'x',//方向   x y all  TODO
                unit:1,
                moveCallback:function (step,utils) {
                    $('.progress-range').width(step*utils.scalePerStep)
                    self.media.currentTime=step;
                }
            });

        });

        //播放结束
        $(self.media).on('ended',function () {
               console.log('ended',self.loop);
               if(self.loop){
                   self.media.loop=self.loop;
                   self.start()
               } else{
                   self.next();
               }
        });
        //play事件会让暂停后的play方法从头播放
        //    $(self.media).on('play',function () {
        //
        // });
    }
    //
    Player.prototype.setURL=function (url) {
        var self =this;
        var info= localStorage.getItem('info');
        info = info && JSON.parse(info)
        var  channelID='0'
        if( info  && info.channelID){
            channelID=info.channelID
        }
        $.ajax({url: 'http://api.jirengu.com/fm/getSong.php',type: 'get',
            data:{
                'app_name':'radio_android',
                'version':100,
                'channel':channelID,
                'type':'n'
            },
            success: function (data) {
                data= JSON.parse(data).song[0];
                $('.music-ct').css('background-image','url('+data.picture+')');
                $('.music-title').text(data.title)
                $('.singer').text(data.artist);
                $(self.media).attr('src',data.url);
                self.lyricURL='http://api.jirengu.com/fm/getLyric.php?sid='+data.sid+'&ssid='+data.ssid;
                //console.log('setURL',self.media.networkState)
                //if(self.media.networkState!=3){
                    $.post('http://api.jirengu.com/fm/getLyric.php',{ssid: data.ssid, sid:data.sid}).done(function(lyc){
                        if(lyc){
                            lyc = JSON.parse(lyc)
                            self.lyricContent=parseLyric(lyc.lyric);
                            //初始化歌词
                            //console.log('初始化歌词',self.lyricContent)
                            if(self.lyricContent){
                                renderLRC(self.lyricCT , self.lyricContent);
                            }
                        }else{
                            //TODO
                        }
                    });
                //}
                self.start();
            }
        });

        return  this;
    }

    Player.prototype.setVolume=function (volume) {
        this.media.volume=  1> volume >0 ?  volume :1;
    }

    Player.prototype.next=function () {
        var info= localStorage.getItem('info');
        info = info && JSON.parse(info)
        var url ='http://api.jirengu.com/fm/getSong.php';
        if( info  && info.channelID){
            url+=('?channel='+info.channelID);
        }
        $(this.lyricCT).empty();
        this.lyricContent=null;
        this.pause().setURL(url);
    }




    Player.prototype.setModel=function (model) {
        this.media.loop=this.loop;
        return this;
    }

    Player.prototype.start=function () {
        this.media.play();
        $(this.switch).removeClass('pause').removeClass('fa-pause-circle').addClass('play').addClass('fa-play-circle')
        return this;
    }

    Player.prototype.pause=function () {
        this.media.pause();
        $(this.switch).removeClass('play').removeClass('fa-play-circle').addClass('pause').addClass('fa-pause-circle')
        return this;
    }

    Player.prototype.getMedia=function () {
        return this.media;
    }



    


    function renderLRC($ele,lrc){
        $ele.empty();
        var lis=""; //TODO  lis 没有被初始化，所以第一次循环会得到undefined
        for( var line in lrc ){
            lis+= '<li>'+lrc[line].text+'</li>';
        }
        $ele.append(lis);
    }
    
    function  rollLyric(self,cur) {
        var lyric =self.lyricContent;//歌词
        if(lyric){
            var ct4Lyric =  self.lyricCT;//容器
            var content = lyric[cur];//当前播放的行
            var liH = ct4Lyric.find('li').eq(1).outerHeight();
            var top = liH;
            if(content){
                ct4Lyric.find('li').eq(content.lineNum).addClass('active').siblings().removeClass('active');
                ct4Lyric.css({'top':( 0-content.lineNum*liH)+'px'});
            }
        }
    }
    
    //音乐计时格式
    function formatTime(time){
        var h=0,i=0,s=parseInt(time);
        if(s>60){
            i=parseInt(s/60);
            s=parseInt(s%60);
            if(i > 60) {
                h=parseInt(i/60);
                i = parseInt(i%60);
            }
        }
        var zero=function(v){
            return (v>>0)<10?"0"+v:v;
        };
        //return (zero(h)+":"+zero(i)+":"+zero(s));
        return (zero(i)+":"+zero(s));
    }

    /**
     * @param lrc 歌词
     * @returns {0: "你的每一次呼吸 - 水木年华", 4: "(电影《怒放》插曲)"......}
     */
    function parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        var x=0;
        for(var i=0;i<lyrics.length;i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /^\[.*?\]/g;///\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            var clause = lyric.replace(timeReg,'');
            if(!timeRegExpArr ||  !clause)continue;
            for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                !!clause && (lrcObj[time] = {text:clause,lineNum:x++});
              // console.log(time,lrcObj[time].text,lrcObj[time].lineNum)
            }
        }

        return lrcObj;
    }

    var instance;

    if (!instance) {
        instance = new Player();
    }
    return instance;
}());

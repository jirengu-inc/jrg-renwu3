function Music() {
    this.clock;
    this.controlVolumeHide;
    this.songName;
    this.singer;
    this.songPicture;
    this.songSsid;
    this.songSid;
    this.lyricArr = [];
    this.playModel;
    this.isSongClose = false;
    this.clickedChannel;
    this.volumeValue = 10;
    this.muteVolumeValue = this.volumeValue;
    this.isLyricClose = false;
    this.appendCss();
    this.appendHtml();
    this.toggleShow($('#jquery-music .menu-btn'),$('#jquery-music .menu'),'click');
    this.toggleShow($('#jquery-music-player'),$('#jquery-music'),'click');
    this.toggleShow($('#jquery-music .song-lyrics'),$('#jquery-music-lyrics'),'click');
    this.toggleShow($('#jquery-music .play-model'),$('#jquery-music .play-model-show'),'click');
    this.dialog($('#jquery-music-player'));
    this.bind();
    this.ajaxChannels();
    this.audioAPIbind($('#jquery-music .play a'));
}
Music.prototype = {
    appendCss : function () {
        $('head').append('<link rel="stylesheet"  href="http://book.jirengu.com/jirengu-inc/jrg-renwu3/homework/%E9%BB%8E%E5%9B%BD%E8%B4%B5/music/music.css">');
        $('head').append('<link rel="stylesheet"  href="http://book.jirengu.com/jirengu-inc/jrg-renwu3/homework/%E9%BB%8E%E5%9B%BD%E8%B4%B5/music/Font-Awesome-master/css/font-awesome.min.css">');
        $('title').before('<meta name="referrer" content="no-referrer">');
    },
    appendHtml:function () {
        var me = this ;
        var audio = new Audio();
        //因为me.volumeValue=20就意味着me.audio.volume=1
        audio.volume=0.5;
        me.audio = audio;
        $('body').append(me.audio);
        var tpl = '<div class="music-player" id="jquery-music-player">'+
            '<a href="#">'+
            '<i class="fa fa-music"></i>'+
            '</a>'+
            '</div>'+
            '<div class="music" id="jquery-music">'+
            '<div class="menu">'+
            '<ul class="mucic-ct">'+
            '<li class="music-tab">'+
            '<ul class="music-popular-list">'+
            '</ul>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '<div id="header" class="clear">'+
            '<a href="#" class="menu-btn">'+
            '<i class="fa fa-list-ul"></i>'+
            '</a>'+
            '<a href="#" class="close-btn">'+
            '<i class="fa fa-close"></i>'+
            '</a>'+
            '</div>'+
            '<div id="main">'+
            '<div class="play">'+
            '<a href="#">'+
            '<i class="fa fa-play-circle-o"></i>'+
            '</a>'+
            '</div>'+
            '</div>'+
            '<div id="footer" class="clear">'+
            '<div class="song-message clear">'+
            '<div class="message"><span class="message-length"><span class="singer"></span><span class="fengefu"></span><span class="song-name"></span></span></div>'+
            '<div class="time"><span class="curtime">00:00</span><span>/</span><span class="song-time">00:00</span></div>'+
            '</div>'+
            '<div class="progressbar">'+
            '<div class="bar">'+
            '<div class="bar-circle"></div>'+
            '</div>'+
            '</div>'+
            '<div class="control clear">'+
            '<a href="#" class="song-volume">'+
            '<div class="control-volume">'+
            '<div class="volume-progressbar">'+
            '<div class="volume-bar">'+
                '<div class="volume-bar-circle"></div>'+
            '</div>'+
            '</div>'+
            '<div class="triangle"></div>'+
            '</div>'+
            '<i class="fa fa-volume-up"></i>'+
            '</a>'+
            '<a href="#" class="next-song">'+
            '<i class="fa fa-forward"></i>'+
            '</a>'+
            '<a href="#" class="play-model">'+
            '<i class="fa fa-long-arrow-right"></i>'+
            '<div class="play-model-show">'+
            '<div class="triangle"></div>'+
            '<div class="single-play"><i class="fa fa-long-arrow-right"></i>&nbsp单曲播放</div>'+
            '<div class="single-cycle"><i class="fa fa-retweet"></i>&nbsp单曲循环</div>'+
            '<div class="random-play"><i class="fa fa-random"></i>&nbsp随机播放</div>'+
            '</div>'+
            '</a>'+
            '<a href="#" class="song-lyrics">词</a>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="music-lyrics" id="jquery-music-lyrics">'+
            '<div class="music-lyrics-close">'+
            '<i class="fa fa-close"></i>'+
            '</div>'+
            '<p></p>'+
            '</div>';
        $('body').append($(tpl));
    },
    //可移动组件
    dialog:function ($node) {
        $node.on("mousedown",function (e) {
            var X = e.pageX - $node.offset().left;
            var Y = e.pageY - $node.offset().top;
            $node.addClass('cursor').data('inner',{x:X,y:Y});
        });
        $node.on("mouseup",function () {
            $node.removeClass('cursor').data('inner','');
        });
        $(document).on("mousemove",function (e) {
            if($node.data('inner')){
                $node.offset({
                    left : e.pageX-$node.data('inner').x,
                    top : e.pageY-$node.data('inner').y
                });
            }
        });
    },
    //切换展示组件
    toggleShow:function ($switch,$component,event) {
        var $sth = $switch;
        var $cpt = $component;
        var $event = event;
        $sth.data('isShow',false);
        $sth.on($event,function (e) {
            if(!$sth.data('isShow')){
                e.preventDefault();
                $cpt.show();
                $sth.data('isShow',true);
            }
            else{
                e.preventDefault();
                $cpt.hide();
                $sth.data('isShow',false);
            }
        })
    },
    bind:function () {
        var me = this;
        //show可移动部件
        $('#jquery-music-player').on('click',function (e) {
            e.preventDefault();
            me.dialog($('#jquery-music'));
        });
        $('#jquery-music-lyrics').on('click',function (e) {
            e.preventDefault();
            me.dialog($('#jquery-music-lyrics'));
        });
        //播放模式
        $('#jquery-music .random-play').on('click',function (e) {
            e.preventDefault();
            me.playModel = 'random-play';
            $('#jquery-music .play-model>i').attr('class','fa fa-random');
        });
        $('#jquery-music .single-cycle').on('click',function (e) {
            e.preventDefault();
            me.playModel = 'single-cycle';
            $('#jquery-music .play-model>i').attr('class','fa fa-retweet');
        });
        $('#jquery-music .single-play').on('click',function (e) {
            e.preventDefault();
            me.playModel = '';
            $('#jquery-music .play-model>i').attr('class','fa fa-long-arrow-right');
        });
        //隐藏音乐播放器
        $('#jquery-music .close-btn').on('click',function (e) {
            e.preventDefault();
            $('#jquery-music').hide();
            $('#jquery-music-player').data('isShow',false);
        });
        //音量条的出现
        $('#jquery-music .song-volume').on('mouseenter',function (e) {
            e.preventDefault();
            $(this).css({
                cursor:'pointer'
            });
            clearTimeout(me.controlVolumeHide);
            $('#jquery-music .control-volume').show();
        });

        $('#jquery-music .song-volume').on('mouseleave',function (e) {
            e.preventDefault();
            me.controlVolumeHide = setTimeout(function () {
                $('#jquery-music .control-volume').hide();
            },2000);
        });
        //滚轮控制音量条
        document.getElementsByClassName('song-volume')[0].addEventListener('mousewheel',function (e) {
            //只要滚动就把图标变回来
            if(me.audio.volume === 0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
            }
            if(me.audio.volume < 0.5 && me.audio.volume!==0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
            }
            if(me.audio.volume >= 0.5){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
            }
            me.volumeValue = me.volumeValue+e.wheelDelta/120;
            if(me.volumeValue<0){
                me.volumeValue =0;
            }
            if(me.volumeValue>20){
                me.volumeValue =20;
            }
            $('#jquery-music .volume-bar').height(me.volumeValue*4);
            me.audio.volume = me.volumeValue*0.05;
            me.muteVolumeValue = me.volumeValue;
        });
        //音量条点击事件
        $('#jquery-music .control-volume').on('click',function (e) {
            //阻止事件进一步冒泡
            e.stopPropagation();
            var a = $('#jquery-music .volume-progressbar').height()-(e.pageY - $('#jquery-music').offset().top-288);
            $('#jquery-music .volume-bar').height(a);
            //audio.volume在0与1之间;
            var b = a*1/$('#jquery-music .volume-progressbar').height();  //多少音量
            me.audio.volume = b;
            //因为me.volumeValue=20就意味着me.audio.volume=1
            me.volumeValue = me.audio.volume*20/1;
            me.muteVolumeValue = me.volumeValue;
            if(me.audio.volume === 0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
            }
            if(me.audio.volume < 0.5 && me.audio.volume!==0){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
            }
            if(me.audio.volume >= 0.5){
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
            }
        });
        //音量条拖拽事件
        $('#jquery-music .volume-bar-circle').on('mousedown',function (e) {
            //阻止事件进一步冒泡
            e.stopPropagation();
            $('#jquery-music .volume-bar-circle').data('change',true);
        });
        $(document).on("mousemove",function (e) {
            if($('#jquery-music .volume-bar-circle').data("change")){
                $(this).css({
                    cursor:'pointer'
                });
                var a = $('#jquery-music .volume-progressbar').height()-(e.pageY - $('#jquery-music').offset().top-288);
                if(a<0){
                    a = 0;
                }
                if(a>$('#jquery-music .volume-progressbar').height()){
                    a = $('#jquery-music .volume-progressbar').height();
                }
                $('#jquery-music .volume-bar').height(a);
                //audio.volume在0与1之间;
                var b = a*1/$('#jquery-music .volume-progressbar').height();  //多少音量
                me.audio.volume = b;
                //因为me.volumeValue=20就意味着me.audio.volume=1
                me.volumeValue = me.audio.volume*20/1;
                me.muteVolumeValue = me.volumeValue;
                if(me.audio.volume === 0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
                }
                if(me.audio.volume < 0.5 && me.audio.volume!==0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
                }
                if(me.audio.volume >= 0.5){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
                }
            }
        });
        $('#jquery-music .volume-bar-circle').on('mouseup',function (e) {
            e.stopPropagation();
            $('#jquery-music .volume-bar-circle').data('change',false);
        });
        //静音
        $('#jquery-music .song-volume').on('click',function (e) {
            e.preventDefault();
            if(!$('.song-volume').data('mute')){
                me.audio.volume = 0;
                me.volumeValue = 0;
                $('#jquery-music .volume-bar').height(0);
                $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
                $('#jquery-music .song-volume').data('mute',true);
            }
            else{
                me.audio.volume = me.muteVolumeValue*0.05;
                me.volumeValue = me.muteVolumeValue;
                $('#jquery-music .volume-bar').height(me.volumeValue*4);
                if(me.audio.volume === 0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-off');
                }
                if(me.audio.volume < 0.5 && me.audio.volume!==0){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-down');
                }
                if(me.audio.volume >= 0.5){
                    $('#jquery-music .song-volume>i').attr('class','fa fa-volume-up');
                }
                $('#jquery-music .song-volume').data('mute',false);
            }
        });
        //关闭歌词面板
        $('#jquery-music-lyrics .music-lyrics-close').on('click',function (e) {
            e.preventDefault();
            $('#jquery-music-lyrics').hide();
            $('#jquery-music .song-lyrics').data('isShow',false);

        });
        //下一首歌点击事件
        $('#jquery-music .next-song').on('click',function (e) {
            e.preventDefault();
            me.audio.pause(); //先暂停体验感比较好
            if (me.isSongClose) {
                return;
            }
            me.isSongClose = true;
            if(me.clickedChannel){
                me.ajaxChannelsSongs();
            }
            else{
                me.ajaxSongs();
            }
        });
        //进度条点击事件
        $('#jquery-music .progressbar').on('click',function (e) {
            e.stopPropagation();
            //没有歌曲的时候不允许触发，是没有歌曲而不是歌曲暂定呀
            if(!me.audio.src){
                return
            }
            clearInterval(me.clock);
            var a = (e.pageX - $('#jquery-music').offset().left)-10;
            $('.bar').width(a);
            var b = a*me.audio.duration/$('#jquery-music .progressbar').width();  //多少秒
            me.audio.currentTime = b;
            me.changeStyle();
        });
        //进度条拖拽事件
        $('#jquery-music .bar-circle').on('mousedown',function (e) {
            //阻止事件进一步冒泡
            e.stopPropagation();
            clearInterval(me.clock);
            $('#jquery-music .bar-circle').data('change',true);
        });
        $(document).on("mousemove",function (e) {
            if($('#jquery-music .bar-circle').data("change")){
                var a = (e.pageX - $('#jquery-music').offset().left)-10;
                if(a<0){
                    a = 0;
                }
                if(a>$('#jquery-music .progressbar').width()){
                    a = $('#jquery-music .progressbar').width();
                }
                $('.bar').width(a);
                me.time = a*me.audio.duration/$('#jquery-music .progressbar').width();  //多少秒
            }
        });
        $('#jquery-music .bar-circle').on('mouseup',function (e) {
            e.preventDefault();
            e.stopPropagation();
            me.audio.currentTime = me.time;
            me.changeStyle();
            $('#jquery-music .bar-circle').data('change',false);
        });
        // 歌曲的开始与暂停
        $('#jquery-music .play a').on('click',function (e) {
            e.preventDefault();
            if(!$('#jquery-music .play a').data('isShow')){
                //判断有没有歌曲，没有歌曲的话就发送ajax随机点一曲
                if(!me.audio.src){
                    if (me.isSongClose) {
                        return;
                    }
                    me.isSongClose = true;
                    me.ajaxSongs();
                }
                else{
                    me.audio.play();
                    me.changeStyle();
                    $('#jquery-music .play a').data('isShow',true);
                }
            }
            else{
                me.audio.pause();
                $('#jquery-music .play a').data('isShow',false);
            }
        });
        //点击频道获取频道歌曲
        $('#jquery-music .music-popular-list').on('click','li',function () {
            me.clickedChannel = $(this).attr('data');
            $('#jquery-music .music-popular-list li').removeClass('active');
            $(this).addClass('active');
            me.audio.pause();
            if (me.isSongClose) {
                return;
            }
            me.isSongClose = true;
            me.ajaxChannelsSongs();
        });
    },
    //设置setInterval改变进度条
    changeStyle:function () {
        var me = this;
        me.clock = setInterval(function () {
            $('#jquery-music .bar').css({
                width:me.audio.currentTime*$('#jquery-music .progressbar').width()/me.audio.duration
            });
        },0.001);
    },
    //ajax获取音乐频道信息
    ajaxChannels:function () {
        var isClose=false;
        if (isClose) {
            return;
        }
        isClose = true;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            type: 'get',
            dataType: 'json',
            data: {

            },
            success: function (data) {
                var tpl = '';
                for(var i=0;i<data.channels.length;i++){
                    tpl += '<li class="music-type" data='+data.channels[i].channel_id+'>';
                    tpl += data.channels[i].name;
                    tpl += '</li>'
                }
                $('#jquery-music .music-popular-list').append($(tpl));
                isClose = false;
            },
            error: function () {
                console.log('get error channels data');
                isClose = false;
            }
        });
    },
    //获取随机歌曲
    ajaxSongs:function () {
        var me = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            type: 'get',
            dataType: 'json',
            data: {
            },
            success: function (data) {
                if (data.r === 0) {
                    me.audio.src = data.song[0].url;
                    me.songName = data.song[0].title;
                    me.singer = data.song[0].artist;
                    me.songPicture = data.song[0].picture;
                    me.songSsid = data.song[0].ssid;
                    me.songSid =data.song[0].sid;
                    me.audio.play();
                    me.changeStyle();
                    $('#jquery-music .play a').data('isShow',true);
                    me.isSongClose = false;
                }
            },
            error: function () {
                console.log('get error songs data');
                me.isSongClose = false;
            }
        });
    },
    //获取歌词
    ajaxLyric:function (songssid,songsid) {
        var me = this;
        var ssid = songssid;
        var sid = songsid;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getLyric.php',
            type: 'post',
            dataType: 'json',
            data: {
                ssid: ssid,
                sid:sid
            },
            success: function (data) {
                console.log(data);
                var re = /\n/;
                var songArr = data.lyric.split(re);//"" "[ar:A-Lin黄丽玲]" "[ti:我很忙]" "[04:01.42]心碎只是我自己" "[04:01.42][02:03.42]心碎只是我自己"
                console.log(songArr);
                for(var i=0;i<songArr.length;i++){
                    //创建lyricArr数组
                    var re = /[\d{2}:\d{2}.\d{2}]+/g;
                    var re2 = /[\[\]]/g;
                    if(re.test(songArr[i])){
                        var lyricObj = {};
                        lyricObj.time = [];
                        var lyricTimeArr = songArr[i].match(re); //["04:01.42"] ["04:01.42", "02:03.42"]
                        var realLyric = songArr[i].replace(re,'').replace(re2,''); //'心碎只是我自己'


                        var songTime; //songTime是真实的秒数
                        for(var j=0;j<lyricTimeArr.length;j++){
                            var stringTime = lyricTimeArr[j].replace('[','');//"03:07.35"
                            var timeArr = stringTime.split(':'); //["03", "07.35"]
                            songTime = parseInt(timeArr[0])*60 + parseFloat(timeArr[1]); //187.35
                            lyricObj.time.push(songTime);
                        }

                        lyricObj.lyric = realLyric;
                        me.lyricArr.push(lyricObj);
                    }
                }
                console.log(me.lyricArr);
                me.isLyricClose = false;
            },
            error: function () {
                console.log('get error Lyric data');
                me.isLyricClose = false;
            }
        });
    },
    audioAPIbind :function ($switch) {
        var me = this ;
        var $sth = $switch;
        $('#jquery-music .play a').data('isShow',false);
        me.audio.addEventListener('play',function () {
            $('#jquery-music .bar-circle').show();
            $sth.find('i').removeClass('fa-play-circle-o');
            $sth.find('i').addClass('fa-pause-circle-o');
            $('#jquery-music .singer').text(me.singer);
            $('#jquery-music .fengefu').text('-');
            $('#jquery-music .song-name').text(me.songName);
            $('#jquery-music .play').css({
                background: "url("+me.songPicture+")",
                backgroundSize: 'cover'
            });
            //判断歌曲信息是不是太长，要是太长就滚动
            if($('#jquery-music .message-length').width() > $('#jquery-music .message').width()){
                if(!$('#jquery-music .message').data('isFirstTooLong')){  //为了避免连续几首歌出现太长的现象
                    $('#jquery-music .message').addClass('marquee');
                    $('#jquery-music .marquee').marquee();
                    $('#jquery-music .message').data('isFirstTooLong',true);
                }
            }
            //避免上一首歌的信息太长，导致下一首歌也滚动
            else {
                $('#jquery-music .message').removeClass('marquee');
                $('#jquery-music .message').data('isFirstTooLong',false);
                $('#jquery-music .message').html('<span class="message-length"><span class="singer">'+me.singer+'</span><span class="fengefu">-</span><span class="song-name">'+me.songName+'</span></span>');
            }
            //当音乐响起的时候创建lyricArr
            me.lyricArr = [];
            if (me.isLyricClose) {
                return;
            }
            me.isLyricClose = true;
            me.ajaxLyric(me.songSsid,me.songSid);
        });
        me.audio.addEventListener('timeupdate',function () {
            //当前时间
            var  realcurtimeMinutes;
            var  realcurtimeSeconds;
            var curtimeMinutes = parseInt(Math.floor(me.audio.currentTime)/60);
            var curtimeSeconds = Math.floor(me.audio.currentTime)%60;
            if(curtimeMinutes <= 9){
                realcurtimeMinutes ='0' + curtimeMinutes;
            }
            else{
                realcurtimeMinutes =curtimeMinutes;
            }
            if(curtimeSeconds <= 9){
                realcurtimeSeconds ='0' + curtimeSeconds;
            }
            else{
                realcurtimeSeconds =curtimeSeconds;
            }
            //整首歌的时间
            var  realsongMinutes;
            var  realsongSeconds;
            var songMinutes = parseInt(Math.floor(me.audio.duration)/60);
            var songSeconds = Math.floor(me.audio.duration)%60;
            if(songMinutes <= 9){
                realsongMinutes ='0' + songMinutes;
            }
            else{
                realsongMinutes =songMinutes;
            }

            if(songSeconds <= 9){
                realsongSeconds ='0' + songSeconds;
            }
            else{
                realsongSeconds =songSeconds;
            }

            //消除歌曲时间的NaN  NaN虽然不能等于NaN但是NaN是假值啊，只要排除0就好了
            if(!realsongMinutes && realsongMinutes!==0 && !realsongSeconds && realsongSeconds!==0){
                $('#jquery-music .song-time').text('00'+':'+'00');
            }
            else{
                $('#jquery-music .song-time').text(realsongMinutes+':'+realsongSeconds);
            }
            $('#jquery-music .curtime').text(realcurtimeMinutes+':'+realcurtimeSeconds);

            //改变显示歌词;
            if(Math.floor(me.audio.currentTime)===0){
                $('#jquery-music-lyrics p').text(me.singer+'-'+me.songName);
            }
            for(var i=0;i<me.lyricArr.length;i++){
                for(var j=0;j<me.lyricArr[i].time.length;j++){
                    if(Math.floor(me.audio.currentTime)===Math.round(me.lyricArr[i].time[j])){
                        $('#jquery-music-lyrics p').text(me.lyricArr[i].lyric);
                    }
                }
            }
        });
        me.audio.addEventListener('pause',function () {
            $('#jquery-music .bar').stop();
            clearInterval(me.clock);
            $sth.find('i').removeClass('fa-pause-circle-o');
            $sth.find('i').addClass('fa-play-circle-o');
        });
        me.audio.addEventListener('ended',function () {
            clearInterval(me.clock);
            $('#jquery-music .bar-circle').hide();
            $sth.find('i').removeClass('fa-pause-circle-o');
            $sth.find('i').addClass('fa-play-circle-o');
            $sth.data('isShow',false);
            if(me.playModel === 'random-play'){
                if (me.isSongClose) {
                    return;
                }
                me.isSongClose = true;
                if(me.clickedChannel){
                    me.ajaxChannelsSongs();
                }
                else{
                    me.ajaxSongs();
                }
            }
            if(me.playModel === 'single-cycle'){
                me.audio.play();
                me.changeStyle();
                $sth.data('isShow',true);
            }
        });
    },
    //获取频道歌曲
    ajaxChannelsSongs:function () {
        var me = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            type: 'get',
            dataType: 'json',
            data: {
                channel: me.clickedChannel
            },
            success: function (data) {
                if (data.r === 0) {
                    me.audio.src = data.song[0].url;
                    me.songName = data.song[0].title;
                    me.singer = data.song[0].artist;
                    me.songPicture = data.song[0].picture;
                    me.songSsid = data.song[0].ssid;
                    me.songSid =data.song[0].sid;
                    me.audio.play();
                    me.changeStyle();
                    $('#jquery-music .play a').data('isShow',true);
                    me.isSongClose = false;
                }
            },
            error: function () {
                console.log('get error data');
                me.isSongClose = false;
            }
        });
    }
};
new Music();

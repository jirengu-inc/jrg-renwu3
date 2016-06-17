
	 var audio = document.getElementById('audio');//获取audio作为全局变量，方便直接使用.play();
		// var playTime = audio.seekable.start;
	 //    $('.play-time').text(playTime);
	
	
	var requestClock = false;
	var soundMark,slideW,palyPrograssClock,lyricCt;
	
	function init(){
		 	drag($('.music-ct'));
			drag($('.music'));
			//drag($('.music-start'));
	}
	init();


	 $('.music-start').on('click',function(){
			if($('.music').css('display').toString()==='none'){
				$(audio).attr('song-volume',0.6);
				getRanSong();
				$('.music-start').attr('start',true);
			 	$('.music').show()
			 			   .animate({'width': '350px'},500)
			 			   .animate({'height': '560px'},500);
				getChannel();
			 	audio.play();
			 	
			 	slide($('.progress-bar .play-prograss'));
				
			 }else{
			 	$('.music-start').removeAttr('start');
			 	$('.music').animate({'width': '0px'},500)
						   .animate({'height': '0px'},500)
			 				.hide();
			 	audio.pause();
			 	 if(palyPrograssClock){
					clearInterval(palyPrograssClock);
				}
			 };
			 setTimeout(function(){
			 	slideW = $('.progress-bar').width();
			 	// console.log(slideW);

			 }, 1300)
		
			 
		});
//移动和拖拽
function drag($node) {
    $node.on("mousedown",function (e) {
    	//e.stopPropagation();
        var X = e.clientX - $node.offset().left; //鼠标在距当前元素最左端X的偏移,鼠标在内部x的偏移
        var Y = e.clientY - $node.offset().top; //鼠标在距当前元素最上端Y的偏移，鼠标在内部x的偏移
        $node.data("inner",{innerX:X,innerY:Y});
    });
    $node.on("mouseup",function () {
        $node.data("inner",'');
    });
    $node.on("mousemove",function (e) {
        if($node.data("inner")){
            $node.offset({
                left : e.clientX-$node.data("inner").innerX,
                top : e.clientY-$node.data("inner").innerY
            });
        }
    });
}


//进度条的自动播放.palyPrograssClock
	
	function autoPrograss($node){
		var percent = audio.currentTime/audio.duration;//进度的百分比；
		// var slideW = $node.parent().width();//滑块的总宽度;
		var playedTime = displayTime(audio.currentTime);
		var endTime = displayTime(audio.duration);
	

		if(palyPrograssClock){
			clearInterval(palyPrograssClock);
		}
		if($('.lyric').css('display').toString()==='block'){
			if (clockLyric) {
				clearInterval(clockLyric);//清除，防止闪烁
			};
			
			autoLyric();
		};
		palyPrograssClock = setInterval(function(){
			$node.css({
				width: slideW*percent
			});
			
			$('.play-time').text(playedTime);
			$('.end-time').text(endTime);
			if ($node.width()>=slideW) {
				$node.width(slideW);
				if ($('.play-pattern').hasClass('random')) {
					getRanSong($(audio).attr('channel-id'));
				};
				// else{
				// 	clearInterval(palyPrograssClock);
				// };
				clearInterval(palyPrograssClock);
			};
			autoPrograss($node);
		}, 300);
	}
	
	
//设置播放时间的显示
	function displayTime(secondTime){
		var minute = Math.floor(Math.floor(secondTime)/60);
		var second = Math.floor(secondTime)%60;
		if (minute<10) {
			minute = "0"+minute;
		};
		if (second<10) {
			second = "0"+second;
		};
		return minute+":"+second;
	}

//播放进度条进度条滑动
//slide($('.progress-bar .play-prograss'));
	function slide($node){
		// var slideW = $node.parent().width();//滑块的总宽度
		
		$node.parent().on('click',function(e){
			// if (!$(e.target).hasClass('progress-bar')) {
			// 	return ;
			// };
			if(palyPrograssClock){
				clearInterval(palyPrograssClock);
			}
			// var curPos = $node.offset().left+$node.width();//当前进度条的位置
			// var mouseDis = e.clientX - curPos;//鼠标点击点到进度条距离
			 var distance = e.clientX - $node.offset().left;
			// console.log(e.clientX);
			// console.log($node.offset().left);
			// console.log(slideW);
			$node.width(distance);

			if ($node.width()>slideW) {
				$node.width(slideW);
				// getRanSong($(audio).attr('channel-id'));把获取下一首放到自动进度条autoPrograss($node)里面
			};
			//slideW = $node.parent().width();
			var curPlayTime = audio.duration*$node.width()/slideW;//进度条调整后的播放时间
			audio.currentTime = curPlayTime;
			
			autoPrograss($node);
		});//鼠标点击进度
		
		$node.on('mousedown',function(e){
				e.stopPropagation();
				$node.data('move-flag',true);//当在滑动条上按下去才可以滑动	
		});
		$node.on('mouseup',function(e){
				$node.data('move-flag',false);			
		});
		$('body').on('mouseup',function(e){
				$node.data('move-flag',false);			
		});
		$node.parent().parent().on('mousemove',function(e){
			if($node.data('move-flag')){
				e.stopPropagation();				
				if(palyPrograssClock){
					clearInterval(palyPrograssClock);
				}//在拖动的时候执行秦空palyPrograssClock
			
				var curPos = $node.offset().left+$node.width();//当前进度条的位置
				var mouseDis = e.clientX - curPos;//鼠标移动过后到进度条距离
				$node.css({
					'width': $node.width()+mouseDis
				});
				if ($node.width()>slideW) {
					$node.width(slideW);
				};
				var curPlayTime = audio.duration*$node.width()/slideW;//进度条调整后的播放时间
				audio.currentTime = curPlayTime;

				autoPrograss($node);
			};
		});//鼠标滑动进度

	}
	

	//音量条进度条滑动
	//slide($('.progress-bar .play-prograss'));
		function volSlide($node){
			var slideVolW = $node.parent().width();//滑块的总宽度
			
			$node.parent().on('click',function(e){
				e.stopPropagation();
				// if (!$(e.target).hasClass('progress-bar')) {
				// 	return ;
				// };
				
				// var curPos = $node.offset().left+$node.width();//当前进度条的位置
				// var mouseDis = e.clientX - curPos;//鼠标点击点到进度条距离
				var distance = e.clientX - $node.offset().left;
				// console.log(e.clientX);
				// console.log($node.offset().left);
				$node.width(distance);
				if ($node.width()>slideVolW) {
					$node.width(slideVolW);
				};//防止长度超过最长
				var curVolPrecent = $node.width()/slideVolW;//进度条调整后的音量比例
				// audio.volume = curVolPrecent;
				// $(audio).attr('song-volume', audio.volume);
				if (audio.volume===0) {//判断$(audio).attr('song-volume')取值0不能通过
					// console.log($(audio).attr('song-volume')==='0');,输出true，属性的取值为字符串类型
						//audio.volume = 0;
						// console.log($(audio).attr('song-volume'));
						soundMark = curVolPrecent;
						//soundmoark作为一个当静音后audio.volume应当取值的标记
				}else{
					audio.volume = curVolPrecent;
					$(audio).attr('song-volume',audio.volume);
				};
				
				
			});//鼠标点击进度
			$node.parent().parent().on('click',function(e){
				e.stopPropagation();
			});
			$node.on('mousedown',function(e){
				e.stopPropagation();
				$node.data('move-flag',true);//当在滑动条上按下去才可以滑动
			});
			$node.on('mouseup',function(e){
				$node.data('move-flag',false);//鼠标左键up取消滑动事件		
			});
			$('body').on('mouseup',function(e){
				$node.data('move-flag',false);			
			});
			$node.parent().parent().on('mousemove',function(e){
				if($node.data('move-flag')){	
					e.stopPropagation();
					var curPos = $node.offset().left+$node.width();//当前进度条的位置
					var mouseDis = e.clientX - curPos;//鼠标移动过后到进度条距离
					$node.css({
						width: $node.width()+mouseDis
					});
					if ($node.width()>slideVolW) {
						$node.width(slideVolW);
					};//防止长度超过最长
					var curVolPrecent = $node.width()/slideVolW;//进度条调整后的播放时间
					if (audio.volume===0) {//判断$(audio).attr('song-volume')取值0不能通过

						//audio.volume = 0;
						// console.log($(audio).attr('song-volume'));
						soundMark = curVolPrecent;
						//soundmoark作为一个当静音后audio.volume应当取值的标记
					}else{
						audio.volume = curVolPrecent;
						$(audio).attr('song-volume',audio.volume);
					};
					
				};
			});//声音滑动进度
		}
	volSlide($('.vol .vol-prograss'));

/*	function slide($bode,start,end){

	};
*/

//歌词显示切换
	$('.show-lyric').on('click',function(){
		if ($('.lyric').css('display') === 'none') {
			$('.lyric').show();
			getLyric();
			
			$('.show-lyric').addClass('showed-lyric');
		}else{
			$('.lyric').hide();
			clearInterval(clockLyric);//停止执行播放歌词
			$('.show-lyric').removeClass('showed-lyric');
		};		
	});

//获取歌词
//获取歌词并展示
	function getLyric(){
		var songId = $(audio).attr('song-id'),
			songsId = $(audio).attr('songs-id');
		$.post('http://api.jirengu.com/fm/getLyric.php',{ssid:songsId,sid:songId})
		   .done(function(ret){
		   	lyricCt = JSON.parse(ret);
		   	var lyricJson = parseLyricCt(lyricCt);
			
		  	setLyric(lyricJson);//将歌词设置到.lyric上
		  	autoLyric();		   	
		  });//获取歌词
	}
	

	//设置歌词到.lyric上
	function setLyric(lyricJson){
		var $lyric = $('.lyric');
		var lyricHeight = $lyric.height();
		$lyric.empty();
		for(var kTime in lyricJson){
		   		var kCurTime = parseToPlayTime(kTime);//本行歌词所代表的实际秒数
		   		var top = lyricHeight*kCurTime/audio.duration;//本行歌词距离.lyric顶部的距离
		   		var $node = $('<span>'+lyricJson[kTime]+'</span>').css({
		   					'top':top
		   					});//为每一句歌词设置位置
				$lyric.append($node);
				//$lyric.last().css('top',top);
				// console.log(top);

		   	};
	}

	//将歌词当中[xx:xx.xx]格式的时间转化为实际秒数的时间
	function parseToPlayTime(kTime){
		var timeArry = kTime.split(':');
		var minute = parseInt(timeArry[0]);
		var second = parseFloat(timeArry[1]);
		// console.log(typeof second);
		// console.log(typeof minute);
		return minute*60+second//本行歌词所代表的实际秒数
	}

	//讲歌词解析为json格式，并返回
	function parseLyricCt(lyricCt){
		if(!lyricCt.lyric){
			return ;
		};
		var lyric=lyricCt.lyric;
		var lyrics = lyric.split("\n");//以换行符分割歌词字符串为数组
		var lyricString = '';
		   	for (var i = 0; i < lyrics.length; i++) {
		   		var time = lyrics[i].match(/\d{2}:\d{2}\.\d{2}/g);
		   		var content = lyrics[i].replace(/\[\d{2}:\d{2}\.\d{2}\]/g,'');
		   		//剔除歌词中[]，拼接成可转化成json的字符串
		   		lyricString += '"'+time+'"' +':'+ '"'+content+'",';
		   	};
		 lyricString = lyricString.replace(/\s/g,' ');//去掉所有空字符创
		 lyricString=lyricString.substr(0,lyricString.length-1);//剔除末尾,
		 if(!JSON.parse("{"+lyricString+"}")){
			return ;
		 }
		 lyricJson = JSON.parse("{"+lyricString+"}");
		 return lyricJson;

	}
//播放时间与歌词的时间对应
//设置总时间与歌词div长度相对应，一秒钟为10px；自动向上移动播放
	var clockLyric;
	function  autoLyric(){
		if(lyricCt.name !== $('.music-title .title').text){
			getLyric();
			if (clockLyric) {
				clearInterval(clockLyric);//清除，防止闪烁
			};
			return ;//歌词的名字和当前播放的歌的名字不一样，重新获取一次
		}
		var tatolHeight = 10*Math.ceil(audio.duration);
		$('.lyric').css('height',tatolHeight);
		var percent = audio.currentTime/audio.duration;
		var currentTop = tatolHeight*percent;
		
		if (clockLyric) {
			clearInterval(clockLyric);//清除，防止闪烁
		};
		clockLyric = setInterval(function(){
			$('.lyric').css({
				'margin-top': -currentTop//每一次执行时歌词向上偏移的高度
			});
			autoLyric();
		}, 300);
	}
	
	
	
	function lyricTime(lyTime){
		var minute = Math.floor(audio.currentTime/60);//获得分

		var second = Math.floor((audio.currentTime%60)*100)/100;//获取秒小数点后两位
		if (minute<10) {
			minute = "0"+minute;
		};
		if (second<10) {
			second = "0"+second;
		};
		return minute+":"+second;
	}
/*获取频道信息并添加在频道列表中*/
	function getChannel(){
		$.ajax({
	          url: 'http://api.jirengu.com/fm/getChannels.php',
	          dataType: 'json',
	          Method: 'GET',
	          success: function (response) {
	              var channels = response.channels;
	              var Ipt = '';
	              for (var i = 0; i < channels.length; i++) {
	                  Ipt += '<li channel-id="' + channels[i].channel_id + '"><a href="#">' + channels[i].name + '</a></li>'
	              };
	              $('.channel-info .hot').html(Ipt);
	          }
	      });
	}

/*获取歌曲信息*/
$('.channel-item.hot').on('click',function(e){
		var channelId='';
	 	if(e.target.tagName.toLowerCase()==='li'){
			channelId = $(e.target).attr('channel-id');
	 	};
	 	if(e.target.tagName.toLowerCase()==='a'){
			channelId = $(e.target).parent().attr('channel-id');
	 	};
	 	getRanSong(channelId);

});

//获取下一首歌曲
	$('.next').on('click',function(){
		var channelId = $(audio).attr('channel-id');
		getRanSong(channelId);
	});

//获取随机歌曲
	
	function getRanSong(channelId){
		var channelId = channelId||'';
		if(requestClock){
			return ;
		};
		requestClock = true;
			$.ajax({
		          url: 'http://api.jirengu.com/fm/getSong.php',
		          dataType: 'json',
		          Method: 'get',
		          data:{
			              'channel':channelId
			            },
			     success: function (ret) {
			           var resource = ret.song[0],
			               url = resource.url,
			               bgPic = resource.picture,
			               sid = resource.sid,
			               ssid = resource.ssid,
			               title = resource.title,
			               author = resource.artist;

			           $('.music-bg').attr('src', bgPic);
			           $(audio).attr('src', url);
			           $(audio).attr('song-id', sid);
			           $(audio).attr('songs-id', ssid);
			           $(audio).attr('channel-id', channelId);
			           $('.music-title').find('.title').text(title);
			           $('.music-title').find('.author').text(author);
						
						
						if ($('.music-start').attr('start')) {
							
							audio.play();
							//audio.volume = $(audio).attr('song-volume');
							//console.log($(audio).attr('song-volume'));
							autoPrograss($('.play-prograss'));
						};
						$('.play').html('<i class="iconfont">&#xe730;</i>');
						if($('.lyric').css('display').toString()==='block'){
							autoLyric();
						};
						requestClock = false;
			      }
		      });
	}

//切换频道
	$('.channel-nav li').on('click',function(){
		var $cur = $(this),
			idx = $(this).index();

		$cur.addClass('active');
		$cur.siblings().removeClass('active');
		$cur.parents('.channel-info')
			.find('.channel-item')
			.removeClass('active');
		$cur.parents('.channel-info')
			.find('.channel-item').eq(idx)
			.addClass('active');
	});
		
//静音和音量调节
	
	$('.sound').on('click',function(){
	
		if(audio.volume!==0){
			soundMark = audio.volume;
			audio.volume = 0;
			$(audio).attr('song-volume',audio.volume);//设置song-volume属性，时刻保存audio.volume的值		
			$('.quiet').show();
		}else{
			$(audio).attr('song-volume',soundMark);
			audio.volume = $(audio).attr('song-volume');
			$('.quiet').hide();
		};
	});
//调节音量
	$('.sound').on('mouseenter',function(){
		$('.vol-panel').show();
		$('.vol-panel').on('mousewheel',function(){

		});
	});
	$('.sound').on('mouseleave',function(){
		$('.vol-panel').hide();
	});



//歌曲播放和暂停

    $('.play').on('click', function () {
        if (audio.paused) {
            audio.play();          
             $('.play').html('<i class="iconfont">&#xe730;</i>');
             autoPrograss($('.play-prograss'));       
        } else {
            audio.pause();
            // $('.cover').css('animation-play-state','paused');
            $('.play').html('<i class="iconfont">&#xe657;</i>');
            if(palyPrograssClock){
				clearInterval(palyPrograssClock);
			}
        }
    });

	//lick添加喜欢的功能
	$('.like').on('click',function(e){
		e.stopPropagation();
		if (!$(audio).data('song-like')) {
			$('.like').addClass('liked');
			$(audio).data('song-like',true);
			var songIput = '<li channel-id="' + $(audio).attr('channel-id')+ '" song-id="'+ $(audio).attr('song-id')+ '" songs-id="'+ $(audio).attr('songs-id') + '"><a href="#">' + $('.music-title').find('.title').text(); + '</a></li>';
			$('.channel-item.collection').append(songIput);
		 }else {
			$('.like').removeClass('liked');
			$(audio).data('song-like',false);
			$('.channel-item.collection li').each(function(){
				if ($(this).attr('song-id')===$(audio).attr('song-id')) {
					$(this).empty();
				};
			});
		};	
	});


	//设置单曲循环
		$('.play-pattern').on('click',function(e){
			
			var $node;
			if (e.target.tagName.toLowerCase()==='li') {
				$node = $(e.target);
			};
			if (e.target.tagName.toLowerCase()==='i') {
				$node = $(e.target).parent();
			};
			// console.log($node.hasClass('single'));
			if ($node.hasClass('single')) {
				$node.removeClass('single')
					 .addClass('random')
					 .html('<i class="iconfont" placeholder="随机播放">&#xe871;</i>');
				$(audio).removeAttr('loop');
			}else {
				$node.removeClass('random')
					 .addClass('single')
					 .html('<i class="iconfont" placeholder="单曲循环">&rarr;</i>');
				$(audio).attr('loop','');
			};
			
		});

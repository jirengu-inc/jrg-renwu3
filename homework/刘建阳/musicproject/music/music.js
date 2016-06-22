
	 var audio = document.getElementById('audio');//获取audio作为全局变量，方便直接使用.play();
		// var playTime = audio.seekable.start;
	 //    $('.play-time').text(playTime);
	
	
	var requestClock = false,animateClock = false;
	var soundMark,slideW,slideVolW,palyPrograssClock,lyricCt,clockLyric;
	var tatolHeight;//歌词的总高度
	
	var init = function(){
		var dtd = $.Deferred();//在函数内部新建一个Deferred对象
		 	drag($('.music-ct'));
			// drag($('.music'));
			// drag($('.music-start'));
			getRanSong();

			return dtd.promise();//返回promise对象，在原来的deferred对象上返回另一个deferred对象，只开放与改变执行状态无关的方法
	}

	$.when(init())
	 .done(function(){ 
	 		$('.music-start').attr('start',true);

	 	})
	 .fail(function(){ alert('初始化失败，可能是网络请求问题')});


	 

	 		//'click'功能仅仅是展现页面和歌曲播放这两个功能
	 $('.music-start').on('click',function(){
		 if(animateClock){
		 	return ;
		 }
		 animateClock = true;
		 if($('.music').css('display').toString()==='none'){				
			$('.music').show()
				 	   .css({'width': '340px'})
				 	   .animate({'height': '530px'},500,function(){
				 	   		 $('.music-start').attr('start',true);
				 			 autoPre();//进度条和歌词自动前进
				 			 getChannel();//获取频道信息，
				 			 slide($('.progress-bar .play-prograss'));
				 			 volSlide($('.vol-bar .vol-prograss'));
				 			 slideW = $('.progress-bar').width();
				 			 slideVolW = $('.vol-bar').width();//滑块的总宽度
				 		});//动画后自行完后在执行function();

			$(audio).attr('song-volume',0.6);//设置音量初始值,之后作为一个歌曲应当有的音量的标记

			audio.volume = $(audio).attr('song-volume');
			audio.play();//初始化时已经获取一首歌了，所以一点击展示按钮就播放

			animateClock = false;
		}else{
			$('.music-start').removeAttr('start');
			$('.music').animate({'width': '0px'},500,function(){
				 $('.music').css({'height': '0px'}).hide();
			});
			audio.pause();

			if(palyPrograssClock){
				clearInterval(palyPrograssClock);//停止进度条前进
			}
			if (clockLyric) {
				clearInterval(clockLyric);//停止播放歌词
			};
					
					// dtd.resolve();//改变deferred的执行状态为已完成，页面收起来后在隐藏
					// $('.music').hide();

			animateClock = false;
		};			
	});
	

			 // setTimeout(function(){
			 // 	slideW = $('.progress-bar').width();
			 // 	// console.log(slideW);

			 // }, 1300)//采用deferred的对象后可以保证动画执行完也就是music的宽高固定后惊醒各种计算操作
	

//进度条和歌词的自动
	function autoPre(){
		if(palyPrograssClock){
			clearInterval(palyPrograssClock);
		};
		 autoPrograss($('.play-prograss'));
		 if($('.lyric').css('display').toString()==='block'){
			if ($(audio).attr('song-id') !== $('.lyric').attr('song-id')) {
				getLyric();
			};
		 	if (clockLyric) {
				clearInterval(clockLyric);//清除，防止闪烁
			};				 		
			autoLyric();
		};
		//这两个自动必须放到动画执行完，长宽固定后在执行
	}

//移动和拖拽
function drag($node) {
    $node.on("mousedown",function (e) {
    	$(this).css('cursor','move');
    	// $(this).attr('cursor-flag',true);
    	//e.stopPropagation();
        var X = e.clientX - $node.offset().left; //鼠标在距当前元素最左端X的偏移,鼠标在内部x的偏移
        var Y = e.clientY - $node.offset().top; //鼠标在距当前元素最上端Y的偏移，鼠标在内部x的偏移
        $node.data("inner",{innerX:X,innerY:Y});
    });
    $node.on("mouseup",function (e) {
    	$(this).css('cursor','auto');
    	// $(this).attr('cursor-flag',false);
        $node.data("inner",'');
    });
    $(document).on("mousemove",function (e) {
    	e.stopPropagation();
    	
        if($node.data("inner")){

        	// $(this).attr('before-left',$(this).offset().left);
        	// $(this).attr('before-top',$(this).offset().top);
            $node.offset({
                left : e.clientX-$node.data("inner").innerX,
                top : e.clientY-$node.data("inner").innerY
            });

			// if ($(this).attr('cursor-flag')) {
	            
	  //           		$(this).css('cursor','move');
	           
	  //       }else{
	  //       	$(this).css('cursor','auto');
	  //       }
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
		// if($('.lyric').css('display').toString()==='block'){
		// 	if (clockLyric) {
		// 		clearInterval(clockLyric);//清除，防止闪烁
		// 	};
			
		// 	autoLyric();
		// };
		// //自动进度条和自动歌词滚动应该是绑一块的，但是由于同是setInterval，所以放里面会出现严重的逻辑叠加（300毫秒间隔内还有一个300）,如果把setInrerval里面代码提取出来，一是有冗余，二是作为全局变量的歌词容器长度的计算优惠产生因问题
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

				autoPre();//当播放下一首，重新执行一次进度条和歌词的自动播放，防止歌词在点开的状态下无法加载新歌词
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
			
			autoPre();
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

				autoPre();
			};
		});//鼠标滑动进度

	}
	

	//音量条进度条滑动
	//slide($('.progress-bar .play-prograss'));
		function volSlide($node){
			// var slideVolW = $node.parent().width();//滑块的总宽度
			
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
				if ($node.width()>=slideVolW) {
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
					if ($node.width()>=slideVolW) {
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
	

/*	function slide($bode,start,end){

	};
*/

//歌词显示切换
	$('.show-lyric').on('click',function(){
		if ($('.lyric').css('display') === 'none') {
			$('.lyric').show();
			
			getLyric();
			autoLyric();
			$('.show-lyric').addClass('showed-lyric');
		}else{
			$('.lyric').hide();
			if (clockLyric) {
				clearInterval(clockLyric);//停止播放歌词
			};
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
		   	$('.lyric').attr('song-id',lyricCt.sid);
		   	var lyricJson = parseLyricCt(lyricCt);
			//console.log($('.lyric').attr('song-id'));

			tatolHeight = 10*Math.ceil(audio.duration);
			$('.lyric').css('height',tatolHeight);
			// 每一次获取歌词说明换了一首歌，歌词容器大小重新设置
			//设置总时间与歌词div高度度相对应，一秒钟为10px；自动向上移动播放
		  	setLyric(lyricJson);//将歌词设置到.lyric上
		  	/*autoLyric();*/		   	
		  });//获取歌词
	}
	

	//设置歌词到.lyric上
	function setLyric(lyricJson){
		var $lyric = $('.lyric');
		var lyricHeight = $lyric.height();
		$lyric.empty();//没重新设置清空一次

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
		   		var time = lyrics[i].match(/\d{2}\:\d*\.{0,1}\d*/g);
		   		var content = lyrics[i].replace(/\[\d{2}\:\d*\.{0,1}\d*\]/g,'').trim();//[xx:xx]和[xx:xx.xx]格式,//trim掉两边的空白，否则歌词解析出错
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

	
	function  autoLyric(){
		// if(lyricCt['name'] !== $('.music-title .title').text){
		// 	getLyric();
		// 	if (clockLyric) {
		// 		clearInterval(clockLyric);//清除，防止闪烁
		// 	};
		// 	return ;//歌词的名字和当前播放的歌的名字不一样，重新获取一次
		// }
		
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
		autoPre();
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
							// console.log(1);
							audio.volume = $(audio).attr('song-volume');
							audio.play();//应该是对应出现，设置音量设置播放
							
							//console.log($(audio).attr('song-volume'));
							autoPre();
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
            autoPre();       
        } else {
            audio.pause();
            // $('.cover').css('animation-play-state','paused');
            $('.play').html('<i class="iconfont">&#xe657;</i>');
            if(palyPrograssClock){
				clearInterval(palyPrograssClock);
			};
			if (clockLyric) {
				clearInterval(clockLyric);//清除计时器
			};	
        };
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

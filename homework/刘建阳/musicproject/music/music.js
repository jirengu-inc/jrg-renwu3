var musicPlay = (function(){
	function musicPlayer(){
		this.requestClock = false;
		this.animateClock = false;
		var soundMark,slideW,slideVolW,palyPrograssClock,lyricCt,clockLyric,tatolHeight;//歌词的总高度
		
		this.soundMark = soundMark;
		this.slideW = slideW;
		this.slideVolW = slideVolW;
		this.palyPrograssClock = palyPrograssClock;
		this.lyricCt = lyricCt;
		this.clockLyric = clockLyric;
		this.tatolHeight = tatolHeight;
		// 初始化需要用到的全局变量
		
	};

	musicPlayer.prototype.start = function(){
		// this.render();
		this.startInit();
		this.showBtn();
		this.showLyric();
		this.getChannelSong();
		this.getNext();
		this.changeQuiet();
		this.changeChannel();
		this.changeVol();
		this.playPause();
		this.addLike();
		this.changePlayPattern();
	};

	musicPlayer.prototype.render = function(){
		var html = '<div class="music-ct">'+
				'<i class="music-start iconfont">&#xe612;</i>'+
				'<div class="music">'+'<audio id="audio" src="./initsource/刘宽忍 - 枉凝眉.mp3">Your browser does not support the audio tag</audio>'+
				'<div class="music-nav">'+
				'<button class="nav-bar">'+
				'<a class="channels" href="#">'+
				'<i class="iconfont">&#xe68a;</i>'+
				'<div class="channel-info">'+
				'<ul class="channel-nav">'+
				'<li class="music-collection">'+
				'<span>收藏</span></li>'+
				'<li class="music-hot active">'+
				'<span>热门</span></li></ul>'+
				'<ul class="channel-item collection">收藏</ul>'+
				'<ul class="channel-item hot active">热门</ul>'+
				'<ul class="channel-item care">关注</ul>'+
				'</div><!-- 左侧的频道信息和歌曲列表 --></a></button>'+
				'<div class="music-title"><p class="title">枉凝眉</p>'+
				'<span class="author">刘宽忍</span></div>'+
				'<div class="music-icon">'+
				'<i class="iconfont">&#xe612;</i>'+
				'</div></div>'+
				'<div class="main">'+
				'<div class="img-cover"></div>'+
				'<img class="music-bg" src="initsource/4.jpg">'+
				'<hr><!-- 当前歌词标记 -->'+
				'<div class="lyric-upcover">'+
				'</div><div class="lyric-downcover"></div>'+
				'<p class="lyric"></p>'+
				'<div class="like"><i class="iconfont">&#xe611;</i></div>'+
				'<div class="show-lyric"><i class="iconfont">&#xe64c;</i></div></div>'+
				'<div class="control-panel">'+
				'<div class="progress-bar">'+
				'<span class="play-time"></span>'+
				'<div class="play-prograss"></div>'+
				'<span class="end-time"></span></div>'+
				'<div class="adjust-panel">'+
				'<ul class="adjust">'+
				'<li class="play-pattern random"><i class="iconfont">&#xe871;</i></li>'+
				'<li class="pre"><i class="iconfont"><<</i></li>'+
				'<li class="play"><i class="iconfont">&#xe730;</i></li>'+
				'<li class="next"><i class="iconfont">>></i></li>'+
				'<li class="sound">'+
				'<div class="vol-panel">'+
				'<div class="vol-bar">'+
				'<div class="vol-prograss"></div>'+
				'</div></div>'+
				'<div class="quiet">\\</div>'+
				'<i class="iconfont">&#xf00bc;</i>'+
				'</li></ul></div>'+
				'</div></div></div>';

		var $node = $(html);
		$('body').append($node);
	};

	musicPlayer.prototype.startInit = function(){
		var _self = this;
		var init = function(){
			 var audio = document.getElementById('audio');//获取audio作为全局变量，方便直接使用.play();
			_self.audio = audio;
			var dtd = $.Deferred();//在函数内部新建一个Deferred对象
			 	_self.drag($('.music-ct'));
				// drag($('.music'));
				// drag($('.music-start'));
				_self.getRanSong();

				return dtd.promise();//返回promise对象，在原来的deferred对象上返回另一个deferred对象，只开放与改变执行状态无关的方法
		}
		
		// init();
		// $('.music-start').attr('start',true);
		$.when(init())
		 .done(function(){ 
		 		$('.music-start').attr('start',true);

		 	})
		 .fail(function(){ alert('初始化失败，可能是网络请求问题')});
	};

	musicPlayer.prototype.showBtn = function(){
		var _self = this;
		 		//'click'功能仅仅是展现页面和歌曲播放这两个功能
		 $('.music-start').on('click',function(e){
		 	e.stopPropagation();
			 if(_self.animateClock){
			 	return ;
			 }
			 if ($('.music-ct').data('move')) {
			 	return ;
			 };
			 _self.animateClock = true;
			 if($('.music').css('display').toString()==='none'){				
				$('.music').show()
					 	   .css({'width': '340px'})
					 	   .animate({'height': '530px'},500,function(){
					 	   		 $('.music-start').attr('start',true);
					 			 _self.autoPre();//进度条和歌词自动前进
					 			 _self.getChannel();//获取频道信息，
					 			 _self.slide($('.progress-bar .play-prograss'));
					 			 _self.volSlide($('.vol-bar .vol-prograss'));
					 			 _self.slideW = $('.progress-bar').width();
					 			 _self.slideVolW = $('.vol-bar').width();//滑块的总宽度
					 		});//动画后自行完后在执行function();

				$(_self.audio).attr('song-volume',0.6);//设置音量初始值,之后作为一个歌曲应当有的音量的标记

				_self.audio.volume = $(_self.audio).attr('song-volume');
				_self.audio.play();//初始化时已经获取一首歌了，所以一点击展示按钮就播放

				_self.animateClock = false;
			}else{
				$('.music-start').removeAttr('start');
				$('.music').animate({'width': '0px'},500,function(){
					 $('.music').css({'height': '0px'}).hide();
				});
				_self.audio.pause();

				if(_self.palyPrograssClock){
					clearInterval(_self.palyPrograssClock);//停止进度条前进
				}
				if (_self.clockLyric) {
					clearInterval(_self.clockLyric);//停止播放歌词
				};
						
						// dtd.resolve();//改变deferred的执行状态为已完成，页面收起来后在隐藏
						// $('.music').hide();

				_self.animateClock = false;
			};			
		});
	};

	//进度条和歌词的自动
		musicPlayer.prototype.autoPre = function(){
			var _self = this;
			if(_self.palyPrograssClock){
				clearInterval(_self.palyPrograssClock);
			};
			 _self.autoPrograss($('.play-prograss'));
			 if($('.lyric').css('display').toString()==='block'){
				if ($(_self.audio).attr('song-id') !== $('.lyric').attr('song-id')) {
					_self.getLyric();
				};
			 	if (_self.clockLyric) {
					clearInterval(_self.clockLyric);//清除，防止闪烁
				};				 		
				_self.autoLyric();
			};
			//这两个自动必须放到动画执行完，长宽固定后在执行
		};
		
		//移动和拖拽
		musicPlayer.prototype.drag = function($node) {
		    $node.on("mousedown",function (e) {
		    	$node.css('cursor','move');
		    	// $(this).attr('cursor-flag',true);
		    	//e.stopPropagation();
		        var X = e.clientX - $node.offset().left; //鼠标在距当前元素最左端X的偏移,鼠标在内部x的偏移
		        var Y = e.clientY - $node.offset().top; //鼠标在距当前元素最上端Y的偏移，鼠标在内部x的偏移
		        $node.data("inner",{innerX:X,innerY:Y});
		        $node.data('move',false);
		    });
		    $node.on("mouseup",function (e) {
		    	$node.css('cursor','auto');
		    	// $(this).attr('cursor-flag',false);
		        $node.data("inner",'');
		        
		    });
		    $(document).on("mousemove",function (e) {
		    	e.stopPropagation();
		    	$node.data('move',true);
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
		};
		
		//进度条的自动播放.this.palyPrograssClock
			
			musicPlayer.prototype.autoPrograss = function($node){
				var _self = this;
				var percent = _self.audio.currentTime/_self.audio.duration;//进度的百分比；
				// var slideW = $node.parent().width();//滑块的总宽度;
				var playedTime = _self.displayTime(_self.audio.currentTime);
				var endTime = _self.displayTime(_self.audio.duration);
			

				if(_self.palyPrograssClock){
					clearInterval(_self.palyPrograssClock);
				}
				// if($('.lyric').css('display').toString()==='block'){
				// 	if (clockLyric) {
				// 		clearInterval(clockLyric);//清除，防止闪烁
				// 	};
					
				// 	autoLyric();
				// };
				// //自动进度条和自动歌词滚动应该是绑一块的，但是由于同是setInterval，所以放里面会出现严重的逻辑叠加（300毫秒间隔内还有一个300）,如果把setInrerval里面代码提取出来，一是有冗余，二是作为全局变量的歌词容器长度的计算优惠产生因问题
				_self.palyPrograssClock = setInterval(function(){
					$node.css({
						width: _self.slideW*percent
					});
					
					$('.play-time').text(playedTime);
					$('.end-time').text(endTime);
					if ($node.width()>=_self.slideW) {
						$node.width(_self.slideW);
						if ($('.play-pattern').hasClass('random')) {
							_self.getRanSong($(_self.audio).attr('channel-id'));
							clearInterval(_self.palyPrograssClock);
						};

						_self.autoPre();//当播放下一首，重新执行一次进度条和歌词的自动播放，防止歌词在点开的状态下无法加载新歌词
						// else{
						// 	clearInterval(palyPrograssClock);
						// };
						clearInterval(_self.palyPrograssClock);
					};
					_self.autoPrograss($node);
				}, 300);
			};

			//设置播放时间的显示
			musicPlayer.prototype.displayTime = function(secondTime){
				var minute = Math.floor(Math.floor(secondTime)/60);
				var second = Math.floor(secondTime)%60;
				if (minute<10) {
					minute = "0"+minute;
				};
				if (second<10) {
					second = "0"+second;
				};
				return minute+":"+second;
			};

			//播放进度条进度条滑动
			//slide($('.progress-bar .play-prograss'));
			musicPlayer.prototype.slide = function($node){
					// var slideW = $node.parent().width();//滑块的总宽度
					var _self = this;
					
					$node.parent().on('click',function(e){
						// if (!$(e.target).hasClass('progress-bar')) {
						// 	return ;
						// };
						if(_self.palyPrograssClock){
							clearInterval(_self.palyPrograssClock);
						}
						// var curPos = $node.offset().left+$node.width();//当前进度条的位置
						// var mouseDis = e.clientX - curPos;//鼠标点击点到进度条距离
						 var distance = e.clientX - $node.offset().left;
						// console.log(e.clientX);
						// console.log($node.offset().left);
						// console.log(slideW);
						$node.width(distance);

						if ($node.width()>_self.slideW) {
							$node.width(_self.slideW);
							// getRanSong($(audio).attr('channel-id'));把获取下一首放到自动进度条autoPrograss($node)里面
						};
						//slideW = $node.parent().width();
						var curPlayTime = _self.audio.duration*$node.width()/_self.slideW;//进度条调整后的播放时间
						_self.audio.currentTime = curPlayTime;
						
						_self.autoPre();
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
							if(_self.palyPrograssClock){
								clearInterval(_self.palyPrograssClock);
							}//在拖动的时候执行秦空palyPrograssClock
						
							var curPos = $node.offset().left+$node.width();//当前进度条的位置
							var mouseDis = e.clientX - curPos;//鼠标移动过后到进度条距离
							$node.css({
								'width': $node.width()+mouseDis
							});
							if ($node.width()>_self.slideW) {
								$node.width(_self.slideW);
							};
							var curPlayTime = _self.audio.duration*$node.width()/_self.slideW;//进度条调整后的播放时间
							_self.audio.currentTime = curPlayTime;

							_self.autoPre();
						};
					});//鼠标滑动进度

				};

	//音量条进度条滑动
	//slide($('.progress-bar .play-prograss'));
	musicPlayer.prototype.volSlide = function($node){
			// var slideVolW = $node.parent().width();//滑块的总宽度
			var _self = this;
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
				if ($node.width()>=_self.slideVolW) {
					$node.width(_self.slideVolW);
				};//防止长度超过最长
				var curVolPrecent = $node.width()/_self.slideVolW;//进度条调整后的音量比例
				// audio.volume = curVolPrecent;
				// $(audio).attr('song-volume', audio.volume);
				if (_self.audio.volume===0) {//判断$(_self.audio).attr('song-volume')取值0不能通过
					// console.log($(_self.audio).attr('song-volume')==='0');,输出true，属性的取值为字符串类型
						//_self.audio.volume = 0;
						// console.log($(_self.audio).attr('song-volume'));
						_self.soundMark = curVolPrecent;
						//soundmoark作为一个当静音后_self.audio.volume应当取值的标记
				}else{
					_self.audio.volume = curVolPrecent;
					$(_self.audio).attr('song-volume',_self.audio.volume);
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
					if ($node.width()>=_self.slideVolW) {
						$node.width(_self.slideVolW);
					};//防止长度超过最长
					var curVolPrecent = $node.width()/_self.slideVolW;//进度条调整后的播放时间
					if (_self.audio.volume===0) {//判断$(audio).attr('song-volume')取值0不能通过

						//audio.volume = 0;
						// console.log($(audio).attr('song-volume'));
						_self.soundMark = curVolPrecent;
						//soundmoark作为一个当静音后audio.volume应当取值的标记
					}else{

						_self.audio.volume = curVolPrecent;
						$(_self.audio).attr('song-volume',_self.audio.volume);
					};
					
				};
			});//声音滑动进度
		};


		//歌词显示切换
		musicPlayer.prototype.showLyric = function(){
			var _self = this;
			$('.show-lyric').on('click',function(){
				if ($('.lyric').css('display') === 'none') {
					$('.lyric').show();
					if ($(_self.audio).attr('song-id') !== $('.lyric').attr('song-id')) {
						_self.getLyric();
					};
					_self.autoLyric();
					$('.show-lyric').addClass('showed-lyric');
				}else{
					$('.lyric').hide();
					if (_self.clockLyric) {
						clearInterval(_self.clockLyric);//停止播放歌词
					};
					$('.show-lyric').removeClass('showed-lyric');
				};		
			});
		};

		//获取歌词
		//获取歌词并展示
		musicPlayer.prototype.getLyric = function(){
			var _self = this,
				songId = $(_self.audio).attr('song-id'),
				songsId = $(_self.audio).attr('songs-id');
				$.post('http://api.jirengu.com/fm/getLyric.php',{ssid:songsId,sid:songId})
				   .done(function(ret){
				   	_self.lyricCt = JSON.parse(ret);
				   	$('.lyric').attr('song-id',_self.lyricCt.sid);
				   	var lyricJson = _self.parseLyricCt(_self.lyricCt);
					//console.log($('.lyric').attr('song-id'));

					_self.tatolHeight = 10*Math.ceil(_self.audio.duration);
					$('.lyric').css('height',_self.tatolHeight);
					// 每一次获取歌词说明换了一首歌，歌词容器大小重新设置
					//设置总时间与歌词div高度度相对应，一秒钟为10px；自动向上移动播放
				  	_self.setLyric(lyricJson);//将歌词设置到.lyric上
				  	/*autoLyric();*/		   	
				  });//获取歌词
			};
	
		//设置歌词到.lyric上
		musicPlayer.prototype.setLyric = function(lyricJson){
			var _self = this;
			var $lyric = $('.lyric');
			var lyricHeight = $lyric.height();
			$lyric.empty();//没重新设置清空一次

			for(var kTime in lyricJson){
			   		var kCurTime = _self.parseToPlayTime(kTime);//本行歌词所代表的实际秒数
			   		var top = lyricHeight*kCurTime/_self.audio.duration;//本行歌词距离.lyric顶部的距离
			   		var $node = $('<span>'+lyricJson[kTime]+'</span>').css({
			   					'top':top
			   					});//为每一句歌词设置位置
					$lyric.append($node);
					//$lyric.last().css('top',top);
					// console.log(top);

			   	};
		};

		//将歌词当中[xx:xx.xx]格式的时间转化为实际秒数的时间
		musicPlayer.prototype.parseToPlayTime = function(kTime){
			var timeArry = kTime.split(':');
			var minute = parseInt(timeArry[0]);
			var second = parseFloat(timeArry[1]);
			// console.log(typeof second);
			// console.log(typeof minute);
			return minute*60+second//本行歌词所代表的实际秒数
		};

		//讲歌词解析为json格式，并返回
		musicPlayer.prototype.parseLyricCt = function(lyricCt){
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

		};
		musicPlayer.prototype.lyricTime = function(lyTime){
			var minute = Math.floor(this.audio.currentTime/60);//获得分

			var second = Math.floor((this.audio.currentTime%60)*100)/100;//获取秒小数点后两位
			if (minute<10) {
				minute = "0"+minute;
			};
			if (second<10) {
				second = "0"+second;
			};
			return minute+":"+second;
		};

	//播放时间与歌词的时间对应		
		musicPlayer.prototype.autoLyric = function(){
			// if(lyricCt['name'] !== $('.music-title .title').text){
			// 	getLyric();
			// 	if (clockLyric) {
			// 		clearInterval(clockLyric);//清除，防止闪烁
			// 	};
			// 	return ;//歌词的名字和当前播放的歌的名字不一样，重新获取一次
			// }
			var _self =this;
			var percent = this.audio.currentTime/this.audio.duration;
			var currentTop = this.tatolHeight*percent;
			
			if (_self.clockLyric) {
				clearInterval(_self.clockLyric);//清除，防止闪烁
			};
			_self.clockLyric = setInterval(function(){
				$('.lyric').css({
					'margin-top': -currentTop//每一次执行时歌词向上偏移的高度
				});
				_self.autoLyric();
			}, 300);
		};

		/*获取频道信息并添加在频道列表中*/
		musicPlayer.prototype.getChannel = function(){
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
			};
		
		/*获取歌曲信息*/
		musicPlayer.prototype.getChannelSong = function(){
			var _self = this;
			$('.channel-item.hot').on('click',function(e){
					var channelId='';
				 	if(e.target.tagName.toLowerCase()==='li'){
						channelId = $(e.target).attr('channel-id');
				 	};
				 	if(e.target.tagName.toLowerCase()==='a'){
						channelId = $(e.target).parent().attr('channel-id');
				 	};
				 	_self.getRanSong(channelId);

			});
		};

		//获取下一首歌曲
		musicPlayer.prototype.getNext = function(){
			var _self = this;
			$('.next').on('click',function(){
				var channelId = $(_self.audio).attr('channel-id');
				_self.getRanSong(channelId);
				_self.autoPre();
			});
		};

		//获取随机歌曲			
		musicPlayer.prototype.getRanSong = function(channelId){
			var _self = this;
			var channelId = channelId||'';
				if(_self.requestClock){
					return ;
				};
				_self.requestClock = true;
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
					           $(_self.audio).attr('src', url);
					           $(_self.audio).attr('song-id', sid);
					           $(_self.audio).attr('songs-id', ssid);
					           $(_self.audio).attr('channel-id', channelId);
					           $('.music-title').find('.title').text(title);
					           $('.music-title').find('.author').text(author);
								
								
								if ($('.music-start').attr('start')) {
									// console.log(1);
									_self.audio.volume = $(_self.audio).attr('song-volume');
									_self.audio.play();//应该是对应出现，设置音量设置播放
									
									//console.log($(audio).attr('song-volume'));
									_self.autoPre();
								};
								$('.play').html('<i class="iconfont">&#xe730;</i>');
								if($('.lyric').css('display').toString()==='block'){
									_self.autoLyric();
								};
								_self.requestClock = false;
					      }
				      });
			};

			//切换频道
			musicPlayer.prototype.changeChannel = function(){
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
			};
		
		//调节音量
		musicPlayer.prototype.changeVol = function(){
			$('.sound').on('mouseenter',function(){
				$('.vol-panel').show();
			});
			$('.sound').on('mouseleave',function(){
				$('.vol-panel').hide();
			});
		};
		
		//静音和音量调节
		musicPlayer.prototype.changeQuiet = function(){
			var _self = this;
			$('.sound').on('click',function(){
			
				if(_self.audio.volume!==0){
					_self.soundMark = _self.audio.volume;
					_self.audio.volume = 0;
					$(_self.audio).attr('song-volume',_self.audio.volume);//设置song-volume属性，时刻保存audio.volume的值		
					$('.quiet').show();
				}else{
					$(_self.audio).attr('song-volume',_self.soundMark);
					_self.audio.volume = $(_self.audio).attr('song-volume');
					$('.quiet').hide();
				};
			});
		};
		


		//歌曲播放和暂停
		musicPlayer.prototype.playPause = function(){
			var _self = this;
		    $('.play').on('click', function () {
		        if (_self.audio.paused) {
		            _self.audio.play();          
		            $('.play').html('<i class="iconfont">&#xe730;</i>');
		            _self.autoPre();       
		        } else {
		            _self.audio.pause();
		            // $('.cover').css('animation-play-state','paused');
		            $('.play').html('<i class="iconfont">&#xe657;</i>');
		            if(_self.palyPrograssClock){
						clearInterval(_self.palyPrograssClock);
					};
					if (_self.clockLyric) {
						clearInterval(_self.clockLyric);//清除计时器
					};	
		        };
		    });
		};

			//lick添加喜欢的功能
		musicPlayer.prototype.addLike = function(){
			var _self = this;
			$('.like').on('click',function(e){
				e.stopPropagation();
				if (!$(_self.audio).data('song-like')) {
					$('.like').addClass('liked');
					$(_self.audio).data('song-like',true);
					var songIput = '<li channel-id="' + $(_self.audio).attr('channel-id')+ '" song-id="'+ $(_self.audio).attr('song-id')+ '" songs-id="'+ $(_self.audio).attr('songs-id') + '"><a href="#">' + $('.music-title').find('.title').text(); + '</a></li>';
					$('.channel-item.collection').append(songIput);
				 }else {
					$('.like').removeClass('liked');
					$(_self.audio).data('song-like',false);
					$('.channel-item.collection li').each(function(){
						if ($(this).attr('song-id')===$(_self.audio).attr('song-id')) {
							$(this).empty();
						};
					});
				};	
			});
		};


			//设置单曲循环
		musicPlayer.prototype.changePlayPattern = function(){
			var _self = this;
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
						$(_self.audio).removeAttr('loop');
					}else {
						$node.removeClass('random')
							 .addClass('single')
							 .html('<i class="iconfont" placeholder="单曲循环">&rarr;</i>');
						$(_self.audio).attr('loop','');
					};
					
				});
			};

		var music = new musicPlayer();
		music.render();
		music.start();//渲染并开始js
})();




	

			 // setTimeout(function(){
			 // 	slideW = $('.progress-bar').width();
			 // 	// console.log(slideW);

			 // }, 1300)//采用deferred的对象后可以保证动画执行完也就是music的宽高固定后惊醒各种计算操作
	


/*	function slide($bode,start,end){

	};
*/

		


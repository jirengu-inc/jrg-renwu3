$.fn.autofall = function(num,time) {
	var num = num||6;
	var time = time||500;
	var finalFall=[this];
	// console.log(num);

	for (var i = 0; i < num; i++) {
		var $fallClone = this.clone();

		finalFall.push($fallClone);
		$('body').prepend($fallClone);
	}

	 for (var i = 0; i < finalFall.length; i++) {
	 	fall(finalFall[i],time);
	 }
	function fall($fall,time) {
		var curTop = 0,
			fallClock,
			time = time||500;

		var toLeft = Math.random(),
			curLeft;
		if(toLeft<0.5){
			curLeft = ($('body').width()/2)*Math.random();
		}else{
			curLeft = ($('body').width()/2)*(1+Math.random());
		}/*初始时句页面左边距离*/

		var roDeg = 'rotateZ('+360*Math.random()+'deg)';
		$fall.css({
			'transform': roDeg
		});/*始时下落物体的旋转角度*/

		if (fallClock) {
			clearInterval(fallClock);
		}

		var fallClock=setInterval(function() {
			$fall.css({
				'top': curTop,
				'left': curLeft
			});/*物体在窗口的位置*/
			if ($fall.css('display').toLowerCase()==='none') {
				$fall.show();
			}/*开始元素为隐藏*/
			if(curTop>$(window).height()){
				curTop = 0;
				roDeg = 'rotateZ('+360*Math.random()+'deg)';
				$fall.css({
					'transform': roDeg
				});
				toLeft = Math.random();
				if(toLeft<0.5){
					curLeft = ($('body').width()/2)*Math.random();
				}else{
					curLeft = ($('body').width()/2)*(1+Math.random());
				};
			}else{
				curTop+=10+50*Math.random();/*下落速度*/
				if(toLeft<0.5){
					curLeft += 10+20*Math.random();
				}else{
					curLeft -= 10+20*Math.random();
				};/*左或右移动速度*/
			};		
		},time);
	};
	return this;
};

/*README.md
1、页面物体飘落Jquery插件（落叶，落雪等），可使用链式调用
2、 调用方式$(selecter).fall([,num,time]);num、time为可选参数
3、num为页面出现的元素的重复个数，time为毫秒数，代表掉落的速率（不是速度）
4、速度已写固定，可自行修改*/
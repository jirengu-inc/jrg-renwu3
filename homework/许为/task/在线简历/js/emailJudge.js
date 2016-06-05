$(".email").on("mouseleave",function(){  //当鼠标离开时，对email输入的格式进行判断
		if(document.getElementsByClassName("email")[0].value!=""&&!isEmail(document.getElementsByClassName("email")[0].value)){
			$(".wrap-hint").css("display","block");
		}
		if(isEmail(document.getElementsByClassName("email")[0].value)){
			$(".wrap-hint").css("display","none");
		}
	});
	function isEmail(str){        //对email输入框中的输入格式进行判断
		var re = /^[\w\.\-]+@[\w]+\.([A-Za-z\d]{2,})$/g;
    	return re.test(str);
	}
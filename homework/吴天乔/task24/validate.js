/**
 * @authors WTQ (tianqiaow@gmail.com)
 */
//合法的用户名, 3~10个字符，只能是字母，数字，下划线
function isLegalUsername(str){
	return /^\w{3,10}$/.test(str);
}

//合法的密码, 6-15个字符，至少包括大写，小写，下划线，数字两种
function isLegalPassword(str){
	str = str.replace(/(^\s+)|(\s+$)/g, '');  // 清楚前后空格
	if(str.length < 6 || str.length > 15){
		return false;
	}

	// 如果包含上述四种以外的字符，false
	if(/\W/.test(str)){   
		return false;
	}

	// 如果全为大写、小写、数字、下划线，false
	if(/(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(str)){
		return false;
	}
	return true;
}

//合法的手机号
function isLegalPhonenumber(str){
	var reg = /^1((3[0-9])|(4[47])|(5[0-9])|(7[01678])|(8[0-9]))[0-9]{8}$/;
  	return reg.test(str);
}

//合法的邮箱
function isEmail(str){
  	var reg = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9][\w-]*\.[a-zA-Z]{2,}$/;
  	return reg.test(str);
}

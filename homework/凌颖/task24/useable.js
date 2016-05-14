/**
 * Created by lynn on 2016/5/13.
 */
function isValidUsername(str){
    var patt = /^\w{6,20}$/;
    return patt.test(str);
}

function isValidPassword(str){
//用户输入的密码数量不满足
    if( str.length < 6 || str.length > 16){
        return false;
    }
//用户输入的密码只包含大写字母、小写字母、数字、下划线的其中一种
    if(/(^[a-z]+$)|(^[A-Z]+$)|(^[0-9]+$)|(^_+$)/g.test(str)){
        return false;
    }
//用户输入的包含了大写字母、小写字母、数字、下划线以外的字符
    if(/\W/.test(str)){
        return false;
    }
    return true;
}
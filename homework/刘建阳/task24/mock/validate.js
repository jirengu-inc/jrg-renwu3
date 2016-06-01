//函数isValidUsername(str)，判断用户输入的是不是合法的用户名（长度3-10个字符，只能包括字母、数字、下划线）
		function isLegalUsername(str) {
			var exp = /^\w{3,10}$/;
			return exp.test(str);
		}
/*		判断用户输入的是不是邮箱*/
function isLegalEmail(str) {
		     var exp = /\S+@\S+\.[A-z]{2,}$/;
		     return exp.test(str);
		}
//密码验证,长度6-15个字符，包括大写字母、小写字母、数字、下划线至少两种
function isLegalPassword(str) {
			var exp = /^\w{6,15}$/;
			if (exp.test(str)) {
				if(/(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(str)){
					return false;
				}
				return true;
			}else{
				return false;
			};
			return true;
		}



//class的添加删除
function hasClass(el, cls){
			// if (el.className) {
				var patt=new RegExp('\\b'+cls+'\\b','g');
				// console.log(el.className);
				return patt.test(el.className);
			// };		
			
		}

		function addClass(el, cls){
			if(hasClass(el, cls)){
				return ;
			}
			el.className += " "+cls;
			
		}
		function removeClass(el, cls){
			if(hasClass(el, cls)){
			
			el.className = el.className.replace(new RegExp('\\b'+cls+'\\b', 'g'),"");
				
			}
			return ;
		}

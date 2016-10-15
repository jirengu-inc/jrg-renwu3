/**
 * @authors WTQ (tianqiaow@gmail.com)
 */
function hasClass(el, cls){
	var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
	return reg.test(el.className);
}

function addClass(el, cls){
	if(el.length && el.length > 0){
		for(var i = 0; i < el.length; i++){
			singleAddClass(el[i], cls);
		}
	}else{
		singleAddClass(el, cls);
	}
}

function removeClass(el, cls){
	if(el.length && el.length > 0){
		for(var i = 0; i < el.length; i++){
			singleRemoveClass(el[i], cls);
		}
	}else{
		singleRemoveClass(el, cls);
	}
}

function singleAddClass(el, cls){
	if(hasClass(el, cls) ){
		return;
	}
	el.className += ' ' + cls;
}

function singleRemoveClass(el, cls){
	var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
	el.className = el.className.replace(reg, ' ').replace(/\s{2,}/g, ' ');
}

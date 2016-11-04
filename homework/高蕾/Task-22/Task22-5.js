// var btn = document.getElementsByClassName('btn')[0],
	// 	cover = document.getElementsByClassName('cover')[0],
	// 	modal = document.getElementsByClassName('modal')[0];
	// btn.addEventListener('click',function(){
	// 	cover.style.display = 'block';
	// 	modal.style.display = 'block';
	// 	// close[0].addEventListener('click',function(){
	// 	// 	cover.style.display = 'none';
	// 	// 	modal.style.display = 'none';
	// 	// })
	// })
	// modal.addEventListener('click',function(e){
	// 	if(e.target.getAttribute('class') === 'close'){
	// 		hiddenModal();
	// 	}
	// })
	// cover.addEventListener('click',function(e){
	// 	hiddenModal();	
	// })
	// function hiddenModal(){
	// 	cover.style.display = 'none';
	// 	modal.style.display = 'none';
	// }

	var cover = document.getElementsByClassName('cover')[0],
		modal = document.getElementsByClassName('modal')[0],
		body = document.getElementsByTagName('body')[0];
	body.addEventListener('click',function(e){
		if (e.target.getAttribute('class') === 'btn') {
			cover.style.display = 'block';
			modal.style.display = 'block';
		}
		if (e.target.getAttribute('class') === 'cover') {
			hiddenModal();
		}
		if (e.target.getAttribute('class') === 'close') {
			hiddenModal();
		}
	})
	
	function hiddenModal(){
		cover.style.display = 'none';
		modal.style.display = 'none';
	}
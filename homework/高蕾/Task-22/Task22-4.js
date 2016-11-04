var ul = document.getElementsByTagName('ul')[0],
	    li = document.getElementsByTagName('li')
		p = document.getElementsByTagName('p')[0];

	ul.addEventListener('mouseover',function(e){
		if(!new RegExp("active").test(e.target.className)){
			e.target.setAttribute("class","active");
			for (var i = 0; i < li.length; i++) {
				if (e.target === li[i]) {
					p.innerText = "内容"+(++i);
				}
			}
		}
		this.addEventListener('mouseout',function(e){
			if(new RegExp("active").test(e.target.className)){
				e.target.setAttribute("class","");
			}	
		})
	})
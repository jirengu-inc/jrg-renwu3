$.fn.imgCenVer = function(width,height){
	var width = width||320,
		height = height||240,
		curHeight = this.height(),
		curWidth = this.width();

	if(curWidth/curHeight > width/height){
		this.height(height);
		curWidth = this.width();
		this.css('margin-left',-(curWidth-width)/2);
	}else{
		this.width(width);
		curHeight = this.height();
		this.css('margin-top',-(curHeight-height)/2);
	}
	
	return this;
};
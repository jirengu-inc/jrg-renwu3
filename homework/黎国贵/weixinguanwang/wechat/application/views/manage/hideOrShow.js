function hideOrShow()
{
	var xmlhttp;
	if (str.length==0)
	{
		document.getElementById("txtHint").innerHTML="";
		return;
	}
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  	xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("hos").innerHTML=xmlhttp.responseText==1?"";
		}
	}
	xmlhttp.open("GET","gethint.asp?q="+str,true);
	xmlhttp.send();
}
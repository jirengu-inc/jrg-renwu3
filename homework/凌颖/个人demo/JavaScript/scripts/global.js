function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
function insertAfter(newElement,targetElement){
   var parent = targetElement.parentNode;
   if (parent.lastChild == targetElement) {
      parent.appendChild(newElement);
   }else{
      parent.insertBefore(newElement,targetElement.nextSibling);
   }
   
}

function addClass(element,value){
   if (!element.className){
      element.className=value;
   }else{
      newClassName=element.className;
      newClassName+= " ";
      newClassName+= value;
      element.className=newClassName;
   }
}
function highlightPage(href){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers =document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    var links=navs[0].getElementsByTagName('a');
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl)!=-1) {
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.links[i].setAttribute("id",linktext);
        }
    }
}
function moveElement(elementID,final_x,final_y,interval){
   if (!document.getElementById) return false;
   if (!document.getElementById(elementID)) return false;
   var elem = document.getElementById(elementID);
   if (elem.movement) {
     clearTimeout(elem.movement);
   }
   if (!elem.style.left) {
        elem.style.left="0px";
   }
   if (!elem.style.top) {
        elem.style.top="0px";
   }
   var xpos=parseInt(elem.style.left);
   var ypos=parseInt(elem.style.top);
   if ( xpos == final_x && ypos == final_y) {
    return true;
   }
   if ( xpos < final_x) {
    dist=Math.ceil((final_x-xpos)/10);
      xpos=xpos+dist;
   }
   if ( xpos > final_x) {
    dist=Math.ceil((xpos-final_x)/10);
      xpos=xpos-dist;
   }
   if ( ypos < final_y) {
    dist=Math.ceil((final_y-ypos)/10);
      ypos=ypos+dist;
   }
   if ( ypos > final_y) {
    dist=Math.ceil((ypos-final_y)/10);
      ypos=ypos-dist;
   }
   elem.style.left = xpos+"px";
   elem.style.top = ypos+"px";
  var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}
function prepareSlideshow() {
   if (!document.getElementsByTagName)return false;
   if (!document.getElementById)return false;
   if (!document.getElementById("intro"))return false;
   var intro=document.getElementById("intro");
   var slideshow=document.createElement("div");
   slideshow.setAttribute('id','slideshow');
   var preview=document.createElement('img');
   preview.setAttribute("src","images/7.png");
   preview.setAttribute("alt","a glimpse of what awaits you");
   preview.setAttribute("id","preview");
   slideshow.appendChild(preview);
   insertAfter(slideshow,intro);
   var links =document.getElementsByTagName("a");
   var destination;
   for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html")!=-1) {
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html")!=-1) {
                moveElement("preview",-80,0,5);
            }
            if (destination.indexOf("photos.html")!=-1) {
                moveElement("preview",-160,0,5);
            }
            if (destination.indexOf("live.html")!=-1) {
                moveElement("preview",-270,0,5);
            }
            if (destination.indexOf("contact.html")!=-1) {
                moveElement("preview",-300,0,5);
            }
        }
   }
}
function showSection(id){
    var sections=document.getElementsByTagName("section");
    for (var i=0;i<sections.length;i++){
        if (sections[i].getAttribute('id')!=id) {
        sections[i].style.display = "none";
    } else {
        sections[i].style.display="block";
    }
}
}
function prepareInternalnav(){
   if (!document.getElementsByTagName)return false;
   if (!document.getElementById)return false;
   var articles=document.getElementsByTagName("article");
   if (articles.length == 0)return false;
   var navs = articles[0].getElementsByTagName("nav");
   if (navs.length == 0)return false;
   var nav = navs[0];
   var links = nav.getElementsByTagName("a");
   for(var i=0;i<links.length;i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display ="none";
        links[i].destination=sectionId;
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
   }
}

 function preparePlaceholder(){
                if (!document.createElement) return false;
                if (!document.createTextNode) return false;
                if (!document.getElementById) return false;
                if (!document.getElementById("imagegalley")) return false; 
                var img=document.createElement("img");
                img.setAttribute("id","placeholder");
                img.setAttribute("src","images/img2.jpg");
                img.setAttribute("alt","my image gallery");
                var $p=document.createElement("p");
                $p.setAttribute("id","d");
                var destext=document.createTextNode("Choose an image");
                $p.appendChild(destext);
                var image=document.getElementById("imagegalley");
                insertAfter(img,image);
                insertAfter($p,img);
        }
        
        function prepare(){
             if(!document.getElementsByTagName)return false;
             if(!document.getElementById)return false;
             if(!document.getElementById("imagegalley"))return false;
              var gallery=document.getElementById("imagegalley")
              var links=gallery.getElementsByTagName("a")
              for (var i=0;i<links.length;i++) {
                  links[i].onmouseout=function(){
                      return showPic(this);
                  }
                  links[i].onkeypress=links[i].onclick;
              }       
        }
        
        function showPic(whichpic) {
        if (!document.getElementById("placeholder"))return false;
        var source=whichpic.getAttribute("href");
        var placeholder=document.getElementById("placeholder");
        placeholder.setAttribute("src",source);
        if(document.getElementById("$p")){
            var text=whichpic.getAttribute("title")? whichpic.getAttribute("title") :"";
            var $p=document.getElementById("$p");
            if ($p.firstChild.nodeType == 3) {
               $p.firstChild.nodeValue=text;
            }
            return false;
         }  
        }
        function stripeTables(){
            if (!document.getElementsByTagName) return false;
            var tables = document.getElementsByTagName("table");
            for(var i=0;i<tables.length;i++){
                var odd=false;
                var rows=tables[i].getElementsByTagName("tr");
                for (var j=0;j<rows.length;j++) {
                    if (odd==true) {
                        addClass(rows[j],"odd");
                        odd = false;
                    }else{
                        odd=true;
                    }
                }
            }
        }
        
function stripeTables(){
   if (!document.getElementsByTagName) return false;
   var tables=document.getElementsByTagName('table');
   for(var i=0;i<tables.length;i++){
    var odd=false;
    var rows=tables[i].getElementsByTagName('tr');
    for (var j=0;j<rows.length;j++) {
        if (odd==true) {
            addClass(rows[j],"odd");
            odd=false;
        }else{
            odd=true
        }
        }
    } 
}
function highlightRows(){
    if (!document.getElementsByTagName) return false;
    var rows=document.getElementsByTagName('tr');
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover=function(){
            addClass(this,'highlight');
        }
        rows[i].onmouseout=function(){
            this.className=this.oldClassName;
        }
    }
}
function displayAbbr(){
    if (!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
    var abbr=document.getElementsByTagName("abbr");
    if (abbr.length<1) return false;
    var defs=new Array();
    for(var i=0;i<abbr.length;i++){
        if (abbr[i].length<1) continue;
        var definition=abbr[i].getAttribute('title');
        var key=abbr[i].lastChild.nodeValue;
        defs[key]=definition;
    }
    var dl=document.createElement("dl");
    for(key in defs){
        var definition =defs[key];
        var dt=document.createElement("dt");
        var dt_text=document.createTextNode(key);
        dt.appendChild(dt_text);
        var dd=document.createElement("dd");
        var dd_text=document.createTextNode(definition);
        dd.appendChild(dd_text);
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
    if (dl.childNodes.length<1)return false;
    var header=document.createElement("h3");
    var header_text=document.createTextNode("abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length==0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dl);
}
function focusLabel(){
    if (!document.getElementsByTagName) return false;
    var labels=document.getElementsByTagName('label');
    for(var i=0;i<labels.length;i++){
        if (!labels[i].getAttribute('for')) return false;
        labels[i].onclick=function(){
            var id=this.getAttribute('for');
            if (!document.getElementById(id)) return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}
function resetFields(whichform){
    if (Modernizr.input.placeholder) return false;
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if (element.type=="submit")continue;
        var check=element.placeholder || element.getAttribute('placeholder');
        if (!check) continue;
        element.onfocus=function(){
            var text=this.placeholder||this.getAttribute('placeholder');
            if (this.value==text) {
                this.className="";
                this.value="";
            }
            }
            element.onblur=function(){
                if (this.value=="") {
                    this.className="placeholder";
                    this.value=this.placeholder||this.getAttribute('placeholder');
                }
            }
            element.onblur();
        }
    }
function prepareForms(){
    for(var i=0;i<document.forms.length;i++){
        var thisform=document.forms[i];
        resetFields(thisform);
        thisform.onsubmit=function(){
            if (!validateForm(this))return false;
            var article=document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(this,article)) return false;
            return true; 
        }
    }
}
 function isFilled(field){
    if (field.value.replace(' ','').length==0) return false;
    var placeholder=field.placeholder||field.getAttribute('placeholder');
    return(field.value!=placeholder);
 }
 function getHTTPObject(){
    if (typeof XMLHttpRequest=="undefined")
    XMLHttpRequest=function(){
        try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
        catch(e) { }
        try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
        catch(e) { }
        try {return new ActiveXObject("Msxml2.XMLHTTP");}
        catch(e) { }
        return false;
        }
        return new XMLHttpRequest();
    }
function displayAjaxLoading(element){
    while (element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/8.jpg");
    content.setAttribute("alt","Loading...");
    element.appendChild(content);
}
function submitFormWithAjax(whichform,thetarget){
    var request=getHTTPObject();
    displayAjaxLoading(thetarget);
    var detaParts=[];
    var element;
    for(var i=0;i<whichform.elements.length;i++){
        element=whichform.elements[i];
        dataParts[i]=element.name+'='+encodeURIComponent(element.value);
    }
    var data=dataParts.join('&');
    request.open('POST',whichform.getAttribute('action'),true);
    request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    request.onreadystatechange=function(){
        if (request.readyState==4){
            if (request.status==200) {
                var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length>0) {
                    thetarget.innerHTML=matches[1];
                }else{
                    thetarget.innerHTML='<p>Oops,there was an error.Sorry.</p>'
                }
            }else{
                thetarget.innerHTML='<p>'+request.statusText+'</p>'
            }
            }
        };
        request.send(data);
        return true;
        };


addLoadEvent(preparePlaceholder);
addLoadEvent(prepare);
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbr);
addLoadEvent(focusLabel);
addLoadEvent(prepareForms);
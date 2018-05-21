$(function(){
    var icons=document.getElementsByClassName('icon');
    var icons2=document.getElementsByClassName('icon2');

    var initial=610;
    var initial2=602;

    for(var i=0;i<icons.length;i++){
        icons[i].style.left=initial+'px';
        icons[i].style.bottom=8+'px';
        initial+=95;
    }
    for(var i=0;i<icons2.length;i++){
        icons2[i].style.left=initial2+'px';
        icons2[i].style.bottom=76+'px';
        initial2+=95;
    }
})
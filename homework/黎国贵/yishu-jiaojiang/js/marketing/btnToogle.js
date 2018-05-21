$(function(){
    //APP按钮切换
    var btns=document.getElementById('app-buttons');
    var btn=btns.getElementsByClassName('btn');
    var appChart=document.getElementsByClassName('tools-app-chart');

    for(var i=0;i<btn.length;i++){
        btn[i].index=i;
        btn[i].onclick=function(){
            for(var j=0;j<appChart.length;j++){
                appChart[j].classList.remove('active');
            }
            appChart[this.index].classList.add('active');
            $(this).siblings().removeClass('active');
            this.classList.add('active');
        }
    }
})
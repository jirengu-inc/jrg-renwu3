$(function () {
    //基础信息条形图
    var percentage=document.getElementsByClassName('percentage');
    var progress=document.getElementsByClassName('bar-progress');
    var percentageArr=[0.5,0.23,0.42,0.63,0.9,0.81,0.1,0.41,0.52,0.7,0.15,0.11,0.19,0.8,0.25,0.26,0.85,0.15,0.6,0.74,0.36,0.14,0.96,0.5];

    for(var i=0;i<percentage.length;i++){
        percentage[i].innerHTML=(percentageArr[i]*100).toFixed(0)+'%';
        progress[i].style.width=percentageArr[i]*210+'px';
    }

    //基础信息爱好条形图
    var hobbyCateArr=['美食','户外运动','电脑游戏','电影','音乐','旅游','阅读','投资','炒股','棋牌','外卖','宠物'];
    var hobbyNumArr=[1050,912,766,710,640,580,454,396,276,200,112,84];
    var hobbyQuantity=document.getElementsByClassName('quantity');
    var hobbyCate=document.getElementsByClassName('hobbyCate');
    var hobbyProgress=document.getElementsByClassName('hobby-progress');


    var sunHobbyNumArr=eval(hobbyNumArr.join('+'));

    for(var i=0;i<hobbyCate.length;i++){
        hobbyCate[i].innerHTML=hobbyCateArr[i];
        hobbyQuantity[i].innerHTML=hobbyNumArr[i];
        hobbyProgress[i].style.height=(hobbyNumArr[i]/sunHobbyNumArr)*500+"px"
    }

    //意向用户热搜词
    var hotArr=[592469,469344,383098,242622,236176,176611,75059];
    var hotNum=document.getElementsByClassName('hot-num');
    var hotStrip=document.getElementsByClassName('hot-strip');

    var sunHotArr=eval(hotArr.join('+'));

    for(var i=0;i<hotNum.length;i++){
        hotNum[i].innerHTML=hotArr[i];
        hotStrip[i].style.width=(hotArr[i]/sunHotArr)*1000+"px"
    }

    //酒店订单分析
    var hotelArr=[999246,869344,783098,742622,636176,576611,476611,426611,186611,176611];
    var hotelNum=document.getElementsByClassName('hotel-num');
    var hotelStrip=document.getElementsByClassName('hotel-strip');
    var sunHotelArr=eval(hotelArr.join('+'));

    for(var i=0;i<hotelNum.length;i++){
        hotelNum[i].innerHTML=hotelArr[i];
        hotelStrip[i].style.width=(hotelArr[i]/sunHotelArr)*1600+"px"
    }



})
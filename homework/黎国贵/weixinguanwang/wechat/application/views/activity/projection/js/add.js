/**
 * Created by gutian on 2016/8/7.
 */
//$('#bt').click(function(){
//    $.ajax({
//        type: "POST",
//        url: "/wechat/index.php/activity/actChangeState",
//        data: {
//            id: $(target).attr('value')},
//        error: function () {
//            alert('ˢ��ʧ�ܣ�');
//        },
//        success: function (data, status) {
//            $(target).html(data);
//        }
//    })
//});

$(function(){
    setInterval(aa,5000);
    function aa(){
        $.ajax({
            type: "get",
            url:"/wechat/index.php/activity/",
            async: false, // 使用同步方式
            // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
            // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
            data: ({
                "token":tokenobj
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {

            } // 注意不要在此行增加逗号
        });
    }
});


$('#bt').click(function(){
  $('.scroll1').prepend("<div class='dtbox'><p class='leftword'>五分钟</p><p class='square'></p><p class='line'></p><div class='dtbox2'><img class='dongtaiimg'><p class='dongtaiid'>小明</p><p class='dongtaiifo'>选择了“值得投”</p></div></div>");
    var div=$(".dtbox");
    div.animate({opacity:'0.5',height:'150px'},"fast");
    div.animate({opacity:'1',height:'150px'},"slow");
});
$('#bt2').click(function(){
    $('.scroll').prepend("<div class='col-md-12 rtbx'><img class='rtimg'><div class='rtifo'><p class='id'>小明</p><p class='time'>18:55</p></div><p class='ifo'>@王总我跟一个</p></div>");
    var div2=$(".rtbx");
    div2.animate({opacity:'0.5'},"fast");
    div2.animate({opacity:'1'},"slow");
});
$('#bt3').click(function(){
    $('.guanzhu').html("222");
    $('.zhide').html("222");
    $('.hetou').html("222");
});

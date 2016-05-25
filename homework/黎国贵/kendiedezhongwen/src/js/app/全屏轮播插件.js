define(['jquery'],function ($) {
    var start;
    var $ct = $(".ct") ;
    var $children = $ct.children("li");
    var $bullet = $(".bullet");
    var length = $children.size();//克隆前图片的数量
    var imgWidth = $(window).width();//窗口宽度
    var $bg = $(".bg");
    for(var i=0;i<$bg.size();i++){
        var imgUrl = $bg.eq(i).attr('data-bg-img');
        $bg.eq(i).css('background-image', 'url('+imgUrl+')');
    }
    var cur = 0;
    var isAnimate =true;//全局变量状态锁，允许执行自动播放的功能
    $ct.append($children.first().clone());
    $ct.prepend($children.last().clone());
    $ct.find("li").css("width",imgWidth);//将li标签设为窗口宽
    $ct.find(".bg").css("width",imgWidth);//将将背景div设为窗口宽
    var imgRealCount = $ct.children().size();//克隆后图片的数量
    $ct.css({left:0-imgWidth,width:imgRealCount*imgWidth});
    function init() {
        _bind();
        autoPlay();
    }
    function _bind() {
        $bullet.find("li").on("mouseenter",function () {
            stop();
            var index = $(this).index();
            if (index>cur){
                playNext(index-cur);
            }
            else if(index<cur){
                playPrev(cur-index);
            }
            autoPlay();
        });
    }
    function  playNext (idx) {
        var idx = idx || 1; //移动图片的数量
        if(isAnimate){
            isAnimate = false;
            $ct.animate({     //让装载图片的火车，移动
                left : "-=" +(imgWidth*idx)
            },function () {
                cur = (cur + idx)%length;//改变编号
                if(cur===0){//如果是第一号 虽然展示的是克隆体，但应该展示第一号，所以
                    $ct.css({left:0-imgWidth});//瞬间移动为第一个,因为前面有一个克隆的，所以要减去一个imgWidth
                }
                isAnimate = true;
                setBullet();
            })
        }
    }
    function  playPrev (idx) {
        var idx = idx || 1; //移动图片数的数量
        if(isAnimate){
            isAnimate = false;
            $ct.animate({     //让装载图片的火车，移动
                left : "+=" +(imgWidth*idx)
            },function () {
                cur = (length+cur-idx)%length;//改变编号
                if(cur===length-1){//如果是最后一号 虽然展示的是克隆体，但应该展示最后一号，所以
                    $ct.css({left:0-imgWidth*length});//瞬间移动为最后一个,因为前面有一个克隆的，所以要减去imgWidth*length
                }
                isAnimate = true;
                setBullet();
            })
        }
    }
    function setBullet() {//给相应bullet的li元素加上背景色
        $bullet.children().removeClass("active").eq(cur).addClass("active");
    }
    function autoPlay (){//自动播放
        start = setInterval(function () { //编号start为全局变量，不然的话stop函数找不到这个编号了
            playNext();
        },2000)
    }
    function stop() {//停止自动播放功能
        clearInterval(start);
    }
    return{
        init:init
    }
});

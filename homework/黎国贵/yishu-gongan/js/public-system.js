$(function(){
    function asideH (){
        var wrapHeight1 = $('.ct-wrap').height();
        console.log(wrapHeight1);
        var wrapHeight2 = $('.wrap-nav').height();
        var wrapHeight3 = $('.sub-nav').height();
        var totH = wrapHeight1+wrapHeight2+wrapHeight3+40+11;

        var asideHeight = totH + 60;
        //console.log(asideHeight);
        $('.aside').height(asideHeight);
    }
    asideH ();
    window.asideH = asideH;
});



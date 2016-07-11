
function Stickup($nav){
    this.$nav=$($nav);
    //this.$navClone = $nav.clone().attr('id','x');
    this.topDistace = $nav.offset().top;
    //this.$navClone.css({visibility: 'hidden', display: 'none'}).insertBefore($nav);
    this.bindEvent()
}

Stickup.prototype.bindEvent=function () {
    var that = this;
    $(window).on('scroll',function (e) {
        //show
        var winOffset = $(this).scrollTop();
        var offset = that.$nav.height()*that.$nav.parent().index();
        if(winOffset>=(that.topDistace-offset)){
            if(!that.isFixed(that.$nav)){
                that.setFixed(that.$nav)
            }
        }else{
            //hidden
            that.resetFixed(that.$nav)
        }
    });
    $(window).on('resize',function (e) {
        if(that.isFixed(that.$nav)){
            that.resizeFixed(that.$nav);
        }
    });
    this.$nav.on('click',function (e) {
        $(window).scrollTop(that.topDistace);
    });
}

Stickup.prototype.isFixed=function (nav) {
    return !! nav.attr('fixed')
}

Stickup.prototype.setFixed = function (nav) {

    nav.attr('fixed',true);
    this.resizeFixed(nav);
}
Stickup.prototype.resizeFixed=function (nav ) {
    nav.css({position: 'fixed',
        left:nav.offset().left,
        top:nav.height()*nav.parent().index(),
        width: nav.width(),
        height:nav.height(),
        margin:0});
}
Stickup.prototype.resetFixed = function (nav){
    nav.removeAttr('fixed').removeAttr('style');
}
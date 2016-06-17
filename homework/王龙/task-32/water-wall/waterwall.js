var waterFall={
    columnHeight:[],
    init:function ($tmpl,$ct) {
        this.$tmpl=$tmpl;
        this.$ct=$ct;
        this.bindEvent();
    },

    render: function  ($node) {
        var self = this;
        this.itemWidth = this.$tmpl.outerWidth(true);
        this.$ct.width('auto');
        this.colNum = Math.floor( this.$ct.width() / this.itemWidth );
        if(this.columnHeight.length === 0 || !$node){
            this.columnHeight=new Array(this.colNum);
            this.columnHeight.fill(0,0,this.colNum);
        }
        this.$ct.width(this.itemWidth*this.colNum);


        if($node){
            $node.each(function (i,li) {
                //TODO 高度计算依赖图片的加载,更新columnHeight中的值
                var imgLoad=function () {
                    var defer = $.Deferred();
                    $(li).find('img').each(function (i,img) {
                        img.onload=function () {
                            defer.resolve();
                        }
                    })
                    return defer;
                };
                $.when(imgLoad()).done((function (ele,i) {
                    return function () {
                        self.holdIt(ele,function ($e) {
                            self.$ct.append( $e);
                        });
                        self.$ct.height( Math.max.apply(null, self.columnHeight) );
                    };
                })(li,i)).fail(function () {
                    console.log('fail.....')
                });
            });
        }else{//resize()
            this.resizeWin();
        }
    },
    holdIt:function (ele,callBack) {
        var minValue = this.min(this.columnHeight);
        console.log(minValue)
        $(ele).css({
            left:this.itemWidth*(minValue.index),
            top:minValue.value,
        })
        callBack && callBack.call(this,$(ele));
        this.columnHeight[minValue.index]+= $(ele).outerHeight(true);//列高
    },
    resizeWin:function () {
        var self = this;
        console.log('resizeWin')
        this.$ct.find('.item').each(function () {
            self.holdIt(this)
        });
        self.$ct.height( Math.max.apply(null, self.columnHeight) );
    },
    bindEvent:function () {
        var self = this;
        $(window).on('resize', function(){
            self.render();
        });
    },
    min:function (arr) {
        if( arr && arr instanceof Array ){
            var temp={value:arr[0],index:0};
            for(var i=1;i<arr.length;i++){
                if(arr[i]< temp.value){
                    temp.value =arr[i]
                    temp.index=i;
                }
            }
            return temp;
        }
    }
}
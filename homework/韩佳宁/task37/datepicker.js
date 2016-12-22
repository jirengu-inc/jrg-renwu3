function DatePicker($target) {
    //初始化日期
    this.init($target)

    //生成日历模板
    this.render()

    //设置tbody里面的数据,并排版
    this.setData()

    //绑定事件
    this.bind()
}

DatePicker.prototype = {
    //时间初始化,同时检查date-init是否合法
    init: function($target) {
        this.$target = $target
        this.initValue = $target.attr('date-init')
        if (this.isValidDate(this.initValue)) { //判断设置的初始时间是否合法
            this.date = new Date(this.initValue) //当前日期或者指定的要展示的日期
            this.watchDate = new Date(this.initValue) //用户在切换月份时所能看到的日期,初始为当前日期
        } else { //如果初始值不合法,则使用当前系统时间
            this.date = new Date()
            this.watchDate = new Date()
        }
    },
    //渲染日历的基本模板,设置日历的位置
    render: function() {
        var tpl = '<div class="ui-date-picker" style="display:none">' +
            '<div class="header"><span class="pre caret-left"></span><span class="cur header-date"></span><span class="next caret-right"></span></div>' +
            '<table class="panel">' +
            '<thead> <tr> <th>日</th> <th>一</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> </tr> </thead>' +
            '<tbody></tbody>' +
            '</div>'
        this.$datepicker = $(tpl) //生成jQuery元素
        this.$datepicker.insertAfter(this.$target) //把模板插入到输入框的后面
            .css({
                'position': 'absolute',
                'left': this.$target.offset().left,
                'top': this.$target.offset().top + this.$target.height(true)
            })
    },

    //根据init 中的时间来生成tbody的内容并排版
    //插件的核心!
    setData: function() {
        this.$datepicker.find('tbody').html('') //tbody内容初始为空

        var dateArr = [] //当前页面的所有日期都会以JSON的形式放入这个数组中

        var firstDay = this.getFirstDay(this.watchDate), //当前月的第一天的时间对象 1号
            lastDay = this.getLastDay(this.watchDate) //当前月的最后一天的时间对象 30/31/28/29

        //日历的header上要显示的内容
        var dateTitle = this.watchDate.getFullYear() + '年' + (this.watchDate.getMonth() + 1) + '月'
        this.$datepicker.find('.header-date').text(dateTitle)

        //根据firstDay是星期几来判断如何排版上个月最后几天
        for (var i = firstDay.getDay(); i > 0; i--) {
            var d = new Date(firstDay.getTime() - i * 24 * 60 * 60 * 1000)
            dateArr.push({
                    type: 'pre',
                    date: d
                }) //以JSON形式存入dateArr
        }

        //lastDay 减去 firstDay 来判断这个月有几天.
        //根据这个来排版
        for (var j = 0; j < lastDay.getDate() - firstDay.getDate() + 1; j++) {
            var d = new Date(firstDay.getTime() + j * 24 * 60 * 60 * 1000)
            dateArr.push({
                type: 'cur',
                date: d
            })
        }

        //根据lastDay是星期几来排版下个月前几天
        for (var k = 1; k < 7 - lastDay.getDay(); k++) {
            var d = new Date(lastDay.getTime() + k * 24 * 60 * 60 * 1000)
            dateArr.push({
                type: 'next',
                date: d
            })
        }

        //dateArr装填完毕,开始拼装tbody内的元素
        var tpl = '' //初始为空
        for (var i = 0; i < dateArr.length; i++) { //遍历整个dateArr
            if (i % 7 === 0) {
                tpl = '<tr>' + tpl
            } //日历中每一行是一个<tr>

            tpl += '<td class="'

            if (dateArr[i].type === 'pre') { //根据日期时上个月 这个月还是下个月的来添加不同class
                tpl += 'pre-month'
            } else if (dateArr[i].type === 'cur') {
                tpl += 'cur-month'
            } else {
                tpl += 'next-month'
            }

            if (this.getYYMMDD(this.date) === this.getYYMMDD(dateArr[i].date)) {
                tpl += ' cur-date'
            } //为选择的日期添加class
            tpl += '"'

            tpl += ' data-date="' + this.getYYMMDD(dateArr[i].date) + '">'
            tpl += this.toFixed(dateArr[i].date.getDate()) + '</td>'


            if (i % 7 === 6) {
                tpl = tpl + '</tr>'
            }
        }
        this.$datepicker.find('tbody').html(tpl) //把tpl插入 tbody


    },

    //绑定事件
    bind: function() {
        var self = this //事件回调函数里拿不到this

        this.$datepicker.find('.pre').on('click', function() { //下个月
            self.watchDate = self.getPreMonth(self.watchDate)
            self.setData()
        })
        this.$datepicker.find('.next').on('click', function() { //上个月
            self.watchDate = self.getNextMonth(self.watchDate)
            self.setData()
        })
        this.$datepicker.on('click', '.cur-month', function() { //选择日期
            self.$target.val($(this).attr('data-date'))
            self.$datepicker.hide()
        })

        this.$target.on('click', function(e) { //展示日历
            e.stopPropagation()
            self.$datepicker.show()
        })
        $(window).on('click', function(e) { //隐藏日历
            self.$datepicker.hide()
        })
        this.$datepicker.on('click', function(e) {
            e.stopPropagation() //禁止事件传播,就地解决
        })
    },
    getFirstDay: function(date) {
        var year = date.getFullYear(),
            month = date.getMonth()

        return newDate = new Date(year, month, 1)

    },
    getLastDay: function(date) {
        var year = date.getFullYear(),
            month = date.getMonth()

        month++
        //下个月可能是明年一月了,年份+1,month变为0
        if (month > 11) {
            year++
            month = 0
        }
        var newDate = new Date(year, month, 1)
        return new Date(newDate.getTime() - 1000 * 60 * 60 * 24)
    },
    getPreMonth: function(date) {
        var year = date.getFullYear(),
            month = date.getMonth()

        month--
        //上个月可能是去年12月,month--后就为负了
        //所以如果 month 变为负值,则设置month为11 ,year -1
        if (month < 0) {
            year--
            month = 11
        }
        return new Date(year, month, 1)
    },
    getNextMonth: function(date) {
        var year = date.getFullYear(),
            month = date.getMonth()

        month++ //下月一号可能是明年了
        if (month > 11) {
            month = 0
            year++
        }
        return new Date(year, month, 1)
    },
    isValidDate: function(dateStr) { //判断html元素中设置的默认时间的字符串是否是个 有效日期
        return new Date(dateStr).toString() !== 'Invalid Date'
    },
    getYYMMDD: function(date) {
        var yyyy = date.getFullYear(),
            mm = this.toFixed(date.getMonth() + 1)
        dd = this.toFixed(date.getDate())
        return yyyy + '/'
        mm + '/' + dd
    },

    toFixed: function(n) {
        return (n + '').length === 1 ? ('0' + n + '') : (n + '')
    }
}

    //变成 jquery 插件
    //$.tn 就是 $.prototype
    $.fn.datePicker = function() {
        this.each(function(){
          new DatePicker($(this))
        })
    }

    $('.date-ipt').datePicker()
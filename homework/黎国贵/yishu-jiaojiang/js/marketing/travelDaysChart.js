$(function(){
    var travelDaysChart = echarts.init(document.getElementById('travel-days-chart'));

    var travelDaysChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 420,
            y : 100,
            itemWidth:30,
            itemHeight:12,
            itemGap:16,
            data:['1天','2天','3天','4天','5天','>=6天'],
            textStyle:{
                fontSize : 14,
            },
        },
        calculable : true,
        color:['#f6b61c','#fb7a53','#0fa2f2','#00c199','#78e7e6','#50d1cc'],
        series : [
            {
                name:'出行天数',
                type:'pie',
                radius : [65, 117],
                center:[204,176],
                clockWise:false,
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            formatter: '{d}%',
                            position : 'left',
                        },
                    },
                    emphasis : {
                        label : {
                            show : true,
                            formatter: '{d}%',
                            position : 'center',
                            textStyle : {
                                fontSize : 16,
                                fontWeight : 'bold'
                            }
                        },
                    }
                },
                data:[
                    {value:1548, name:'1天'},
                    {value:1548, name:'2天'},
                    {value:135, name:'3天'},
                    {value:234, name:'4天'},
                    {value:310, name:'5天'},
                    {value:335, name:'>=6天'}
                ]
            }
        ]
    };

    travelDaysChart.setOption(travelDaysChartOption);
})
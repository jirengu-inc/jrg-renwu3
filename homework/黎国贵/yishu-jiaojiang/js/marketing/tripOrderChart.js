$(function(){
    var tripOrderChart = echarts.init(document.getElementById('trip-order-chart'));

    var tripOrderChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 420,
            y : 86,
            itemWidth:30,
            itemHeight:12,
            itemGap:16,
            data:['驴妈妈','同城','携程','去哪儿','途牛','百度','一块去'],
            textStyle:{
                fontSize : 14,
            },
        },
        calculable : true,
        color:['#f6b61c','#fb7a53','#0fa2f2','#00c199','#78e7e6','#50d1cc','#6bdeff'],
        series : [
            {
                name:'订单行程分析',
                type:'pie',
                radius : [65, 117],
                center:[204,180],
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
                    {value:1548, name:'驴妈妈'},
                    {value:1548, name:'同城'},
                    {value:135, name:'携程'},
                    {value:234, name:'去哪儿'},
                    {value:310, name:'途牛'},
                    {value:335, name:'百度'},
                    {value:335, name:'一块去'}
                ]
            }
        ]
    };

    tripOrderChart.setOption(tripOrderChartOption);
})
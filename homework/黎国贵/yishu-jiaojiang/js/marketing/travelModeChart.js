$(function(){
    var travelModeChart = echarts.init(document.getElementById('travel-mode-chart'));

    var travelModeChartOption = {
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
            data:['汽车','火车','船舶','飞机','其他'],
            textStyle:{
                fontSize : 14,
            },
        },
        calculable : true,
        color:['#f6b61c','#fb7a53','#00c199','#78e7e6','#50d1cc'],
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
                    {value:500, name:'汽车'},
                    {value:315, name:'火车'},
                    {value:135, name:'船舶'},
                    {value:1000, name:'飞机'},
                    {value:310, name:'其他'},
                ]
            }
        ]
    };

    travelModeChart.setOption(travelModeChartOption);
})
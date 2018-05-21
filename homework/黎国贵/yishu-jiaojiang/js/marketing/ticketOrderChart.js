$(function(){
    var ticketOrderChart = echarts.init(document.getElementById('ticket-order-chart'));

    var ticketOrderChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 420,
            y : 130,
            itemWidth:30,
            itemHeight:12,
            itemGap:16,
            data:['无线端','线上','线下','平台接口'],
            textStyle:{
                fontSize : 14,
            },
        },
        calculable : true,
        color:['#f6b61c','#fb7a53','#0fa2f2','#00c199'],
        series : [
            {
                name:'票务订单分析',
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
                    {value:1548, name:'无线端'},
                    {value:600, name:'线上'},
                    {value:135, name:'线下'},
                    {value:234, name:'平台接口'},
                ]
            }
        ]
    };

    ticketOrderChart.setOption(ticketOrderChartOption);
})
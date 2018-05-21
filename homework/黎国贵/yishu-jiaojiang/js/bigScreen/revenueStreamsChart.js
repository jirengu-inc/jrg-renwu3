$(function(){
    var revenueStreamsChart = echarts.init(document.getElementById('revenue-streams-chart'));

    var revenueStreamsChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : true,
        color:['#d9523f','#61eeed','#f6b61c','#00c199','#13a5f9','#7d3cf4'],
        series : [
            {
                name:'营收来源',
                type:'pie',
                radius : [60, 100],
                center:[240,145],
                clockWise:false,
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            formatter: '{b} {d}%',
                            position : 'left',
                        },
                    },
                    emphasis : {
                        label : {
                            show : true,
                            formatter: '{b} {d}%',
                            position : 'center',
                            textStyle : {
                                fontSize : 16,
                                fontWeight : 'bold'
                            }
                        },
                    }
                },
                data:[
                    {value:1548, name:'酒店'},
                    {value:1548, name:'门票'},
                    {value:135, name:'餐饮'},
                    {value:234, name:'其他'},
                    {value:310, name:'交通'},
                    {value:335, name:'纪念品'}
                ]
            }
        ]
    };

    revenueStreamsChart.setOption(revenueStreamsChartOption);
})
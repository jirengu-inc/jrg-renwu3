$(function(){
    var toolsPayChart = echarts.init(document.getElementById('tools-pay-chart'));

    var toolsPayChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : true,
        color:['#f6b61c','#fb7a53','#0fa2f2','#00c199','#78e7e6','#50d1cc'],
        series : [
            {
                name:'出行天数',
                type:'pie',
                radius : [65, 117],
                center:[260,173],
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
                    {value:1548, name:'PayPal'},
                    {value:1548, name:'财付通'},
                    {value:135, name:'ApplePay'},
                    {value:234, name:'微信支付'},
                    {value:310, name:'银联'},
                    {value:335, name:'支付宝'}
                ]
            }
        ]
    };

    toolsPayChart.setOption(toolsPayChartOption);
})
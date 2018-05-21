$(function(){
    var revenueSituationChart = echarts.init(document.getElementById('revenue-situation-chart'));

    var revenueSituationChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 20,
            y : 260,
            itemWidth:20,
            itemHeight:12,
            data:['纪念品','交通','餐饮','门票','酒店','其他'],
            textStyle:{
                fontSize : 12,
                color:'#999',
            },
        },
        calculable : true,
        color:['#f6b61c','#fb7a53','#0fa2f2','#00c199','#78e7e6','#50d1cc'],
        series : [
            {
                name:'景区营收情况',
                type:'pie',
                radius : [60, 100],
                center:[200,125],
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
                    {value:1548, name:'纪念品'},
                    {value:1548, name:'交通'},
                    {value:135, name:'餐饮'},
                    {value:234, name:'门票'},
                    {value:310, name:'酒店'},
                    {value:335, name:'其他'}
                ]
            }
        ]
    };

    revenueSituationChart.setOption(revenueSituationChartOption);
})
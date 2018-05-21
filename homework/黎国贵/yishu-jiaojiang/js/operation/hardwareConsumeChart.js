$(function(){
    var hardwareConsumeChart = echarts.init(document.getElementById('hardware-consume-chart'));

    var hardwareConsumeChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 20,
            y : 300,
            itemWidth:30,
            itemHeight:12,
            itemGap:35,
            data:['空调','服务器','交换机','路由器'],
            textStyle:{
                fontSize : 14,
                color:'#666'
            },
        },
        calculable : true,
        color:['#f6b61c','#fb7a53','#00c199','#78e7e6'],
        series : [
            {
                name:'电源消耗比例',
                type:'pie',
                radius : [65, 117],
                center:[207,150],
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
                    {value:500, name:'空调'},
                    {value:315, name:'服务器'},
                    {value:135, name:'交换机'},
                    {value:1000, name:'路由器'},
                ]
            }
        ]
    };

    hardwareConsumeChart.setOption(hardwareConsumeChartOption);
})
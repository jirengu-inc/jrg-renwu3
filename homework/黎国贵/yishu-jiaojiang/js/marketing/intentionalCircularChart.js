$(function(){
    var intentionalCircularChart = echarts.init(document.getElementById('intentional-circular-chart'));

    var intentionalCircularChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : true,
        legend: {
            x : 50,
            y : 260,
            itemWidth:20,
            itemHeight:12,
            data:['携程旅游','阿里旅游','去哪儿','其他'],
            textStyle:{
                fontSize : 12,
                color:'#999',
            },
        },
        color:['#f6b61c','#fb7a53','#0fa2f2','#00c199'],
        series : [
            {
                name:'意向客源使用平台',
                type:'pie',
                radius : [60, 100],
                center:['50%',123],
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
                    {value:700, name:'携程旅游'},
                    {value:1548, name:'阿里旅游'},
                    {value:135, name:'去哪儿'},
                    {value:234, name:'其他'},
                ]
            }
        ]
    };

    intentionalCircularChart.setOption(intentionalCircularChartOption);
})
$(function(){
    var intentionalTriangleChart = echarts.init(document.getElementById('intentional-triangle-chart'));

    var intentionalTriangleChartOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        calculable : true,
        color:['#00c199','#0fa2f2','#fb7a53','#f6b61c','#50d1cc'],
        series : [
            {
                name:'漏斗图',
                type:'funnel',
                x:0,
                y:20,
                width:340,
                height:220,
                gap:3,
                itemStyle: {
                    normal: {
                        label: {
                            formatter: '20%',
                        },
                    },
                },
                data:[
                    {value:100, name:'（极高）80-100'},
                    {value:80, name:'（高）60-80'},
                    {value:60, name:'（中）40-60'},
                    {value:40, name:'（低）20-40'},
                    {value:20, name:'（极底）0-20'}
                ]
            },
        ]
    };

    intentionalTriangleChart.setOption(intentionalTriangleChartOption);
})
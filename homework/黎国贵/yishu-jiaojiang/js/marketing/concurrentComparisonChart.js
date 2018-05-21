$(function(){
    var concurrentComparisonChart = echarts.init(document.getElementById('concurrent-comparison-chart'));

    var concurrentComparisonChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            x:60,
            y:50,
            x2:60,
            y2:70,
            borderColor : '#e5e5e5'
        },
        calculable : true,
        legend: {
            data:['营业收入','环比增长','同比增长'],
            x : 290,
            y : 10,
            itemWidth:20,
            itemHeight:12,
            textStyle:{
                fontSize : 12,
                color:'#999'
            },
        },
        color:['#00c199','#ff9d00','#0fa2f2'],
        xAxis : [
            {
                type : 'category',
                data : ['酒店','门票','餐饮','交通','纪念品','其他'],
                axisLabel:{
                    textStyle:{
                        fontSize:12,  //刻度大小
                        color:"#666",
                    },
                },
                axisLine : {
                    lineStyle:{
                        color:'#666'
                    },
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '(收入)',
                axisLabel:{
                    textStyle:{
                        fontSize:12,  //刻度大小
                        color:"#666",
                    },
                    interval:3,
                },
                axisLine : {
                    lineStyle:{
                        color:'#666'
                    },
                },
            },
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}%'
                },
                axisLine : {
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                },
            }
        ],
        series : [
            {
                name:'营业收入',
                type:'bar',
                barWidth:14,
                data:[2000, 4900, 7000, 2320, 2506, 7607]
            },
            {
                name:'环比增长',
                type:'line',
                yAxisIndex: 1,
                symbol:'rectangle',
                symbolSize:10,
                data:[20, 59, 10, 26.4, 40, 70.7]
            },
            {
                name:'同比增长',
                type:'line',
                yAxisIndex: 1,
                symbol:'circle',
                symbolSize:10,
                data:[65, 16, 33, 50, 24, -10.2]
            }
        ]
    };

    concurrentComparisonChart.setOption(concurrentComparisonChartOption);
})
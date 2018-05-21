$(function(){
    var historyChart = echarts.init(document.getElementById('historyChart'));

    var historyChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            x:80,
            y:70,
            x2:60,
            y2:40,
            borderColor : '#e5e5e5'
        },
        calculable : true,
        legend: {
            data:['今年车辆总数','去年车辆总数'],
            x : 860,
            y : 15,
            itemWidth:20,
            itemHeight:12,
            itemGap: 20,
            textStyle:{
                fontSize : 16,
                color:'#999'
            },
        },
        color:['#00c199','#0fa2f2'],
        xAxis : [
            {
                type : 'category',
                name : '(月份)',
                nameTextStyle : {
                    fontSize : 14,
                },
                data : ['1月','2月','3月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisLabel:{
                    textStyle:{
                        fontSize:18,  //刻度大小
                        color:"#666",
                    },
                },
                axisLine : {
                    lineStyle : {
                        width: 2,
                        color : '#666'
                    }
                },
                axisTick:{
                    lineStyle:{
                        width: 2,
                    }
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '(数量)',
                nameTextStyle : {
                    fontSize : 14,
                },
                axisLabel:{
                    textStyle:{
                        fontSize:18,  //刻度大小
                        color:"#666",
                    },
                    interval:3,
                },
                axisLine : {
                    lineStyle : {
                        width: 2,
                        color : '#666'
                    }
                },
                axisTick:{
                    color:'#666',
                },
            },
            {
                type : 'value',
                axisLabel : {
                    textStyle:{
                        fontSize:12,  //刻度大小
                        color:"#666",
                    },
                    formatter: ''
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
                name:'今年车辆总数',
                type:'bar',
                barWidth:40,
                data:[2000, 4900, 7000, 2320, 2506, 7607,4244,4572,1052,4258,7520]
            },
            {
                name:'去年车辆总数',
                type:'line',
                yAxisIndex: 1,
                symbol:'circle',
                symbolSize:8,
                data:[6500, 1600, 3300, 5000, 2400, 1020, 4500,1000,1350,1700,6000]
            }
        ]
    };

    historyChart.setOption(historyChartOption);
})
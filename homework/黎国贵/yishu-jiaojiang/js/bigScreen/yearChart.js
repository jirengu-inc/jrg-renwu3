$(function(){
    var yearChart = echarts.init(document.getElementById('year-chart'));

    var yearChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            x:60,
            y:70,
            x2:50,
            y2:40,
            borderColor : '#e5e5e5'
        },
        calculable : true,
        legend: {
            data:['客流量','同比增长'],
            x : 105,
            y : 15,
            itemWidth:20,
            itemHeight:12,
            itemGap: 48,
            textStyle:{
                fontSize : 12,
                color:'#fff'
            },
        },
        color:['#15c0ff','#f6b61c'],
        xAxis : [
            {
                type : 'category',
                data : ['2月','3月','5月','6月','7月','8月','9月'],
                axisLabel:{
                    textStyle:{
                        fontSize:12,  //刻度大小
                        color:"#fff",
                    },
                },
                axisLine : {
                    show:false,
                },
                axisTick:{
                    show:false,
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '人数',
                nameTextStyle : {
                    color:'#fff',
                },
                splitLine:{
                	lineStyle:{
                		color:'#213056',
                	},
                },
                axisLabel:{
                    textStyle:{
                        fontSize:12,  //刻度大小
                        color:"#fff",
                    },
                    interval:3,
                },
                axisLine : {
                    show:false,
                },
                axisTick:{
                    show:false,
                },
            },
            {
                type : 'value',
                axisLabel : {
                    textStyle:{
                        fontSize:12,  //刻度大小
                        color:"#f6b61c",
                    },
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
                name:'客流量',
                type:'bar',
                barWidth:14,
                data:[2000, 4900, 7000, 2320, 2506, 7607,4244]
            },
            {
                name:'同比增长',
                type:'line',
                yAxisIndex: 1,
                symbol:'circle',
                symbolSize:8,
                data:[65, 16, 33, 50, 24, -10.2, 45]
            }
        ]
    };

    yearChart.setOption(yearChartOption);
})
$(function(){
    //车船态势折线图
    var carChart = echarts.init(document.getElementById('carChart'));

    // 指定图表的配置项和数据
    var carChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['进入车辆','离开车辆'],
            x : 900,
            y : 22,
            itemGap: 20,
            textStyle :{
                fontSize : 16,
                color : '#999'
            }
        },
        grid: {
            x:64,
            y:90,
            x2:70,
            y2:50,
            borderColor : '#e5e5e5'
        },
        calculable : true,
        color:['#00c199','#ff6155'],
        xAxis : [
            {
                type : 'category',
                name : '（时间）',
                boundaryGap : false,
                nameTextStyle : {
                    fontSize : 14,
                },
                axisLine : {
                    lineStyle : {
                        width: 2,
                        color : '#666'
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:18  //刻度大小
                    }
                },
                axisTick:{
                    lineStyle:{
                        width: 2,
                    }
                },
                data : ['6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
            }
        ],
        yAxis : [
            {
                name : '（数量）',
                nameTextStyle : {
                    fontSize : 14,
                },
                axisLine : {
                    lineStyle : {
                        width: 2,
                        color : '#666'
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:18  //刻度大小
                    },
                    interval:3
                },
                type : 'value'
            }
        ],
        series : [
            {
                name:'进入车辆',
                type:'line',
                symbolSize:8,
                data:[120, 132, 101, 134, 90, 230, 800, 120, 42, 105, 155, 105, 40]
            },
            {
                name:'离开车辆',
                type:'line',
                symbolSize:8,
                data:[10, 182, 191, 234, 0, 330, 310, 120, 132, 101, 134, 90, 230]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    carChart.setOption(carChartOption);
})

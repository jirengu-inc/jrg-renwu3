$(function(){
    var proportionOfChart = echarts.init(document.getElementById('proportion-of-chart'));

    var proportionOfChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['餐饮','酒店','交通','其他'],
            x : 430,
            y : 5,
            textStyle :{
                fontSize : 12,
                color : '#999'
            },
        },
        grid: {
            x:50,
            y:40,
            x2:70,
            y2:140,
            borderColor : '#e5e5e5'
        },
        calculable : true,
        color:['#ff9d00','#fb7a53','#0fa2f2','#00c199'],
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
                        color : '#666'
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:12  //刻度大小
                    }
                },
                data : ['6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
            }
        ],
        yAxis : [
            {
                name : '（收入）',
                nameTextStyle : {
                    fontSize : 12,
                },
                axisLine : {
                    lineStyle : {
                        color : '#666'
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:12  //刻度大小
                    },
                    interval:3
                },
                type : 'value'
            }
        ],
        series : [
            {
                name:'餐饮',
                type:'line',
                symbolSize:6,
                data:[120, 132, 101, 134, 90, 230, 800, 120, 42, 105, 155, 105, 40]
            },
            {
                name:'酒店',
                type:'line',
                symbolSize:6,
                data:[10, 182, 191, 234, 0, 330, 310, 120, 132, 101, 134, 90, 230]
            },
            {
                name:'交通',
                type:'line',
                symbolSize:6,
                data:[20, 112, 111, 244, 110, 100, 200, 310, 400, 500, 234, 170, 130]
            },
            {
                name:'其他',
                type:'line',
                symbolSize:6,
                data:[40, 82, 201, 104, 42, 420, 120, 300, 212, 120, 210, 111, 400]
            }
        ]
    };

    proportionOfChart.setOption(proportionOfChartOption);
})
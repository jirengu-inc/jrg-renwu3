$(function(){
    var variousScenicChart = echarts.init(document.getElementById('various-scenic-chart'));

    var variousScenicChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['少年宫','甲午岩','帽雨沙','浪通门'],
            x : 240,
            y : 10,
            itemWidth:20,
            itemHeight:12,
            textStyle:{
                fontSize : 12,
                color:'#999'
            },
        },
        grid: {
            x:60,
            y:50,
            x2:70,
            y2:70,
            borderColor : '#e5e5e5'
        },
        color:['#ff9d00','#fb7a53','#0fa2f2','#00c199'],
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['餐饮','酒店','交通','其他'],
                axisLine : {
                    lineStyle:{
                        color:'#666'
                    },
                },
                axisTick:{
                    show:false,
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '（收入）',
                nameTextStyle : {
                    fontSize : 12,
                },
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
            }
        ],
        series : [
            {
                name:'少年宫',
                type:'bar',
                data:[1000, 1500, 7000, 6000],
            },
            {
                name:'甲午岩',
                type:'bar',
                data:[2000, 500, 1000, 5000],
            },
            {
                name:'帽雨沙',
                type:'bar',
                data:[1500, 5000, 2000, 4000],
            },
            {
                name:'浪通门',
                type:'bar',
                data:[2000, 4000, 1000, 6000],
            }
        ]
    };

    variousScenicChart.setOption(variousScenicChartOption);
})
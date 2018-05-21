$(function(){
    var foodOrderChart = echarts.init(document.getElementById('food-order-chart'));

    var foodOrderChartOption = {
        tooltip : {
            trigger: 'axis',
            backgroundColor:'#fff',
            borderColor:'#b7e2ff',
            borderWidth:1,
            textStyle:{
                color:'#3298dc',
                align:'center',
                fontSize:12
            },
            axisPointer:{
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(183,226,255,0.3)',
                    width: 'auto',
                    type: 'default'
                }
            },
            formatter:'{b} <br/> 订单人数 <br/> {c}',
        },
        legend: {
            data:['订单数量'],
            x : 240,
            y : 20,
            textStyle :{
                fontSize : 14,
                color : '#666'
            }
        },
        calculable : true,
        grid: {
            x:60,
            y:76,
            x2:40,
            y2:80,
            borderColor : '#e5e5e5'
        },
        color:['#b7e2ff'],
        xAxis : [
            {
                type : 'category',
                data : ['饿了么','美团外卖','淘点点','百度外卖','到家美食会'],
                axisLabel:{
                    textStyle:{
                        fontSize:14,     //刻度大小
                        color:"#666",
                    },
                },
                axisLine : {
                    lineStyle:{
                        color:"#666",
                    }
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '人数',
                nameTextStyle : {
                    fontSize : 14,
                },
                axisLabel:{
                    textStyle:{
                        fontSize:14,  //刻度大小
                        color:"#666",
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
        series : [
            {
                name:'订单数量',
                type:'bar',
                data:[30, 35, 22, 40, 57],
                barWidth:40,
                itemStyle:{
                    normal: {
                        barBorderWidth:1,
                        barBorderColor:'#3298dc'
                    },
                    emphasis: {

                    }
                }
            }
        ]
    };

    foodOrderChart.setOption(foodOrderChartOption);
})
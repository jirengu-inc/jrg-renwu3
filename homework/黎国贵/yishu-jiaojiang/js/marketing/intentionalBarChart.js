$(function(){
    var intentionalBarChart = echarts.init(document.getElementById('intentional-bar-chart'));

    var intentionalBarChartOption = {
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
            formatter:'{b} <br/> 来源人数 <br/> {c}',
        },
        legend: {
            data:['游客数量'],
            x : 240,
            y : 20,
            textStyle :{
                fontSize : 12,
                color : '#666'
            }
        },
        calculable : true,
        grid: {
            x:65,
            y:60,
            x2:44,
            y2:44,
            borderColor : '#e5e5e5'
        },
        color:['#b7e2ff'],
        xAxis : [
            {
                type : 'category',
                data : ['江苏','宁波','北京','杭州','上海'],
                axisLabel:{
                    textStyle:{
                        fontSize:12,     //刻度大小
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
                    fontSize : 12,
                },
                axisLabel:{
                    textStyle:{
                        fontSize:12,  //刻度大小
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
                name:'游客数量',
                type:'bar',
                data:[30, 35, 22, 40, 57],
                barWidth:30,
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

    intentionalBarChart.setOption(intentionalBarChartOption);
})
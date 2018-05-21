$(function(){
    var toolsAppBoarderChart = echarts.init(document.getElementById('tools-app-boarder-chart'));

    var toolsAppBoarderChartOption = {
        tooltip : {
            trigger: 'axis',
            backgroundColor:'#fff',
            borderColor:'#b7e2ff',
            borderWidth:1,
            textStyle:{
                color:'#3298dc',
                align:'center',
                fontSize:14
            },
            axisPointer:{
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(183,226,255,0.3)',
                    width: 'auto',
                    type: 'default'
                }
            },
            formatter:'{b} <br/> 安装数量 <br/> {c}',
        },
        calculable : true,
        grid: {
            x:100,
            y:40,
            x2:83,
            y2:50,
            borderColor : '#e5e5e5'
        },
        color:['#b7e2ff'],
        xAxis : [
            {
                type : 'category',
                data : ['艺龙','途家','住哪','百酷'],
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
                name : '安装人数',
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
                name:'住宿类',
                type:'bar',
                data:[30, 35, 22, 50],
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

    toolsAppBoarderChart.setOption(toolsAppBoarderChartOption);
})
$(function(){
    var travelDateChart = echarts.init(document.getElementById('travel-date-chart'));

    var travelDateChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        grid: {
            x:100,
            y:74,
            x2:86,
            y2:118,
            borderColor : '#e5e5e5'
        },
        color:['#00c199'],
        xAxis : [
            {
                type : 'category',
                data : ['春节','元旦','清明','五一','端午','中秋','国庆','周末','工作日','其他(节假日)'],
                axisLabel:{
                    textStyle:{
                        fontSize:18,     //刻度大小
                        color:"#666",
                    },
                    margin:20,
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
                name : '（百分比）',
                nameTextStyle : {
                    fontSize : 16,
                },
                axisLabel:{
                    textStyle:{
                        fontSize:16,  //刻度大小
                        color:"#434343",
                    },
                    interval:3,
                    formatter:'{value}%',
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
                name:'百分比',
                type:'bar',
                data:[30, 35, 22, 40, 57, 77, 50, 16, 32, 10],
                barWidth:40,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                    ],
                },

            }
        ]
    };

    travelDateChart.setOption(travelDateChartOption);
})
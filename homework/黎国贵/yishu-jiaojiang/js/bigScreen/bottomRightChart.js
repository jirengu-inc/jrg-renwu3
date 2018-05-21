$(function(){
    var bottomRightChart = echarts.init(document.getElementById('bottom-right-chart'));

    var bottomRightChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['东停车场','西停车场','南停车场','北停车场'],
            x : 100,
            y : 20,
            itemWidth:20,
            itemHeight:12,
            itemGap: 30,
            textStyle:{
                fontSize : 14,
                color:'#fff'
            },
        },
        grid: {
            x:70,
            y:80,
            x2:60,
            y2:60,
            borderColor : '#e5e5e5'
        },
        calculable : true,
        color:['#ff9d00','#fb7a53','#0fa2f2','#00c199'],
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine : {
                    show:false,
                },
                axisTick:{
                    show:false,
                },
                axisLabel:{
                    textStyle:{
                        fontSize:14,  //刻度大小
                        color:'#fff',
                    },
                    margin:20,
                },
                data : ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']
            }
        ],
        yAxis : [
            {
                name : '指数',
                nameTextStyle : {
                    fontSize : 14,
                    color:'#fff',
                },
                splitLine:{
                	lineStyle:{
                		color:'#213056',
                	},
                },
                axisLine : {
                    show:false,
                },
                axisTick:{
                    show:false,
                },
                axisLabel:{
                    textStyle:{
                        fontSize:14, //刻度大小
                        color:'#fff',
                    },
                    margin:18,
                    formatter:'{value}%',
                },
                type : 'value'
            }
        ],
        series : [
            {
                name:'东停车场',
                type:'line',
                symbol:'circle',
                symbolSize:8,
                data:[50, 70, 35, 20, 90, 30, 80, 10]
            },
            {
                name:'西停车场',
                type:'line',
                symbol:'circle',
                symbolSize:8,
                data:[10, 12, 91, 34, 0, 33, 30, 12]
            },
            {
                name:'南停车场',
                type:'line',
                symbol:'circle',
                symbolSize:8,
                data:[20, 72, 11, 24, 50, 40, 20, 30]
            },
            {
                name:'北停车场',
                type:'line',
                symbol:'circle',
                symbolSize:8,
                data:[40, 82, 21, 14, 42, 42, 12, 30]
            }
        ]
    };

    bottomRightChart.setOption(bottomRightChartOption);
})

/*
tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['东停车场','西停车场'],
            x : 340,
            y : 20,
            itemGap: 48,
            itemWidth:20,
            itemHeight:12,
            textStyle:{
                fontSize : 14,
                color:'#fff'
            },
        },
        grid: {
            x:80,
            y:70,
            x2:50,
            y2:50,
            borderColor : '#e5e5e5'
        },
        color:['#15c0ff','#7d3cf4'],
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'],
                axisLabel:{
                    textStyle:{
                        fontSize:14,  //刻度大小
                        color:"#fff",
                    }
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
                name : '指数',
                nameTextStyle : {
                    fontSize : 14,
                    color:'#fff',
                },
                axisLabel:{
                    textStyle:{
                        fontSize:14,  //刻度大小
                        color:"#fff",
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
                name:'东停车场',
                type:'bar',
                data:[20, 30, 40, 20,10, 80, 35, 50],
                barGap:0
            },
            {
                name:'西停车场',
                type:'bar',
                data:[60, 80, 5, 10,15, 30, 40, 90],
            },
        ]
        */
        
         /*
         tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['东停车场','西停车场','南停车场','北停车场'],
            x : 100,
            y : 20,
            itemWidth:20,
            itemHeight:12,
            itemGap: 30,
            textStyle:{
                fontSize : 14,
                color:'#fff'
            },
        },
        grid: {
            x:50,
            y:80,
            x2:70,
            y2:60,
            borderColor : '#e5e5e5'
        },
        calculable : true,
        color:['#ff9d00','#fb7a53','#0fa2f2','#00c199'],
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine : {
                    lineStyle : {
                        color : '#fff'
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:14  //刻度大小
                    }
                },
                data : ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']
            }
        ],
        yAxis : [
            {
                name : '指数',
                nameTextStyle : {
                    fontSize : 14,
                },
                axisLine : {
                    lineStyle : {
                        color : '#fff'
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:14, //刻度大小
                        color:'#fff',
                    },
                },
                type : 'value'
            }
        ],
        series : [
            {
                name:'东停车场',
                type:'line',
                symbol:'circle',
                symbolSize:8,
                data:[120, 132, 101, 134, 90, 230, 800, 120]
            },
            {
                name:'西停车场',
                type:'line',
                symbol:'circle',
                symbolSize:8,
                data:[10, 182, 191, 234, 0, 330, 310, 120]
            },
            {
                name:'南停车场',
                type:'line',
                symbol:'circle',
                symbolSize:8,
                data:[20, 112, 111, 244, 110, 100, 200, 310]
            },
            {
                name:'北停车场',
                type:'line',
                symbolSize:8,
                data:[40, 82, 201, 104, 42, 420, 120, 300]
            }
        ]
          */
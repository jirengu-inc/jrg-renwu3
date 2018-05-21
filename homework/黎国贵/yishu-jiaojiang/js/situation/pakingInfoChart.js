$(function() {
    var pakingInfoChart = echarts.init(document.getElementById('paking-info-chart'));

    var pakingInfoChartOption = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['2011年', '2012年']
        },
        calculable : true,
        xAxis : [
            {
                type : 'value',
                boundaryGap : [0, 0.01]
            }
        ],
        yAxis : [
            {
                type : 'category',
                data : ['巴西','印尼','美国','印度','中国','世界人口(万)']
            }
        ],
        series : [
            {
                name:'2011年',
                type:'bar',
                data:[18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name:'2012年',
                type:'bar',
                data:[19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };

    pakingInfoChart.setOption(pakingInfoChartOption);
})

$(function() {
    var hardwareVideoChart = echarts.init(document.getElementById('hardware-video-chart'));

    var hardwareVideoChartOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 162,
            y: 285,
            itemWidth: 30,
            itemHeight: 12,
            itemGap: 48,
            data: ['已用视频', '未使用视频', '故障视频'],
            textStyle: {
                fontSize: 14,
                color: '#666'
            },
        },
        calculable: true,
        color: ['#f6b61c', '#00c199', '#78e7e6'],
        series: [
            {
                name: '电源消耗比例',
                type: 'pie',
                radius: [65, 117],
                center: [348, 146],
                clockWise: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: '{d}%',
                            position: 'left',
                        },
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: '{d}%',
                            position: 'center',
                            textStyle: {
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                    }
                },
                data: [
                    {value: 500, name: '已用视频'},
                    {value: 315, name: '未使用视频'},
                    {value: 135, name: '故障视频'},
                ]
            }
        ]
    };

    hardwareVideoChart.setOption(hardwareVideoChartOption);
})
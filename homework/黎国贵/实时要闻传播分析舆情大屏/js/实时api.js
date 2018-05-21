
//查询微博分析结果
    $.ajax({
        url: 'http://localhost:4000/api/getWeiboAnalysisResult',
        type: 'get',
        dataType: 'jsonp',
        data: {
            id : 559
        },
        success: function (data) {
            console.log(data);
        },
        error: function () {

        }
    });

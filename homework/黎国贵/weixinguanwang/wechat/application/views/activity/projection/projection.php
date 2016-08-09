<!-- <!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>六度盒子</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="六度盒子">
    <meta name="author" content="六度盒子">
    <link rel="shortcut icon" href="img/icon.png">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

</head> -->
<?php
    function myPretreat($str){
        $str=str_ireplace('[','',$str);
        $str=str_ireplace(']','',$str);
        $str=str_ireplace('"','',$str);
        return $str;
    }
    $ANumber=$numbers['ANumber'];
    $WNumber=$numbers['WNumber'];
    $VNumber=$numbers['VNumber'];
    $location=myPretreat($project['location']);
    $phase=myPretreat($project['phase']);
    $fields=myPretreat($project['fields']);
    echo "<script>
     var ANumber=$ANumber;
     var WNumber=$WNumber;
     var VNumber=$VNumber;
     var replies=$replies;
     </script>";
?>

<img class="bg" src="http://120.27.131.167/src/projection/img/bg.png" style="opacity: 0.1;" >
<div class="container" id="project_VM" >
    <img src=<?php echo $project['icon']; ?> style="width: 100px;height: 100px;border-radius: 20px;position: absolute;top:30px;left: 60px;z-index: 1">
    <div class="col-md-8 left">
        <div class="col-md-12 top">
            <div style="margin-left: 100px">
            <h2 style="margin-top: 30px;"><?php echo $project['projectName']; ?></h2>
            <h4><?php echo $project['describe']; ?></h4>
            <div class="intro">
            <p style="float: left"><span class="glyphicon glyphicon-time"></span><?php echo $phase; ?></p>
            <p style="float: left;"><span class="glyphicon glyphicon-map-marker" style="margin-left: 10px"></span><?php echo $location; ?></p>
            <p><span class="glyphicon glyphicon-bookmark" style="margin-left: 10px"></span><?php echo $fields; ?></p>
            </div>
            <div class="row">
                <div class="col-md-4 sz" style="text-align: left"><h1 class="guanzhu">{{ANumber}}</h1><p>关注</p></div>
                <div class="col-md-4 sz" style="text-align:left"><h1 class="zhide">{{VNumber}}</h1><p>值得投</p></div>
                <div class="col-md-4 sz" style="text-align: left"><h1 class="hetou">{{WNumber}}</h1><p>想合投</p></div>
            </div>
            </div>
        </div>
        <div class="col-md-12 bottom">
            <div style="margin-left: 100px">
                <p style="margin-top: 30px">项目动态</p>
                <div class="scroll1">
                    <div class="dtbox">
                        <p class="leftword">{{item.date}}</p>
                        <p class="square"></p>
                        <p class="line"></p>
                        <div class="dtbox2">
                            <img class="dongtaiimg" src="{{item.icon}}">
                            <p class="dongtaiid">{{item.userName}}</p>
                            <p class="dongtaiifo">{{item.operation}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 right" v-for="item in replies">
        <p style="margin-top: 30px">项目讨论</p>
        <div class="scroll">
            <div class="col-md-12 rtbx">
                <img class="rtimg" src="{{item.icon}}">
                <div class="rtifo">
                    <p class="id">{{item.userName}}</p>
                    <p class="time">{{item.time}}</p>
                </div>
                <p class="ifo">{{item.content}}</p>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    var project_vm = new Vue({
        el:'#project_VM',
        data:{
            ANumber:0,
            WNumber:0,
            VNumber:0,
            replies:replies
            // operations:operationsArray
        }
    });
    $(document).ready(function() { 
        var int=self.setInterval("getData()",5000000);
        function getData(){
            $.ajax({
                type:"POST",
                url:"/wechat/index.php/activity/getProjectionData",
                // data:{pid:<?php //echo $project['projectId']; ?>,aid:<?php //echo $aid; ?>},
                error: function(){  
                    alert('获取数据失败！(Err:P-1)');
                },
                success: function(data,status){//如果调用php成功
                    if (data=='err') {
                        alert('获取数据失败！(Err:P-2)'); 
                        return;
                    }
                    var realData=eval(data);
                    project_vm.ANumber=realData.ANumber;
                    project_vm.WNumber=realData.WNumber;
                    project_vm.VNumber=realData.VNumber;
                    tempR=eval(realData.replies);
                    tempO=eval(realData.operations);
                    for (var i = project_vm.replies.length - 1; i >= 0; i--) {
                        project_vm.replies.pop();
                    }
                    for (var i = tempR.length - 1; i >= 0; i--) {
                        project_vm.replies.push(tempR[i]);
                    }
                    //更新评论
                    for (var i = project_vm.operations.length - 1; i >= 0; i--) {
                        project_vm.operations.pop();
                    }
                    for (var i = tempO.length - 1; i >= 0; i--) {
                        project_vm.replies.push(tempO[i]);
                    }
                    //更新操作
                }
            });
        }
    }); 
</script>

<link rel="shortcut icon" href="http://120.27.131.167/src/projection/img/icon.png">
<!-- <script src="http://120.27.131.167/src/projection/js/add.js"></script> -->
<link rel="stylesheet" href="http://120.27.131.167/src/projection/css/style.css">
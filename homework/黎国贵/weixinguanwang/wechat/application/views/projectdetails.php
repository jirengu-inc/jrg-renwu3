<?php
    // var_dump($project);
    $replies=json_decode($project['replies']);
?>

<div class="banner" style="background: linear-gradient(150deg,#47334f,#8db0b0);">
    <p style="padding-top: 20px">项目详情</p>
    <div class="project">
        <img class="icon" src=<?php echo $project['icon']; ?>>
        <p class="projectname"><?php echo $project['projectName']; ?></p>
    </div>
    <div class="container">
    <div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 bannerbt">
        <div class="col-lg-12 col-xs-3 col-sm-3 col-md-3"><img src="http://120.27.131.167/项目详情/img/zhidetou.png" class="bnrimg"><p>值得投</p><p>(6)</p></div>
        <div class="col-lg-12 col-xs-3 col-sm-3 col-md-3"><img src="http://120.27.131.167/项目详情/img/hetou.png" class="bnrimg"><p>想合投</p><p>(6)</p></div>
        <div class="col-lg-12 col-xs-3 col-sm-3 col-md-3"><img src="http://120.27.131.167/项目详情/img/pinglun.png" class="bnrimg"><p>讨论</p><p>(6)</p></div>
        <div class="col-lg-12 col-xs-3 col-sm-3 col-md-3"><div style="width: 110px;border: solid 1px white;border-radius: 10px;text-align: center;padding: 5px 0 5px 0;position:relative;top:-5px;">关注</div></div>
    </div>
    </div>
</div>
<div >
    <div class="container">
<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 laber" >
    <img src="http://120.27.131.167/项目详情/img/descri.png" style="float: left">
    <div class="intro" style="position: relative;">六度盒子是一款专为投资人服务的社交APP。
        我们正试图以一种更加简单的方式，打破投资行业的信息鸿沟，
        加速投资效率。
    </div>
</div>
<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 laber">
    <img src="http://120.27.131.167/项目详情/img/jieduan.png" style="float: left;">
    <div class="state" style="position: relative;top:5px">已上线</div>
</div>
<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 laber" >
    <img src="http://120.27.131.167/项目详情/img/didian.png" style="float: left">
    <div class="loc" style="position: relative;top:5px">杭州</div>
</div>
<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 laber" style="border: none">
    <img src="http://120.27.131.167/项目详情/img/lingyu.png" style="float: left">
    <div class="lingyu" style="float: left;position: relative;top:5px">投资创投</div>
    <div class="lingyu" style="float: left;position: relative;top:5px">移动社交</div>
    <div class="lingyu" style="position: relative;top:5px">咨询服务</div>
</div>
<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 xiangqing" style="margin-bottom: 10px" >
    <div class="labercl"></div>
    <p style="position: absolute;top:0;margin-top: 4px">项目详情</p>
    <div><?php echo $project['details']; ?></div>
</div>
<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 faburen" style="margin-bottom: 10px" >
    <div class="labercl"></div>
    <p style="position: absolute;top:0;margin-top: 4px">项目发布人</p>
    <div>
        <img class="psnicon">
        <div style="left: 20px;position: relative">
        <p class="id"><?php echo $project['userName']; ?></p>
            <div class="glyphicon glyphicon-menu-right" style="position: absolute;top:10px;right:15px;font-size: 45px" ></div>
        <p class="time"><?php echo date('m-d H:i:s',$project['timeStamp']); ?></p>
        </div>

    </div>
</div>
<div  class="col-lg-12 col-xs-12 col-sm-12 col-md-12 tuijian" style="margin-bottom: 10px" >

    <div class="labercl"></div>
    <p style="position: absolute;top:0;margin-top: 4px">项目推荐</p>
    <div>
        <img class="psnicon" >
        <div style="left: 20px;position: relative">
        <p class="tjid" >吴斌</p>
        <p class="tag">著名投资人</p>
        </div>
        <p class="tjneirong"><?php echo $project['recommendReason']; ?></p>
    </div>
</div>
<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12 pinglunnr" style="margin-bottom: 10px" >
    <div class="labercl"></div>
    <p style="position: absolute;top:0;margin-top: 4px">评论</p>
    <?php foreach ($replies as $item): ?>
        <div class="plbox">
            <img class="psnicon">
            <div style="left: 20px;position: relative">
            <p class="plid" ><?php echo $item->commenterName; ?></p>
            <p class="pltime"><?php echo date('m-d H:i:s',$item->timeStamp); ?></p>
            </div>
            <p class="plneirong">针对投资领域的社会场景切针对投资领域的社会场景切分针对投资领域的社会场景切分针对投资领域的社会场景切分针对投资领域的社会场景切分针对投资领域的社会场景切分分</p>
        </div>
    <?php endforeach; ?>
</div>
    </div>
</div>
<link rel="stylesheet" href="http://120.27.131.167/项目详情/css/style.css">
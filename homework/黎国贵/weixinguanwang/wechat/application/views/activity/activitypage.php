<meta name="viewport" content="target-densitydpi=device-dpi,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0, user-scalable=no">
<link href="http://cdn.bootcss.com/weui/0.4.3/style/weui.min.css" rel="stylesheet">
<?php 
	echo "<script> var projects=eval($projList);</script>";
	$_SESSION['userId']="";
	$_SESSION['token']="";
	if(is_array($_GET)&&count($_GET)>0)//先判断是否通过get传值了
    {
        if(isset($_GET['userId']))//是否存在"id"的参数
        {
            $_SESSION['userId']=$_GET["userId"];//存在
        }
    }
?>
<!-- 获取projectList -->
<div id="Abanner" style="height: 200px;position: fixed;top: 0px;z-index: 2">
	<img src="{{BkgUrl}}" width="100%" height="200px" style="z-index: 0;">
	<div style="position: relative;top:-200px;width:100%;height:200px;background-color: black;opacity: 0.3;z-index: 1;" ></div>
	<div id="Activity" style="position: relative;top:-325px;z-index: 2;font-size: 50px;font-weight: bold;color: white;" align="center"><?php echo $state; ?></div>
</div>
<!-- 活动名称和banner -->

<script type="text/javascript">
	var Banner_vm = new Vue({
	  el: '#Abanner',
	  data:{
	  	BkgUrl:'http://pic1.desk.chinaz.com/file/11.07.10/9/fengjingbz20.jpg'
	  }
	})
</script>
<div id="navBar" style="width: 100%;position: fixed;top: 200px;z-index: 1;">
	<ul class="nav navbar-nav nav-inner" style="list-style: none;box-shadow: 0px 0px 10px #d7d7d7;margin-top: 0;padding-top: 0;border-style: none;width: 100%;margin-left: 0;">
	  <li class="col-md-4 col-xs-4" align="center" style="padding-right: 0;padding-left:0 ; "><a id="nav1" onclick="navChoosen(1)" style="color: #666666;background-color: white;">活动简介</a></li>
	  <li class="col-md-4 col-xs-4" align="center" style="padding-right: 0;padding-left: 0;"><a id="nav2" onclick="navChoosen(2)" style="background-color: white;">路演项目</a></li>
	  <li class="col-md-4 col-xs-4" align="center" style="padding-left: 0;padding-right: 0;"><a id="nav3" onclick="navChoosen(3)" style="color: #666666;background-color: white;">活动成员</a></li>
	</ul>
</div>
<!-- 活动首页的导航栏 -->
<div id="container">
	<div  v-show="target==0">
		<div id="projectlist">
			<div v-for="item in items" class="projectItem" id="{{item.projectId+'Target'}}">
				<!-- 把整个div链接至项目详情页 -->
				
				<img src={{item.icon}} style="float:left;margin-left: 20px;margin-top: 20px;border-radius:5px;" width="40px" height="40px"/>
			
				<div v-if="" v-on:click="Attention($index,true)" style="font-size: 8px;width: 65px;height: 24px;color: white;background-color: #2cba15;border-style: none;margin:20px 20px auto auto;text-align: center;border-radius: 1.5px;" align="center"><label style="margin-top: 3px;">关注</label></div>
				<div v-else v-on:click="Attention($index,false)" style="font-size: 8px;width: 65px;height: 24px;color: white;background-color: #666666;border-style: none;float: right;margin:20px 20px auto auto;border-radius: 1.5px;" align="center"><label style="margin-top: 3px;">已关注</label></div>

				<div style="padding-top: 20px;margin-left: 70px;">
					<div style="font-size:18px;font-weight:bold;">{{item.projectName}}</div>
					<div style="margin-top: 3px; font-size: 16px;">{{item.describe}}</div>
					<div style="margin-top: 10px;font-size: 12px;color: #999999;"><img src="http://120.27.131.167/icon/项目阶段.png" width="10px" height="10px">&nbsp&nbsp&nbsp&nbsp{{item.phase}}</div>
					<div style="margin-top: 10px;margin-bottom: 10px;font-size: 12px;color: #999999;"><img src="http://120.27.131.167/icon/项目地点.png" width="10px" height="10px">&nbsp&nbsp&nbsp&nbsp{{item.location}}</div>

					<img src="http://120.27.131.167/icon/项目领域.png" width="10px" height="10px">
					<div style="list-style: none;display:inline;font-size: 12px;color: #999999;" v-for="fieldsItem in item.fieldsArray">
							&nbsp&nbsp&nbsp{{fieldsItem}}
					</div>
					<!-- 项目领域标签列表 -->
				</div>

				<div align="center" style="margin-top: 10px;margin-bottom: 10px;font-size: 12px;color: #999999;">
					<div style="border-radius: 3px;border-style:solid;border-width:thin;border-color: #999999;width: 120px;" onclick="location.href='http://127.0.0.1/wechat/index.php/activity/projectDetails/{{item.projectId}}'">
						查看项目详情&nbsp&nbsp&gt
					</div>
				</div>

				<div class="btn-group" style="width: 100%;border-top-style: solid;border-top-width: thin;border-top-color:#EEEEEE;">
					<div class="col-md-4 col-xs-4 missionButton" id="{{item.projectId+'V'}}" v-on:click="updateNumbers(item.projectId,0)" align="center" style="text-decoration: none;color: #3F46F5;">
					<img src="http://120.27.131.167/icon/值得投.png" width="20px" height="20px">&nbsp值得投</div>

					<div class="col-md-4 col-xs-4 missionButton" id="{{item.projectId+'W'}}" v-on:click="updateNumbers(item.projectId,1)" align="center" style="text-decoration: none;color: #3F46F5;">
					<img src="http://120.27.131.167/icon/求合投.png" width="20px" height="20px">&nbsp想合投</div>

					<div class="col-md-4 col-xs-4 missionButton" align="center" style="text-decoration: none;color: #3F46F5;padding-right: 0;padding-left: 0;" data-toggle="modal" data-target="#{{item.projectId+'Modal'}}">
					<img src="http://120.27.131.167/icon/评论.png" width="20px" height="20px">&nbsp项目讨论</div>
					<!-- 讨论弹出框代码 -->
					<div class="weui_dialog_confirm">
					    <div class="weui_mask"></div>
					    <div class="weui_dialog">
					        <div class="weui_dialog_hd"><strong class="weui_dialog_title">弹窗标题</strong></div>
					        <div class="weui_dialog_bd">自定义弹窗内容，居左对齐显示，告知需要确认的信息等</div>
					        <div class="weui_dialog_ft">
					            <a href="#" class="weui_btn_dialog default">取消</a>
					            <a href="#" class="weui_btn_dialog primary">确定</a>
					        </div>
					    </div>
					</div>
<!-- 					<div class="modal fade" id="{{item.projectId+'Modal'}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="margin-top: 250px;">
					    <div class="modal-content">
					        <div class="modal-body">
					            <div align="center">
					            	<p>想合投请输入您的手机号，工作人员会联系您</p>
					            	<input type="text" style="border-style: solid;border-width: thin;border-radius: 5px;width: 90%;height: 40px;border-color: #999999;" id={{item.projectId+'pn'}}><br/><br/>
							        <button type="button" class="btn btn-default" data-dismiss="modal" style="width:40%;" id="{{item.projectId+'MClose'}}">
						            	取消
						            </button>
						            <button type="button" class="btn btn-primary" style="width:40%;" v-on:click="savePhoneNumber(item.projectId)">
						               	确认
						            </button>
					            </div>
					        </div>
					    </div>
					</div> -->
				</div>
			</div>
		</div>
		<div style="color:DarkGray;" align="center"><small>没有更多</small></div>
		<br/>
		<script type="text/javascript">
			for (var i = projects.length - 1; i >= 0; i--){
				var a=eval(projects[i].fields);
				projects[i].fieldsArray=new Array();
				for (var j = a.length - 1; j >= 0; j--){
					projects[i].fieldsArray.push(a[j]);
				}
			}
			var projectList_vm = new Vue({
				el: '#projectlist',
				data: {
				    items: projects
				},
				methods:{
					updateNumbers:function(projectId,type){
						$.ajax({
							type:"POST",
							url:"/wechat/index.php/activity/updateNumbers",
							data:{aid:<?php echo $aid;?>,pid:projectId,type:type,userId:<?php echo "'".$_SESSION['userId']."'"; ?>,token:<?php echo "'".$_SESSION['token']."'";?>},
							error: function(){  
			             		alert('状态更改失败！(Err:I-1)');
			         		},  
			         		success: function(data,status){//如果调用php成功
			         			if (data=='err') {
			         				alert('状态更改失败！(Err:I-2)'); 
			         				return;
			         			}
			         			if (type==0) {
			         				$('#projectId'+'W').css('color','#999999');
			         			}
			         			else if(type==1){
			         				$('#projectId'+'V').css('color','#999999');
			         			}
			         			else{
			         				$('#projectId'+'A').css('color','#999999');
			         			}
			         		}
						});
					},
					savePhoneNumber:function(projectId){
						$.ajax({
							type:"POST",
							url:"/wechat/index.php/activity/savePhoneNumber",
							data:{aid:<?php echo $aid;?>,pid:projectId,phoneNumber:$('#'+projectId+'pn').val(),openid:<?php echo "'".$_SESSION['userId']."'"; ?>},
							error: function(){  
			             		alert('您已经保存手机号，请勿重复操作！');
			         		},  
			         		success: function(data,status){//如果调用php成功
			         			if (data=='err') {
			         				alert('状态更改失败！(Err:I-4)'); 
			         				return;
			         			}
			         			alert('提交成功！请等待工作人员联系！');
			         			$('#'+projectId+'MClose').click();
			         		}
						});
					}
				}
			});
			console.log(projects)
		</script>
	</div>
	<div v-show="target==1" style="margin:auto 10% auto 10%;">
		<?php echo $activities['introduce']; ?>
	</div>
	<div id="participants" v-show="target==2">
		<?php foreach ($participants as $item): ?>
			<div style="width: 100%;">
				<img src=<?php echo $item['icon']; ?> width="40px" height="40px" style="margin-left: 20px;margin-top: 3px" >
				<label style="margin-left: 20px;"><?php echo $item['nickName']; ?></label>
				<hr style="margin-bottom: 7px;margin-top: 10px;" />
			</div>
		<?php endforeach; ?>
		<div style="color:DarkGray;" align="center"><small>没有更多</small></div>
	</div>
</div>

<script type="text/javascript">
	container_vm = new Vue({
		el:'#container',
		data:{
			target:0
		}
	});
	$('#nav1').click(function(){
		container_vm.target=1;
	});
	$('#nav2').click(function(){
		container_vm.target=0;
	});
	$('#nav3').click(function(){
		container_vm.target=2;
	});
</script>

<script type="text/javascript">
	function navChoosen(index)
	{
		$('#nav'+1).css({
			'color':'#666666',
			'border-bottom-style':'none'
		});
		$('#nav'+2).css({
			'color':'#666666',
			'border-bottom-style':'none'
		});
		$('#nav'+3).css({
			'color':'#666666',
			'border-bottom-style':'none'
		});
		$('#nav'+index).css({
			'color':'#3F46F5',
			'border-bottom-style':'solid',
			'border-bottom-color':'#3F46F5',
			'border-bottom-width':'thin'
		});
	}
	$('#nav2').css({
		'color':'#3F46F5',
		'border-bottom-style':'solid',
		'border-bottom-color':'#3F46F5',
		'border-bottom-width':'thin'
	});
</script>
<!-- 定义vm模型 -->

<!-- 定义container离top的距离 -->
<script type="text/javascript">
	$('#container').css('margin-top',(208+ parseInt($('#navBar').css('height')))+'px');
	// console.log(projectList_vm.items)
	<?php 
		if($activities['nowProject']!="NULL"){
			echo "location.hash='#'+'".$activities['nowProject']."'+'Target';";
		}
	?>
</script>

<style type="text/css">
	.projectItem{
		box-shadow: 0px 0px 10px #d7d7d7;
		border-radius:5px;
		margin: 15px 10px 15px 10px;
	}
	.missionButton{
		background-color: white;
		height: 30px;
		margin-top: 10px;
	}
</style>

<?php 
	if ($choosenProjects=='[]') {
		echo "<script>alert('请您先为此活动添加项目！')</script>";
		//redirect('http://127.0.0.1/wechat/index.php/activity/activityManage/' . $activity['aid']);
	}
	echo "<script> 
			var choosenProjects=eval($choosenProjects);
			var numbers=eval($numbers);
			var phoneNumbers=eval($phoneNumbers);
		</script>";
?>
<ol class="breadcrumb">
  <li><a href="http://127.0.0.1/wechat/index.php/manage">活动列表</a></li>
  <li><?php echo $activity['aname']; ?></li>
</ol>
<h2 align="center"><?php echo $activity['aname']; ?></h2>
<div class="col-md-6 col-md-offset-3" style="font-size: 17px;">
	<label>活动状态：</label><input type="checkbox" id="hideOrShow" <?php echo $activity['hideOrShow']?"":"checked"; ?>><br/><br/>
	<label>演示地址：</label><a href=<?php echo $activity['showUrl']; ?>><?php echo $activity['showUrl']; ?></a><br/><br/>
	<label>活动地址：</label><a href=<?php echo $activity['activityUrl']; ?>><?php echo $activity['showUrl']; ?></a><br/><br/>
	<div id="activity">
		<div style="display: inline;" v-if="projects.length>0">
			<button id="prev" type="button" class="btn btn-info col-md-1" style="height:50px;">&lt&lt</button>
			<span align="center" class="col-md-10" style="height:50px;">
				<label>当前项目({{nowRank}}/{{projects.length}})<br/>{{nowProject.projectName}}</label>
			</span>
			<button id="next" type="button" class="btn btn-info col-md-1" style="height:50px;">&gt&gt</button>
		</div>
		<br/><br/><br/>
		<div class="tabbable tabs-left col-md-3">
			<ul id="myTab" class="nav nav-tabs">
			   	<li v-for="project in projects">
			   		<a href="#{{project.projectId+'div'}}" data-toggle="tab" style="font-size: 14px;">{{project.projectName}}</a>
			   	</li>
			</ul>
		</div>
		<div class="tab-content">
			<div v-for="project in projects" id="{{project.projectId+'div'}}" class="tab-pane col-md-offset-3">
				<label class="myWidth">关注：</label>
				<label class="myWidth-num">{{numbers[$index].ANumber}}</label>
				<button type="button" class="btn btn-success btn-sm" v-on:click="increaseNumbers(project.projectId,0,$index)">+1</button>
				<br>


				<label class="myWidth">值得投：</label>
				<label class="myWidth-num">{{numbers[$index].VNumber}}</label>
				<button type="button" class="btn btn-success btn-sm" v-on:click="increaseNumbers(project.projectId,1,$index)">+1</button>
				<br>


				<label class="myWidth">想合投：</label>
				<label class="myWidth-num">{{numbers[$index].WNumber}}</label>
				<button type="button" class="btn btn-success btn-sm" v-on:click="increaseNumbers(project.projectId,2,$index)">+1</button>
				&nbsp&nbsp&nbsp&nbsp
				<input type="checkbox" v-on:change="startOrStopMission(project.projectId)" id="{{project.projectId+'SM'}}" />开启此任务&nbsp&nbsp&nbsp&nbsp
				<button id="{{project.projectId+'R'}}" type="button" class="btn btn-success btn-sm" onclick="">查看结果</button>
				<br/>
				<!-- 查看想合投者的手机号 -->
				<!-- 设为正在进行的任务 -->
				<button type="button" class="btn btn-success btn-sm" v-on:click="startProject(project.projectId)">设为正在进行</button>
				<br/><br/>
				<div>
					<input type="textarea" id="{{project.projectId+'C'}}" class="col-md-10"></input>&nbsp&nbsp
					<!-- 输入评论 -->
					<button type="button" class="btn btn-success" v-on:click="addReply(project.projectId)">发布</button>
					<!-- 评论提交 -->
				</div>
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				   	<div class="modal-dialog">
				      	<div class="modal-content">
				         	<div class="modal-header">
				            	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				            	<h4 class="modal-title" id="myModalLabel">联系列表</h4>
				         	</div>
				         	<div class="modal-body">
				         		<ul>
				         			<li v-for="number in phoneNumbers">
				         				<label v-if="number.projectId==project.projectId">{{number.num}}</label>
				         				<hr/>
				         			</li>
				         		</ul>
				         	</div>
				         	<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				         	</div>
				      	</div><!-- /.modal-content -->
					</div><!-- /.modal -->
				</div>
				<br/>
				<div v-for="reply in project.repliesArray">
					<div v-if="reply.pass!=2">
						[{{reply.message.commenterName}}]&nbsp{{reply.message.content}}
						<span v-if="reply.pass==1" class="pull-right" >
							<button v-on:click="updateReply(project.projectId,reply.message.replyId,$index,2)" type="button" class="btn btn-danger btn-sm">删除</button>
						</span>
						<span v-else class="pull-right">
							<button v-on:click="updateReply(project.projectId,reply.message.replyId,$index,1)" type="button" class="btn btn-success btn-sm">通过</button>
							<button v-on:click="updateReply(project.projectId,reply.message.replyId,$index,0)" type="button" class="btn btn-warning btn-sm">不通过</button>
						</span>
						<hr/>
					</div>
				</div>
				<div style="list-style: none;margin-left: 150px;color:DarkGray;" ><small>没有更多</small></div>
			</div>
		</div>
	</div>
</div>

<!-- 以下是vue.js的vm层初始化以及两个button的js代码 -->
<script type="text/javascript">
	for (var i = choosenProjects.length - 1; i >= 0; i--) {
		choosenProjects[i].repliesArray=new Array();
		if (choosenProjects[i].replies!=='[]') {
			var a=eval(choosenProjects[i].replies);
			for (var j = a.length - 1; j >= 0; j--) {
				var obj={
					message:a[j],
					pass:choosenProjects[i].pass[j]
				}
				choosenProjects[i].repliesArray[j]=obj;
				// 0-null 1-pass 2-unpass
			}
		}
	}
	var act_vm = new Vue({
		el: '#activity',
		data: {
			projects: choosenProjects,
			nowRank:1,
			numbers:numbers
		},
		computed:{
			nowProject:function () {
				return this.projects[this.nowRank-1];
		    }
		},
		methods:{
			updateReply:function(projectId,replyId,index,type){
				$.ajax({
					type:"POST",
					url:"/wechat/index.php/activity/updateReply",
					data:{aid:<?php echo $activity['aid'];?>,rid:replyId,type:type},
					error: function(){  
	             		alert('状态更改失败！(Err:C-1)');
	         		},  
	         		success: function(data,status){//如果调用php成功
	         			if (data=='err') {
	         				alert('状态更改失败！(Err:C-2)'); 
	         				return;
	         			}
	         			for (var i = act_vm.projects.length - 1; i >= 0; i--) {
	         				if(act_vm.projects[i].projectId==projectId){
	         					act_vm.projects[i].repliesArray[index].pass=type==1?1:2;
	         				}
	         			}
	         		}
				});
			},
			increaseNumbers:function(projectId,type,index){
				$.ajax({
					type:"POST",
					url:"/wechat/index.php/activity/increaseNumbers",
					data:{projectId:projectId,type:type,aid:<?php echo $activity['aid'];?>},
					error: function(){  
	             		alert('状态更改失败！(Err:C-3)');  
	         		},  
	         		success: function(data,status){//如果调用php成功
	         			if (data=='err') {
	         				alert('状态更改失败！(Err:C-4)'); 
	         				return;
	         			}
	         			switch(type){
	         				case 0:numbers[index].ANumber++;break;
	         				case 1:numbers[index].VNumber++;break;
	         				case 2:numbers[index].WNumber++;break;
	         			}
	         		}
				});
			},
			addReply:function(projectId,projectName){
				$.ajax({
					type:"POST",
					url:"/wechat/index.php/activity/addReply",
					data:{projectId:projectId,content:$('#'+projectId+'C').val()},
					error: function(){  
	             		alert('发布失败！(Err:C-5)');  
	         		},  
	         		success: function(data,status){//如果调用php成功
	         			if (data=='err') {
	         				alert('发布失败！(Err:C-6)'); 
	         				return;
	         			}
	         			location.reload();
	         		}
				});				
			},
			startOrStopMission:function(projectId){
				$.ajax({
					type:"POST",
					url:"/wechat/index.php/activity/startOrStopMission",
					data:{projectId:projectId,aid:<?php echo $activity['aid'];?>},
					error: function(){  
	             		alert('状态更改失败！(Err:C-7)');  
	         		},  
	         		success: function(data,status){//如果调用php成功
	         			if (data=='err') {
	         				alert('状态更改失败！(Err:C-8)'); 
	         				return;
	         			}
	         			else {
	         				alert(data);
	         			}
	         		}
				});					
			},
			startProject:function(projectId){
				$.ajax({
					type:"POST",
					url:"/wechat/index.php/activity/startProject",
					data:{projectId:projectId,aid:<?php echo $activity['aid'];?>},
					error: function(){  
	             		alert('状态更改失败！(Err:C-9)');  
	         		},  
	         		success: function(data,status){//如果调用php成功
	         			if (data=='err') {
	         				alert('状态更改失败！(Err:C-10)'); 
	         				return;
	         			}
	         			if (data==projectId) {
	         				alert("该项目已经是当前项目，请勿重复设置！");
	         			}
	         			else{
	         				alert("更改成功！");
	         			}
	         		}
				});
			}
		}
	});


	$('#myTab a:first').tab('show');
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		var activeTab = $(e.target).text();
		for (var i = choosenProjects.length - 1; i >= 0; i--) {
			if(choosenProjects[i].projectName==activeTab){
				act_vm.nowRank=i+1;
				return;
			}
		}
	});
	$('#next').on('click',function(){
		if (act_vm.nowRank!=choosenProjects.length) {
			act_vm.nowRank++;
			$('#myTab a:eq('+(act_vm.nowRank-1)+')').tab('show');
		}
	});
	$('#prev').on('click',function(){
		if (act_vm.nowRank!=1) {
			act_vm.nowRank--;
			$('#myTab a:eq('+(act_vm.nowRank-1)+')').tab('show');
		}
	});

	for (var i = choosenProjects.length - 1; i >= 0; i--) {
		if(choosenProjects[i].isMissionStart==1){//这里的isMissionStart是个字符串，需要与1比较一次才行
			$('#'+choosenProjects[i].projectId+'SM').attr("checked","checked");
		}
	}
</script>

<!-- bootstrap switch -->
<link href="http://cdn.bootcss.com/bootstrap-switch/3.3.2/css/bootstrap2/bootstrap-switch.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/bootstrap-switch/3.3.2/js/bootstrap-switch.js"></script>
<script type="text/javascript">
	$('#hideOrShow').bootstrapSwitch({
	    onColor : "info", 
	    offColor : "danger",
    	onText : '已隐藏',
    	offText : '已发布',
    	handleWidth: 80
	});
	$('#hideOrShow').on('switchChange.bootstrapSwitch', function(event, state) {
		$.ajax({
			type:"POST",
			url:"/wechat/index.php/activity/actChangeState",
			data:{id:<?php echo $activity['aid'];?>},
			error: function(){  
         		alert('状态更改失败！(Err:C-6)');  
     		},  
     		success: function(data,status){//如果调用php成功
     		}
		});
	});
</script>
<!-- bootstrap nav tabs, removed by bootstrap3 -->
<style type="text/css">
.tabs-below > .nav-tabs,
.tabs-right > .nav-tabs,
.tabs-left > .nav-tabs {
  border-bottom: 0;
}

.tab-content > .tab-pane,
.pill-content > .pill-pane {
  display: none;
}

.tab-content > .active,
.pill-content > .active {
  display: block;
}

.tabs-below > .nav-tabs {
  border-top: 1px solid #ddd;
}

.tabs-below > .nav-tabs > li {
  margin-top: -1px;
  margin-bottom: 0;
}

.tabs-below > .nav-tabs > li > a {
  -webkit-border-radius: 0 0 4px 4px;
     -moz-border-radius: 0 0 4px 4px;
          border-radius: 0 0 4px 4px;
}

.tabs-below > .nav-tabs > li > a:hover,
.tabs-below > .nav-tabs > li > a:focus {
  border-top-color: #ddd;
  border-bottom-color: transparent;
}

.tabs-below > .nav-tabs > .active > a,
.tabs-below > .nav-tabs > .active > a:hover,
.tabs-below > .nav-tabs > .active > a:focus {
  border-color: transparent #ddd #ddd #ddd;
}

.tabs-left > .nav-tabs > li,
.tabs-right > .nav-tabs > li {
  float: none;
}

.tabs-left > .nav-tabs > li > a,
.tabs-right > .nav-tabs > li > a {
  min-width: 74px;
  margin-right: 0;
  margin-bottom: 3px;
}

.tabs-left > .nav-tabs {
  float: left;
  margin-right: 19px;
  border-right: 1px solid #ddd;
}

.tabs-left > .nav-tabs > li > a {
  margin-right: -1px;
  -webkit-border-radius: 4px 0 0 4px;
     -moz-border-radius: 4px 0 0 4px;
          border-radius: 4px 0 0 4px;
}

.tabs-left > .nav-tabs > li > a:hover,
.tabs-left > .nav-tabs > li > a:focus {
  border-color: #eeeeee #dddddd #eeeeee #eeeeee;
}

.tabs-left > .nav-tabs .active > a,
.tabs-left > .nav-tabs .active > a:hover,
.tabs-left > .nav-tabs .active > a:focus {
  border-color: #ddd transparent #ddd #ddd;
  *border-right-color: #ffffff;
}

.tabs-right > .nav-tabs {
  float: right;
  margin-left: 19px;
  border-left: 1px solid #ddd;
}

.tabs-right > .nav-tabs > li > a {
  margin-left: -1px;
  -webkit-border-radius: 0 4px 4px 0;
     -moz-border-radius: 0 4px 4px 0;
          border-radius: 0 4px 4px 0;
}

.tabs-right > .nav-tabs > li > a:hover,
.tabs-right > .nav-tabs > li > a:focus {
  border-color: #eeeeee #eeeeee #eeeeee #dddddd;
}

.tabs-right > .nav-tabs .active > a,
.tabs-right > .nav-tabs .active > a:hover,
.tabs-right > .nav-tabs .active > a:focus {
  border-color: #ddd #ddd #ddd transparent;
  *border-left-color: #ffffff;
}

.myWidth{
	width: 68px;
	height: 25px;
}

.myWidth-num{
	width: 40px;
	height: 25px;
}
</style>
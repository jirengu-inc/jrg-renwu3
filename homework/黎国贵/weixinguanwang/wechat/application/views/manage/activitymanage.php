<?php 
	echo "<script> 
			var allProjects=eval($allProjects); 
			var choosenProjects=eval($choosenProjects);
			var act=eval($activity);
		</script>";
?>
<ol class="breadcrumb">
  <li><a href="http://127.0.0.1/wechat/index.php/manage">活动列表</a></li>
  <li><script type="text/javascript">document.write(act.aname)</script></li>
</ol>
<h1 align="center">活动详情</h1>
<div id="activity" class="col-md-6 col-md-offset-3">
	<?php 
		$err=validation_errors();
		if($err)
			echo "<script>alert(" . validation_errors() . ")<script>";
	?>

	<?php echo form_open('activity/updateActivity','class="form-inline"'); ?>
	
		<div>
			<!--h1>{{activityName}}</h1-->
			<label>活动名称：</label>
			<input style="display: none;" id="aid_input" name="aid" type="text" value="{{activity.aid}}" />
			<!-- 用来传递aid -->
			<input type="text" name="aname" value="{{activity.aname}}" class="form-control" /><br/><br/>

			<div id="container">
				<label>图片900*500：</label><br/>
				<input class="form-control" id="fileinfo1" style="width: 500px"></input><br/>
		        <a class="btn btn-default btn-info" id="pickfiles" style="width:160px" href="#" >
		            <i class="glyphicon glyphicon-plus"></i>
		            <span>选择文件</span>
		        </a>

		        <a class="btn btn-default btn-info" id="up_load" style="width:160px" href="#" >
		            <span>确认上传</span>
		        </a>  

		        <a class="btn btn-default btn-success" id="stop_load" style="width:160px" href="#" >
		            <span>暂停上传</span>
		        </a>
		        <input style="display: none;" id="pic95_url" name="pic95_url" type="text" value="{{activity.pic_900_500}}" />
			</div>

			<br/><br/>

			<div id="container2">
				<label>图片200*200：</label><br/>
				<input class="form-control" id="fileinfo2" style="width: 500px"></input><br/>
		        <a class="btn btn-default btn-info" id="pickfiles2" style="width:160px" href="#" >
		            <i class="glyphicon glyphicon-plus"></i>
		            <span>选择文件</span>
		        </a>

		        <a class="btn btn-default btn-info" id="up_load2" style="width:160px" href="#" >
		            <span>确认上传</span>
		        </a>  

		        <a class="btn btn-default btn-success" id="stop_load2" style="width:160px" href="#" >
		            <span>暂停上传</span>
		        </a> 
		        <input style="display: none;" id="pic22_url" name="pic22_url" type="text" value="{{activity.pic_200_200}}"/>
			</div>

			<!-- 图片上传 -->

			<label>活动时间：</label>
			<input type="date" name="adate" value="{{activity.adate}}" class="form-control"><br/><br/>

			<label>活动简介：</label>
			<textarea value="{{activity.introduce}}" class="form-control" style="height: 200px;" name="ainfo"></textarea><br/><br/>

			<label>当前用户：<small>（切换用户前请先保存更改）</small></label><br/>
		</div>
		
		<div>
			<label class="sr-only">当前</label>
			<input type="text" id="targetUserId" name="targetUserId" value="{{userId}}" v-model="userId" class="form-control" style="width: 400px" />
			<button type="button" class="btn btn-info" v-on:click="changeUser()">确定</button>
			<br/><br/>
		</div>

		<div>
			<div>
				<label>活动已选项目：</label>
				<br/>

				<div>
					<select id="selection1" class="form-control" size="12" style="width:250px;">  
						<option v-for="citem in choosenItems" value= "{{$index}}" v-if="citem.projectName!=''">
							{{citem.projectName}}
						</option>   
					</select>
					<input id="projectsJsonData" name="projectsJsonData" style="display: none;" value=<?php echo $choosenProjects; ?> />

					<div class="btn-group btn-group-vertical" style="width: 70px">
						<button type="button" name="moveToChoosen" v-on:click="addProject" class="btn btn-info">
							&lt&nbsp加入
						</button>
						<button type="button" name="moveToAll" v-on:click="removeProject" class="btn btn-info">
							移除&nbsp&gt
						</button>
					</div>

					<select id="selection2" name="selection1" class="form-control" size="12" style="width:250px;" multiple>  
						<option v-for="aitem in allItems" value= "{{$index}}" v-if="aitem.projectName!=''">
							{{aitem.projectName}}
						</option>
					</select>
				</div>
				<br/>
				<button type="button" name="itemUp" class="btn btn-info" v-on:click="upProject" >Up</button>
				<button type="button" name="itemDown" class="btn btn-info" v-on:click="downProject" >Down</button>
			</div>
			<br/>

			<div class="checkbox">
				<label>
					<input type="checkbox" name="option1">只允许现场用户查看项目
				</label>
			</div>
			<br/>

			<div class="checkbox">
				<label>
					<input type="checkbox" name="option2">项目查看即进群
				</label>
			</div>
			<br/>

			<button class="btn btn-info btn-lg col-md-offset-5" type="submit">提交更改</button>

			<br/><br/>
			<br/><br/>
		</div>
	</form>
</div>

<script type="text/javascript">
	if (allProjects.length==0) {
		var nullObj={projectName:''};
		allProjects.push(nullObj);
	}
	if(choosenProjects.length==0){
		var nullObj={projectName:''};
		choosenProjects.push(nullObj);
	}

	var aColor = new Array();
	var cColor = new Array();
	for (var i = 0; i < allProjects.length; i++) {
		aColor[i]='FFFFFF';
	}
	for (var i = 0; i < choosenProjects.length; i++) {
		cColor[i]='FFFFFF';
	}
	var act_vm=new Vue({
  		el: '#activity',
  		data: {
    		allItems:allProjects,
    		choosenItems:choosenProjects,
    		activity:act,
    		aColor:aColor,
    		cColor:cColor,
    		userId:<?php echo "'".$_SESSION['userId']."'"; ?>
  		},
  		methods: {
			changeUser: function () {
				//点击之后获取该用户所有私密项目
				$.ajax({
					type:"POST",
					async:true,
					url:"/wechat/index.php/activity/userPrivateProjects/",
					data:{ownerId:$('#targetUserId').val(),aid:act.aid},
					error: function(){
	             		alert('系统错误！(Err:M-1)');
	         		},  
	         		success: function(data,status){//如果调用php成功 
	         			if(data=="err"){
	         				alert('用户不存在或系统错误！(Err:M-2)');
	         				return;
	         			}
	         			for (var i = act_vm.allItems.length - 1; i >= 0; i--) {
	         				act_vm.allItems.pop();
	         			}
	         			var newAllItems = eval("("+data+")");
	         			for (var i = newAllItems.length - 1; i >= 0; i--) {
	         				act_vm.allItems.push(newAllItems[i]);
	         			}
	         		}
				});
				//获取该用户所有已选中项目
				$.ajax({
					type:"POST",
					async:true,
					url:"/wechat/index.php/activity/userChoosenProjects/",
					data:{ownerId:$('#targetUserId').val(),aid:act.aid},
					error: function(){
	             		alert('系统错误！(Err:M-3)');
	         		},
	         		success: function(data,status){//如果调用php成功 
	         			if(data=="err"||data==''){
	         				alert('用户不存在或系统错误！(Err:M-4)');
	         				return;
	         			}
	         			for (var i = act_vm.choosenItems.length - 1; i >= 0; i--) {
	         				act_vm.choosenItems.pop();
	         			}
	         			var newAllItems = eval("("+data+")");
	         			for (var i = newAllItems.length - 1; i >= 0; i--) {
	         				act_vm.choosenItems.push(newAllItems[i]);
	         			}
	         		}
				});
			},
			upProject:function(){
				var index=$('#selection1').val();
				if (this.choosenItems[index].rank==0)return;
				this.choosenItems[index].rank--;
				this.choosenItems[index].rank++;
				this.choosenItems.sort(function(a,b){return a.rank-b.rank;});
				$("#projectsJsonData").val(JSON.stringify(this.choosenItems));
			},
			downProject:function(){
				var index=$('#selection1').val();
				if (this.choosenItems[index].rank==this.choosenItems.length)return;
				this.choosenItems[index].rank++;
				this.choosenItems[index+1].rank--;
				this.choosenItems.sort(function(a,b){return a.rank-b.rank;});
				$("#projectsJsonData").val(JSON.stringify(this.choosenItems));
			},
			addProject:function(){
				if (this.choosenItems.length==1&&this.choosenItems.projectName=='') {
					this.choosenItems.pop();
				}
				var item=this.allItems[$('#selection2').val()];
				for (var i = this.choosenItems.length - 1; i >= 0; i--) {
					if(this.choosenItems[i].projectId==item.projectId)return;
				}
				this.choosenItems.splice(this.choosenItems.length,0,item);
				this.choosenItems[this.choosenItems.length-1].rank=this.choosenItems.length;
				$("#projectsJsonData").val(JSON.stringify(this.choosenItems));
			},
			removeProject:function(){
				this.choosenItems.splice($('#selection1').val(),1);
				$("#projectsJsonData").val(JSON.stringify(this.choosenItems));
			}
		}
	});
</script>

<?php include 'qiniu.php'; ?>
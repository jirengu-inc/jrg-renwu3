<div style="margin-top: 50px;" class="col-md-8 col-md-offset-2">
	<button class="btn btn-primary" data-toggle="modal" data-target="#myModal">新建活动</button>
	<a href="http://127.0.0.1/wechat/index.php/login" class="btn btn-danger pull-right">重新登陆</a>
	<br/>
	<hr/>
	<?php foreach ($activities as $actItem): ?>
		<!-- -->
		<label style="width: 300px"><?php echo $actItem['aname']; ?></label>
		<span class="pull-right">
			<a class="btn btn-info" role="button" href=<?php echo "activity/activityManage/" . $actItem['aid'] ?>>
				控制台
			</a>
			<a class="btn btn-info" role="button" href=<?php echo "activity/activityControl/" . $actItem['aid'] ?>>
				管理
			</a>
			<button class="btn btn-info" type="button" value=<?php echo $actItem['aid']; ?> 
			id=<?php echo "hos" . $actItem['aid']; ?>>
				<?php echo $actItem['hideOrShow']?"隐藏":"发布"; ?>
			</button>
			<select id=<?php echo "state" . $actItem['aid']; ?>>
				<option value="0" <?php echo $actItem['state']==0?"selected":""; ?> >未开始</option>
				<option value="1" <?php echo $actItem['state']==1?"selected":""; ?> >进行中</option>
				<option value="2" <?php echo $actItem['state']==2?"selected":""; ?> >已结束</option>
			</select>
		</span>
		<hr />
		<script type="text/javascript">
			$(document).ready(function(){
				//这个脚本关联的是发布/隐藏的button，由于每个button要联系一个activity，所以这个脚本也要动态生成
				var target="#"+<?php echo "\"hos" . $actItem['aid'] . "\""; ?>;
				$(target).click(function(){
					$.ajax({
						type:"POST",
						url:"/wechat/index.php/activity/actChangeState",
						data:{id:$(target).attr('value')},
						error: function(){  
		             		alert('状态更改失败！(Err:P-1)');  
		         		},  
		         		success: function(data,status){//如果调用php成功    
							$(target).html(data);
							//alert(data);
		         		}
					});
				});
				var target="#"+<?php echo "\"state" . $actItem['aid'] . "\""; ?>;
				$(target).change(function(){
					$.ajax({
						type:"POST",
						url:"/wechat/index.php/activity/actChangePhase",
						data:{val:$(target).val(),aid:<?php echo $actItem['aid']; ?>},
						error: function(){  
		             		alert('状态更改失败！(Err:P-1)');  
		         		},  
		         		success: function(data,status){//如果调用php成功    
							alert('活动状态更新成功！');
		         		}
					});	
				});
			});	
		</script>
	<?php endforeach; ?>
</div>

<!-- 以下为按下“新建活动”按钮后弹出的对话框中的内容 -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" 
 data-backdrop="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">新建活动</h4>
			</div>
			<div class="modal-body">
				<div id="input" class="form-group">
					<?php echo form_open('activity/createActivity','id="newAct"'); ?>

						<label>活动名称：</label>
						<input type="input" v-model="name_text" v-on:keyup="testStringInput(0)" name="aname" class="form-control" 
						placeholder="30字以内" style="width: 500px;" />
						<small>{{name_input_tip}}</small>
						<br/><br/>

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
					        <input style="display: none;" id="pic95_url" name="pic95_url" type="text"/>
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
					        <input style="display: none;" id="pic22_url" name="pic22_url" type="text"/>
						</div>

						<!-- 图片上传 -->

						<label>活动时间：</label>
						<input type="date" style="width: 500px;" class="form-control" name="adate" 
						value=<?php echo date("Y-m-d"); ?> ></input>
						<br/><br/>

						<label>活动简介：</label>
						<textarea type="input" v-model="info_text" v-on:keyup="testStringInput(1)" name="ainfo" class="form-control"
						placeholder="1000字以内" style="width: 500px;height: 300px;"></textarea>
						<small>{{info_input_tip}}</small>
						<br/><br/>

					</form>
				</div>

			    <?php $err=validation_errors(); ?>
			    <div class="alert alert-warning" style="width: 500px;" <?php echo empty($err)?"hidden":""; ?> >
			        <button type="button" class="close" data-dismiss="alert">&times;</button>
			        <?php echo $err; ?>
			    </div>
			    <!-- 如果没有成功或者输入有误，则提示相应的错误 -->
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					关闭
				</button>
				<button type="submit" class="btn btn-primary" form="newAct">
					提交
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<script type="text/javascript">
	new Vue({
	  el: '#input',
	  data: {
	  	name_text:'',
	    name_input_tip: ''
	  },
	  methods:{
	  	testStringInput:function(target){
	  		switch(target){
	  			case 0:this.name_input_tip=this.name_text.length<=30?"":"字数超过限制！";break;
	  			case 1:this.info_input_tip=this.info_text.length<=1000?"":"字数超过限制！";break;
	  		}
	  	}
	  }
	})
</script>
<?php include 'qiniu.php'; ?>
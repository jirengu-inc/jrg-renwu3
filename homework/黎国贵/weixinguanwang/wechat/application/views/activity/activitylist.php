<h2 align="center">活动列表</h2>
<?php foreach ($activities as $item): ?>
	<div onclick="location.href=<?php echo "'http://120.27.131.167/wechat/index.php/activity/act/".$item['aid']."'"; ?>" style="box-shadow: 10px 10px 10px #d7d7d7;margin-bottom: 10px;">
		<img src=<?php echo $item['pic_900_500']; ?> width="100%" height="200px">
		<p><?php echo $item['aname']; ?></p>
		<label><?php echo "活动时间:".$item['adate']; ?></label>
	</div>
<?php endforeach; ?>
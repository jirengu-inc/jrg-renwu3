<?php
/**
 * @authors WTQ (tianqiaow@gmail.com)
 */
$username = $_POST['username'];
if($username === 'tianqiao'){
	$arr = array('status'=>1, 'msg_type'=>'USERNAME_EXIST');
	echo json_encode($arr);
}
else{
	$arr = array('status'=>0);
	echo json_encode($arr);
}
?>
<?php 
$username=$_GET['username'];
if ($username==='hunger'){
	echo json_encode('true');
}else echo json_encode('false');
 ?>
<?php 

header('Access-Control-Allow-Origin://a.com:8080') 
$data = $_GET['callback'];
 echo $data . '({"name": "Hunter","age":"22"})';/*模仿后台从数据库中得到的数据*/
  ?>

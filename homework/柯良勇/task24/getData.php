<?php 
$start=$_GET['start'];
$len=$_GET['len'];
$arr=[];
for($i=0;$i<$len;$i++){
	array_push($arr,"内容".($start+$i));
}
function JSON($array) {    
	foreach ($array as $key => $value) {
		$array[$key] = urlencode($value);
	} 
	$json = json_encode($array);
	return urldecode($json);
}
echo JSON($arr);
?>
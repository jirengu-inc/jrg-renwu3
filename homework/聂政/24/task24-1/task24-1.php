<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-07 10:19:21
 * @version $Id$
 */
$name = $_GET["name"];
if($name == "nz"){
	$ret = array("sex"=>"男","age"=>"18");
}else if($name == "hunger"){
	$ret = array("sex"=>"男","age"=>"2");
}else {
	$ret = array("sex"=>"女","age"=>"28")
}
echo json_encode($ret);
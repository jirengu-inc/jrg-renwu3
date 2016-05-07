<?php
	$start = $_GET["start"];
    $len = $_GET["len"];
    $content=array();
    for($i=0;$i<$len;$i++){
    	array_push($content,"内容".($start+$len));
    }
    print ($content);
 ?>
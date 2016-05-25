<?php
	$len = $_GET['len'];
	$status = array("code"=>"0");
    $htext = array('Round Icons','Startup Framework','Treehouse','Golden','Escape','Dreams');
    $ptext = array('Graphic Design','Website Design','Website Design','Website Design','Website Design','Website Design');
    $content = array();
    for ($i=0; $i < $len; $i++) {
        $content[$i]= array("liClass"=>'li'.($i+1),"aClass"=>'portfolio-pic'.($i+1),'htext'=>$htext[$i],'ptext'=>$ptext[$i]);
    }
    $arr = array("status"=>$status,'data'=>$content);
    sleep(1);
	echo json_encode($arr);
?>
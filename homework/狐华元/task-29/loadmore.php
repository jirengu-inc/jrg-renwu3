<?php
    $start = $_GET['start'];
    $len = $_GET['len'];
    $items = array();
    for($i = 0; $i < $len; $i++){
        array_push($items, '数据' . ($start+$i));
    }
    $ret = array('status'=>1, 'data'=>$items);
    sleep(0.5);
    echo json_encode($ret);
?>

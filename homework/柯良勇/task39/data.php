<?php
    // 后端 php 测试接口文件
    $start = $_GET['start']; //0
    $len = $_GET['len'];  //3
    $ret = array();
    $data = array(array('url'=>'img/portfolio/roundicons.png','h'=>'Startup Framework','p'=>'Website Design'),
                  array('url'=>'img/portfolio/startup-framework.png','h'=>'Round Icons','p'=>''),
                  array('url'=>'img/portfolio/treehouse.png','h'=>'Startup Framework','p'=>''),
                  array('url'=>'img/portfolio/golden.png','h'=>'Golden','p'=>''),
                  array('url'=>'img/portfolio/escape.png','h'=>'Startup Framework','p'=>'Website Design'),
                  array('url'=>'img/portfolio/dreams.png','h'=>'Escape','p'=>''),
    );
 
    for($i = $start; $i < $len+$start; $i++){
        array_push($ret, $data[$i]);
    };

    echo json_encode($ret);













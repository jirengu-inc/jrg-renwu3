<?php
    
    $timestamp = $_GET['timestamp'];
    $nonce = $_GET['nonce'];
    $token = 'weixin';
    $signature = $_GET['signature'];
    $array = array($timestamp,$nonce,$token);
    sort($array);

    $tmpstr =  implode('',$array);
    $tmpstr = sha1($tmpstr);

    if($tmpstr==$signature){
        echo $_GET['echostr'];
        exit;
    }

<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $title; ?></title>
        <link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    	<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    	<script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
    	<script src="http://cdn.bootcss.com/vue/1.0.0/vue.js"></script>
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    </head>
    <body>
    <?php
        if ($manage&&(!isset($_SESSION['userId'])||$_SESSION['userId']!="17816855125") {
            echo "<script>alert(\"未登录或登陆信息失效！\");</script>";
            $this->load->helper('url');
            redirect('/login', 'refresh');
        }
    ?>
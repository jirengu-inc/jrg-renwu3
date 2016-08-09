<?php
class Login_model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function TestLogin()
    {
        $loginName=$this->input->post('loginName');
        $pwd=md5($this->input->post('pwd'));
        $sourceType=0;
        $clientType=1;
    	$url="http://114.55.54.252:8080/user/login";
    	$postData = array();
    	$postData['sourceType']=$sourceType;
    	$postData['clientType']=$clientType;
    	$postData['loginName']=$loginName;
    	$postData['psw']=$pwd;
        $data=json_decode(curlPost($url,$postData));
        if (!is_object($data)) {
            echo "<script>alert('后端数据库未启动！')</script>";
            exit();
        }
        if ($data->code==200) {
            $_SESSION['userId']=$data->userId;
            $_SESSION['token']=$data->token;
            return true;
        }
        else{
            return false;
        }
    }
}
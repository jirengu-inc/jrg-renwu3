<?php include "curl.php"; ?>
<?php //include 'O2A.php'; ?>
<?php
class Activity_model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    /*-------------- 真正的getUser是从本地数据库进行获取 ---------------*/
    private function getUsers()
    {
    	$user = array('577658f40cf26f1a88a794e6' => '062cc5343c45ffdfa0295c824bc1f6eb');
    	return $user;
    }
    /*-------------- ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊ ---------------*/

    public function getProjects()
    {
    	$user=$this->getUsers();
    	//$user是一个二维数组，保存了id和token
    	foreach($user as $userId=>$token){
			$url="http://114.55.54.252:8080/discover/square/myProjects?userId=$userId&page=0&size=2&token=$token";
			$myProjects=curlGet($url);

			$temp=json_decode($myProjects,TRUE);
			//获取我的项目的json数据（包括message code）

			if($temp['code']!=200){
				$code=$temp['code'];
				echo "<script>alert($code);</script>";
				return $code;
			}
			//判断是否返回成功

			//$tempList=json_decode($temp['result']);
			//获取项目列表的数组(json形式)

			//测试用	
			$tempList = array('57763dea0cf203ff66bf5921','577639310cf203ff66bf591c', '577638a10cf203ff66bf591b' );
			//注意换掉
			
			$count=count($tempList);
			$projectList=array();
			foreach($tempList as $item){
				$projectId=$item;//$item->projectId;
				$url="http://114.55.54.252:8080/discover/square/$projectId?userId=$userId&token=$token";
				$temp=curlGet($url);
				$project=get_object_vars(json_decode($temp));
				if($project['code']!=200){
					$code=$project[$i]['code'];
					echo "<script>alert($code);</script>";
					return $code;
				}
				//判断是否返回成功
                $project['projectId']=$projectId;
				array_push($projectList, $project);
			}
    	}

		return json_encode($projectList);
    }

    // public function getActivities()
    // {
    // 	直接使用另外一个模型的同名函数即可
    // }

    public function getParticipants($aid)
    {
    	$queryStr="select * from act_participants where aid=$aid";
    	return  $this->db->query($queryStr)->result_array();
    }

    public function getProjectDetails($projectId)
    {
        $userId=$_SESSION['userId'];
        $token=$_SESSION['token'];
		$url="http://114.55.54.252:8080/discover/square/$projectId?userId=$userId&token=$token";
		$temp=curlGet($url);
		$project=get_object_vars((json_decode($temp)));
		if($project['code']!=200){
			$code=$project['code'];
			echo "<script>alert($code);</script>";
			return $code;
		}
        return $project;
    }

    public function updateNumbers()
    {
    	$type=$this->input->post('type');
        $projectId=$this->input->post('projectId');
        if ($type==0){
            $postData=array('userId'=>$fuid,'projectId'=>$projectId,'follow'=>true,'token'=>$ftoken,'source'=>$fuid,'sourceType'=>3);
            $url="http://114.55.54.252:8080/discover/square/follow";
            $result=json_decode(curlPost($url,$postData));
        }
        elseif ($type==1) {
            $taskId=$this->db->query("select * from act_proj where aid=$aid and pid='projectId'")->result_array()[0]['taskId1'];
            $data = array('userId'=>$fuid,'taskId'=>$taskId,'worth'=>0,'token'=>$ftoken);
            $url="http://114.55.54.252:8080/task/worthInvest";
            $result=json_decode(curlPut($url,$postData));
        }
        else{
            $taskId=$this->db->query("select * from act_proj where aid=$aid and pid='projectId'")->result_array()[0]['taskId2'];
            $data = array('userId'=>$fuid,'taskId'=>$taskId,'amount'=>0,'worth'=>0,'token'=>$ftoken,'coInvest'=>0);
            $url="http://114.55.54.252:8080/task/coInvestResult";
            $result=json_decode(curlPut($url,$postData));
        }
        if (!is_object($result)||$result->code!=200) {
            echo "err";
        }
    }

    public function savePhoneNumber()
    {
        $phoneNumber=$this->input->post('phoneNumber');
        $aid=$this->input->post('aid');
        $projectId=$this->input->post('pid');
        $openid=$this->input->post('openid');

        $query=$this->db->query("insert into phoneNumber values($aid,'$projectId','$openid','$phoneNumber')");
        if (!$query) {
            echo "err";
        }
    }
}





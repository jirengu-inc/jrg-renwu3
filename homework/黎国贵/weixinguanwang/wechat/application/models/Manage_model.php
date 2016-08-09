<?php
class Manage_model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function getActivities()
    {
    	$query = $this->db->query('select * from activity');
    	return $query->result_array();
    }

    public function getActivity($activityId)
    {
        $query = $this->db->query('select * from activity where aid =' . $activityId)->result_array()[0];
        return json_encode($query);
    }

    public function changeState()
    {
    	$aid=$this->input->post('id');
    	$this->db->query('update activity set hideOrShow=1-hideOrShow where aid = ' . $aid);
    	$query=$this->db->query('select hideOrShow from activity where aid = ' . $aid)->result_array();
    	echo $query[0]['hideOrShow']?"隐藏":"发布";
    }

    public function get7NiuToken()
    {
        $userId=$_SESSION['userId'];
        $token=$_SESSION['token'];
        $url="http://114.55.54.252:8080/qiniu/uptoken?userId=$userId&token=$token";
        $result=json_decode(curlGet($url));
        if (!is_object($result)||$result->code!=200){
            return "err";
        }
        return $result->uptoken;
    }

    public function createAct()
    {
        $aname=$this->input->post('aname');
        $adate=$this->input->post('adate');
        $ainfo=addslashes($this->input->post('ainfo'));
        $pic22=$this->input->post('pic22_url');
        $pic95=$this->input->post('pic95_url');
        $queryStr="insert into activity(aname,adate,pic_200_200,pic_900_500,introduce,showUrl,activityUrl)values('$aname','$adate','$pic22','$pic95','$ainfo','www.baidu.com','www.baidu.com')";
        $query=$this->db->query($queryStr);
        if (!$query) {
            echo "<script>alert('上传失败！Err(PHP):Manage_model.php function createAct')</script>";
        }
        else{
            redirect("activity/manage","refresh");
        }
    }

    private function createVTask($projectId)
    {
        $postData = array('userI' => $_SESSION['userId'],'token'=>$token,'worthValuation'=>0,'worthReason'=>'null', 'sourceType'=>0,'sourceUser'=>$_SESSION['userId']);
        $url="http://114.55.54.252:8080/task/worthInvest";
        $result=json_decode(curlPost($url,$postData));
        var_dump($result);
        if (!is_object($result)||$result->code!=200){
            return "err";
        }
        return $result->taskId;
    }

    private function createWTask($projectId)
    {
        $postData = array('userI' => $_SESSION['userId'],'token'=>$token,'coInvestValuation'=>0,'coInvestFinancingAmount'=>0,'coInvestInstitutionAndAmount'=>0, 'sourceType'=>0,'sourceUser'=>$_SESSION['userId']);
        $url="http://114.55.54.252:8080/task/coInvest";
        $result=json_decode(curlPost($url,$postData));
        var_dump($result);
        if (!is_object($result)||$result->code!=200){
            return "err";
        }
        return $result->taskId;
    }

    public function updateActivity()
    {
        $aid=$this->input->post('aid');
        $aname=$this->input->post('aname');
        $adate=$this->input->post('adate');
        $ainfo=addslashes($this->input->post('ainfo'));
        $pic22=$this->input->post('pic22_url');
        $pic95=$this->input->post('pic95_url');

        $uid=$this->input->post('targetUserId');
        $choosenProjects=json_decode($this->input->post('projectsJsonData'));

        $this->db->query("update act_proj set state=0 where uid='$uid'");

        for ($i=0; $i < count($choosenProjects); $i++) { 
            $projectId=$choosenProjects[$i]->projectId;
            $query=$this->db->query("select * from act_proj where pid='$projectId' and aid=$aid")->result_array();
            if (count($query)==1){
                $query=$this->db->query("update act_proj set state=1 where aid=$aid and pid='$projectId'");
            }
            else {
                $query=$this->db->query("insert into act_proj values('$projectId',$aid,'$uid',1,$i,default);");
                $taskId1=$this->createWTask($projectId);
                $taskId2=$this->createVTask($projectId);

            }
        }

        $queryStr="update activity set aname='$aname',adate='$adate',introduce='$ainfo',pic_200_200='$pic22',pic_900_500='$pic95' where aid=$aid";
        $query=$this->db->query($queryStr);
        if (!$query) {
            echo "<script>alert('更新失败！Err(PHP):Manage_model.php function updateActivity')</script>";
        }
        else{
            echo "<script>alert('更新成功！')</script>";
            redirect("manage",'refresh');
        }
    }

    public function userLocalProjects($aid,$ownerId,$state=1,$needReply=0) 
    {
        $userId=$_SESSION['userId'];
        $token=$_SESSION['token'];
        //$user是一个二维数组，保存了id和token

        if ($userId==$ownerId) {
            $queryStr=$state?"select * from act_proj where aid=$aid and state=1 order by rank":"select * from act_proj where aid=$aid order by rank";
        }
        else{
            $queryStr="select * from act_proj where aid=$aid and uid='$ownerId' and state=1 order by rank";
        }
        $query=$this->db->query($queryStr)->result_array();

        $projectList = array();

        foreach($query as $item){
            $projectId=$item['pid'];
            $url="http://114.55.54.252:8080/discover/square/$projectId?userId=$userId&token=$token";
            $temp=curlGet($url);
            $project=get_object_vars(json_decode($temp));
            if($project['code']!=200){
                $code=$project['code'];
                echo "<script>alert($code);</script>";
                return $code;
            }
            //判断是否返回成功
            $pass = array();
            if ($needReply) {
                $queryStr="select * from act_reply where aid=$aid and pass=";
                $passedReply=$this->db->query($queryStr . '1')->result_array();
                $unpassedReply=$this->db->query($queryStr . '0')->result_array();
                $rReply=$project['replies'];
                for ($i=0; $i < count($rReply); $i++) { 
                    $flag=false;
                    for ($j=0; $j < count($passedReply); $j++) { 
                        if ($rReply[$i]->replyId==$passedReply[$j]['replyId']) {
                            array_push($pass, 1);
                            $flag=true;
                            break;
                        }
                    }
                    if ($flag) {
                        continue;
                    }
                    for ($j=0; $j < count($unpassedReply); $j++) { 
                        if ($rReply[$i]->replyId==$unpassedReply[$j]['replyId']) {
                            array_push($pass, 2);
                            $flag=true;
                            break;
                        }
                    }
                    if ($flag) {
                        continue;
                    }
                    array_push($pass, 0);
                }
            }

            $tempProj = array('projectId' => $item['pid'],
            'projectName' => $project['projectName'],
            'rank' => $item['rank'],
            'replies'=>$project['replies'],
            'pass'=>$pass,
            'isMissionStart'=>$item['isMissionStart']
            );

            array_push($projectList, $tempProj);
        }

        return json_encode($projectList);
    }

    public function userPrivateProjects($aid,$ownerId)
    {
        $userId=$_SESSION['userId'];
        $token=$_SESSION['token'];
        //$user是一个二维数组，保存了id和token
        $url="http://114.55.54.252:8080/discover/square/userPrivateProjects?userId=$userId&ownerId=$ownerId&token=$token";
        $projects=json_decode(curlGet($url));

        if (!is_object($projects)||$projects->code!=200) {
            return "err";
        }

        return json_encode($projects->result);
    }

    // 获得关注/值得投/想合投数据
    public function getNumbers($projectId)
    {
        $userId=$_SESSION['userId'];
        $token=$_SESSION['token'];
        $url="http://114.55.54.252:8080/discover/square/getFollowNum?userId=$userId&projectId=$projectId&token=$token";
        $ANumber=json_decode(curlGet($url))->count;

        /* 
        *此处应该填写获取值得投与想合投数值的代码
        */
        $numbers = array('ANumber' => $ANumber, 'VNumber' => 0 , 'WNumber' => 0);
        return $numbers;
    }

    public function getPhoneNumbers($aid)
    {
        $query=$this->db->query("select * from phoneNumber where aid=$aid")->result_array();
        return json_encode($query);
    }

    public function updateReply()
    {
        $aid=$this->input->post('aid');
        $replyId=$this->input->post('rid');
        if ($this->input->post('type')==0) {
            $queryStr="insert into act_reply values($aid,'$replyId',0)";
        }
        elseif ($this->input->post('type')==1) {
            $queryStr="insert into act_reply values($aid,'$replyId',1)";
        }
        else {
            $queryStr="update act_reply set pass=0 where aid=$aid and replyId='$replyId'";
        }
        $query=$this->db->query($queryStr);
        if (!$query) {
            echo "err";
        }
    }

    private function getFakeUser()
    {
        //随机生成用户
        $index=rand(1,1);
        //以下是获得水军的id和token
        $query=$this->db->query("select * from fakeUser where id=$index")->result_array()[0];
        $url="http://114.55.54.252:8080/user/login";
        $postData = array();
        $postData['sourceType']=0;
        $postData['clientType']=1;
        $postData['loginName']=$query['funame'];
        $postData['psw']=$query['pwd'];
        $data=json_decode(curlPost($url,$postData));
        $data->funame=$postData['loginName'];
        return $data;
    }

    public function addReply()
    {   
        $data=$this->getFakeUser();
        if (!is_object($data)||$data->code!=200) {
            echo "err";
            return;
        }
        $fuid=$data->userId;
        $ftoken=$data->token;
        //调用相应接口更新数据
        $content=$this->input->post('content');
        $projectId=$this->input->post('projectId');
        $userId=$_SESSION['userId'];
        $postData = array('projectId'=>$projectId,'commenterId'=>$fuid,'commenteeId'=>$userId,'content'=>$content,'token'=>$ftoken);
        $url='http://114.55.54.252:8080/discover/square/comment';
        $result=json_decode(curlPost($url,$postData));
        if (!is_object($result)||$result->code!=200) {
            echo "err";
        }
        else{
            $message = array('commenterName' => $data->funame,'content' => $content );
            $data = array('message' => $message, 'pass'=>0);
            echo json_encode($data);
        }
    }

    public function increaseNumbers()
    {
        $data=$this->getFakeUser();
        if (!is_object($data)||$data->code!=200) {
            echo "err";
            return;
        }
        $fuid=$data->userId;
        $ftoken=$data->token;
        //调用相应接口更新数据
        $type=$this->input->post('type');
        $projectId=$this->input->post('projectId');
        $aid=$this->input->post('aid');
        if ($type==0) {
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

    public function startOrStopMission()
    {
        $aid=$this->input->post('aid');
        $projectId=$this->input->post('projectId');
        $query=$this->db->query("update act_proj set isMissionStart=1-isMissionStart where aid=$aid and pid='$projectId'");
        if (!$query) {
            echo "err";
        }
    }

    public function startProject()
    {
        $aid=$this->input->post('aid');
        $projectId=$this->input->post('projectId');
        $query=$this->db->query("update activity set nowProject='$projectId' where aid=$aid");
        if (!$query) {
            echo "err";
        }
    }

    public function actChangePhase()
    {
        $aid=$this->input->post('aid');
        $val=$this->input->post('val');

        $query=$this->db->query("update activity set state=$val where aid=$aid");
        if (!$query) {
            echo "err";
        }
    }
}
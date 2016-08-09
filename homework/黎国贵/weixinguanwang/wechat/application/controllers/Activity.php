<?php
class Activity extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Activity_model');
        $this->load->model('Login_model');
        $this->load->model('Manage_model');
        $this->load->helper('url_helper');
        $this->load->helper("form");
        $this->load->helper('url');
        $this->load->library('session');
        $this->load->helper('path');
    }

    public function index()
    {
        $data['projList'] = $this->Activity_model->getProjects();
        $data['activities']=get_object_vars(json_decode($this->Manage_model->getActivity(1)));
        $data['participants']=$this->Activity_model->getParticipants(1);
        $data['aid']=1;

		$data['title'] = '项目中心';
        $data['manage']=0;
        if ($data['activities']['state']==0) {
            $data['state']="未开始";
        }
        elseif ($data['activities']['state']==1) {
            $data['state']="进行中";
        }
        else{
            $data['state']="已结束";
        }

		$this->load->view('template/header', $data);
		$this->load->view('activity/activitypage', $data);
		$this->load->view('template/footer');
    }

    public function act($aid)
    {
        $data['projList'] = $this->Activity_model->getProjects();
        $data['activities']=get_object_vars(json_decode($this->Manage_model->getActivity($aid)));
        $data['participants']=$this->Activity_model->getParticipants($aid);
        $data['aid']=$aid;

        $data['title'] = '项目中心';
        $data['manage']=0;
        if ($data['activities']['state']==0) {
            $data['state']="未开始";
        }
        elseif ($data['activities']['state']==1) {
            $data['state']="进行中";
        }
        else{
            $data['state']="已结束";
        }

        $this->load->view('template/header', $data);
        $this->load->view('activity/activitypage', $data);
        $this->load->view('template/footer');
    }

    public function updateNumbers()
    {  
        $this->Activity_model->updateNumbers();
    }

    public function savePhoneNumber()
    {
        $this->Activity_model->savePhoneNumber();
    }

    /*------------------------------- login -------------------------------*/
    public function login()
    {
        $this->load->helper('form');
        $this->load->library('form_validation');

        $data['title'] = '登陆后台';
        $data['manage']=0;

        $this->form_validation->set_rules('loginName', 'id', 'required',array('required' => '请输入用户名！'));
        $this->form_validation->set_rules('pwd', 'password', 'required|callback_test_account',array('test_account' => '密码错误！','required' => '请输入密码！'));

        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('template/header', $data);
            $this->load->view('loginpage');
            $this->load->view('template/footer');
        }
        else
        {
            redirect('/manage');
        }
    }

    public function test_account()
    {
        return $this->Login_model->TestLogin();
    }
    /*------------------------------- login -------------------------------*/

    /*------------------------------- manage -------------------------------*/

    public function manage()//主页面管理活动
    {
        $data['title'] = '活动管理';
        $data['manage']=1;
        $data['activities']=$this->Manage_model->getActivities();
        $data['uptoken']=$this->Manage_model->get7NiuToken();

        $this->load->view('template/header', $data);
        $this->load->view('manage/activitiesPage');
        $this->load->view('template/footer');
    }

    //切换发布/隐藏状态
    public function actChangeState()
    {
        $this->Manage_model->changeState();
    }

    //新建任务
    public function createActivity()
    {
        $this->Manage_model->createAct();
    }

    public function updateActivity()
    {
        $this->Manage_model->updateActivity();
    }

    //活动管理
    public function activityManage($activityId)
    {
        $data['title']="活动管理";
        $data['manage']=1;
        $data['allProjects']=$this->Manage_model->userLocalProjects($activityId,$_SESSION['userId'],0);
        //!!!!!!!!
        //获得所有'选择过'的项目
        //!!!!!!!
        $data['choosenProjects']=$this->Manage_model->userLocalProjects($activityId,$_SESSION['userId']);
        //获得所有已选择项目
        $data['activity']=$this->Manage_model->getActivity($activityId);
        $data['uptoken']=$this->Manage_model->get7NiuToken();

        $this->load->view('template/header', $data);
        $this->load->view('manage/activityManage');
        $this->load->view('template/footer');
    }

    public function userPrivateProjects()
    {
        //如果ownerId和userId一样的话，说明需要获取管理员的所有项目
        if ($this->input->post('ownerId')==$_SESSION['userId']) {
            print_r($this->Manage_model->userLocalProjects($this->input->post('aid'),$_SESSION['userId'],0));
        }
        else{
            print_r($this->Manage_model->userPrivateProjects($this->input->post('aid'),$this->input->post('ownerId')));
        }
    }

    public function userChoosenProjects()
    {
        if ($this->input->post('ownerId')==$_SESSION['userId']) {
            print_r($this->Manage_model->userLocalProjects($this->input->post('aid'),$_SESSION['userId']));
        }
        else{
            //echo $this->Manage_model->userLocalProjects($this->input->post('aid'),$this->input->post('ownerId'));
            print_r(json_decode($this->Manage_model->userLocalProjects($this->input->post('aid'),$this->input->post('ownerId'))));
        }
    }

    //活动控制台
    public function activityControl($activityId)
    {
        $data['title']="活动管理";
        $data['manage']=1;
        $data['choosenProjects']=$this->Manage_model->userLocalProjects($activityId,$_SESSION['userId'],1,1);
        //获得所有已选择项目
        $data['activity']=get_object_vars(json_decode($this->Manage_model->getActivity($activityId)));
        $numbers=array();
        $choosenProjects=json_decode($data['choosenProjects']);
        for ($i=0; $i < count($choosenProjects); $i++) {
            array_push($numbers,$this->Manage_model->getNumbers($choosenProjects[$i]['projectId']));
        }
        $data['numbers']=json_encode($numbers);
        $data['phoneNumbers']=$this->Manage_model->getPhoneNumbers($activityId);

        $this->load->view('template/header', $data);
        $this->load->view('manage/activityControl');
        $this->load->view('template/footer');
    }

    public function addReply()
    {
        $this->Manage_model->addReply();
    }

    public function updateReply()
    {
        $this->Manage_model->updateReply();
    }

    public function increaseNumbers()
    {
        $this->Manage_model->increaseNumbers();
    }

    public function startOrStopMission()
    {
        $this->Manage_model->startOrStopMission();
    }
    // qiniu function
    public function get7NiuToken()
    {
        return $this->Manage_model->get7NiuToken();
    }

    public function startProject()
    {
        $this->Manage_model->startProject();
    }

    public function actChangePhase()
    {
        $this->Manage_model->actChangePhase();
    }

    /*------------------------------- manage -------------------------------*/
    /*------------------------------- projection -------------------------------*/

    public function projection($projectId)
    {
        $data['title']="项目投影";
        $data['manage']=0;
        $data['project']=$this->Activity_model->getProjectDetails($projectId);
        $data['numbers']=$this->Manage_model->getNumbers($projectId);
        $replies=json_decode($data['project']['replies']);

        for ($i=0; $i < count($replies); $i++) {
            $replies[$i]->userName='小明';
            $replies[$i]->icon='http://awb.img.xmtbang.com/img/uploadnew/201510/23/ccaeb2d2abe94fa6b3efe014e9146e94.jpg';
        }

        $data['replies']=json_encode($replies);

        $this->load->view('template/header', $data);
        $this->load->view('activity/projection/projection');
        $this->load->view('template/footer');
    }   

    /*------------------------------- 项目详情 -------------------------------*/
    public function projectDetails($projectId)
    {
        $data['title'] = '项目详情';
        $data['manage']=0;
        $data['project']=$this->Activity_model->getProjectDetails($projectId);

        $this->load->view('template/header',$data);
        $this->load->view('projectDetails',$data);
        $this->load->view('template/footer');
    }

    /*------------------------------- 活动列表 -------------------------------*/
    public function activityList()
    {
        $data['title']="活动列表";
        $data['manage']=0;
        $data['activities']=$this->Manage_model->getActivities();

        $this->load->view('template/header',$data);
        $this->load->view('activity/activitylist',$data);
        $this->load->view('template/footer');
    }
}










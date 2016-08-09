<?php
	function preTreat($url)
	{
		return str_replace(" ", "", $url);
	}

	function curlGet($url)
	{
		$url=preTreat($url);//预处理链接，去除空格等等
		$curl = curl_init($url);  
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // 获取数据返回  
		curl_setopt($curl, CURLOPT_BINARYTRANSFER, true); // 在启用 CURLOPT_RETURNTRANSFER 时候将获取数据返回  
		$data = curl_exec($curl); 
		curl_close($curl);

		//这里没有直接解析json是因为可能出线返回值不是json而是string的情况
		return $data;
	}

    function curlPost($url, $data)      
    {
    	$url=preTreat($url);//预处理链接，去除空格等等
		$data_string = json_encode($data);

		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		    'Content-Type: application/json',
		    'Content-Length: ' . strlen($data_string))
		);
		
		$result = curl_exec($ch);
		return $result;
    }
    
	function curlPut($url,$data)
	{
		$url=preTreat($url);//预处理链接，去除空格等等
		$data_string = json_encode($data);

	    $ch = curl_init(); //初始化CURL句柄 
	    curl_setopt($ch, CURLOPT_URL, $url); //设置请求的URL
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); //设为TRUE把curl_exec()结果转化为字串，而不是直接输出 
	    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); //设置请求方式
	     
	    curl_setopt($ch,CURLOPT_HTTPHEADER,array("X-HTTP-Method-Override: $method"));//设置HTTP头信息
	    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);//设置提交的字符串
	    $document = curl_exec($ch);//执行预定义的CURL 
	    if(curl_errno($ch)){ 
	      	echo 'Curl error: ' . curl_error($ch); 
	    }
	    curl_close($ch);
	     
	    return $document;
	}
?>
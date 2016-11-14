<?php 
$index=$_GET["start"];
$len=$_GET["len"];
$attr=array();
for ($i=0; $i <$len ; $i++) { 
$attr[$i]="内容".($index+$i+1);
}
echo json_encode($attr) ; ?>
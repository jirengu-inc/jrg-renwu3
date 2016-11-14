<?php 
$name=$_GET["username"];
$psd=$_GET["psd"];
$attr=array("hsy","hjy","fy");
$arrlength=count($attr);
$res=1;
for ($i=0; $i <$arrlength ; $i++) { 
if($attr[$i]==$name)
{
$res=0;
break;
}
}
echo $res ; ?>
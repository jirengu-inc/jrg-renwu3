$(function(){

    var map = new BMap.Map("control-map");          // 创建地图实例
    var point = new BMap.Point(121.9044790000,28.4547990000);  // 创建坐标点 其中116.404表示经度，39.915表示纬度。
    map.centerAndZoom(point, 16);                 // 初始化地图，设置中心点坐标和地图级别 地图必须经过初始化才可以执行其他操作。
    map.enableScrollWheelZoom();         //鼠标滚轮控制缩放
//        向地图添加控件
    map.addControl(new BMap.NavigationControl()); //平移缩放控件
    map.addControl(new BMap.ScaleControl());        //比例尺控件
    map.addControl(new BMap.OverviewMapControl());  //缩略地图控件
    map.addControl(new BMap.MapTypeControl());      //地图类型控件



})
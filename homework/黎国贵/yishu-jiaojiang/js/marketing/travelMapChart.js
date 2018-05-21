$(function(){

    var map = new BMap.Map("travel-map-chart");          // 创建地图实例
    var point = new BMap.Point(116.404, 39.915);  // 创建坐标点 其中116.404表示经度，39.915表示纬度。
    map.centerAndZoom(point, 5);                 // 初始化地图，设置中心点坐标和地图级别 地图必须经过初始化才可以执行其他操作。
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());



})
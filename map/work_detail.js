var map = new daum.maps.Map(document.getElementById('map_detail'), { // 지도를 표시할 div
    center : new daum.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
    level : 4 // 지도의 확대 레벨
});


var mapTypeControl = new daum.maps.MapTypeControl();
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

var location = new daum.maps.LatLng(Number(work['latitude']), Number(work['longitude']));
map.setCenter(location);

var marker = new daum.maps.Marker({
    position: location,
    title : works[i].title
});
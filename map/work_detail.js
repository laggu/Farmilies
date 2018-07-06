// var location = new daum.maps.LatLng(Number(work['latitude']), Number(work['longitude']));

var map = new daum.maps.Map(document.getElementById('map_detail'), { // 지도를 표시할 div
    //center : new daum.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
    center : new daum.maps.LatLng(Number(work['latitude']), Number(work['longitude'])),
    // center : location,
    draggable: false,
    level : 4 // 지도의 확대 레벨
});

var mapTypeControl = new daum.maps.MapTypeControl();
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

alert(Number(work.latitude));
alert(Number(work['longitude']));

// var location = new daum.maps.LatLng(Number(work['latitude']), Number(work['longitude']));
// map.setCenter(location);

// var location = new daum.maps.LatLng(Number(work.latitude), Number(work.longitude));
//
// map.setCenter(location);

var marker = new daum.maps.Marker({
    // position: location,
    position: new daum.maps.LatLng(Number(work['latitude']), Number(work['longitude'])),
    title : work.address_name,
});

alert(marker);

marker.setMap(map);

var infowindow = new daum.maps.InfoWindow({
    position : new daum.maps.LatLng(Number(work['latitude']), Number(work['longitude'])),
    content : '<p>'+work.address_name+'</p>'
});

infowindow.open(map, marker);
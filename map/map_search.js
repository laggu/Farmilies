var map = new daum.maps.Map(document.getElementById('map_search'), { // 지도를 표시할 div
    center : new daum.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
    level : 4 // 지도의 확대 레벨
});


var mapTypeControl = new daum.maps.MapTypeControl();
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);


var geocoder = new daum.maps.services.Geocoder();
geocoder.addressSearch(address ,function (result, status) {
    if (status === daum.maps.services.Status.OK) {
        address = JSON.parse(JSON.stringify(result[0]));
        var moveLatLon = new daum.maps.LatLng(Number(address["y"]), Number(address["x"]));
        map.setCenter(moveLatLon);
    }
});


var clusterer = new daum.maps.MarkerClusterer({
    map: map,
    averageCenter: true,
    minLevel: 10
});
var markerList = $.makeArray();

for(var i = 0 ; i < works.length; ++i){
    var markerPosition = new daum.maps.LatLng(Number(works[i].latitude), Number(works[i].longitude));

    var marker = new daum.maps.Marker({
        position: markerPosition,
        title : works[i].title
    });

    markerList.push(marker);

    var infowindow = new daum.maps.InfoWindow({
        content:    '<div>' +
                        '<p>농부 이름 :' + works[i].name + '</p>' +
                        '<p>작업 :' + works[i].title + '</p>' +
                        '<p>보상 :' + works[i].reward + '</p>' +
                    '</div>'
    });


    daum.maps.event.addListener(marker, 'mouseover', makeOverListener(marker, infowindow));
    daum.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    daum.maps.event.addListener(marker, 'click', makeClickListener(works[i].id));
}

clusterer.addMarkers(markerList);

function makeOverListener(marker, infowindow){
    return function(){
        infowindow.open(map, marker);
    }
}

function makeOutListener(infowindow){
    return function() {
        infowindow.close();
    }
}

function makeClickListener(id) {
    return function(){
        location.href="/work_detail?id="+id;
    }
}
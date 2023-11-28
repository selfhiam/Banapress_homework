async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/');
        const data = await response.json();
        displayData(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const container = document.getElementById('DataItem');

    data.forEach(info => {
        const infoElement = document.createElement('div');
        infoElement.className = 'DataItem';
        infoElement.innerHTML = `
            <img src="${info.image}" alt="Image">
            <div>
                <p><b>매점 이름:</b></p>
                <p>${info.name}</p>
                <p><b>주소:</b></p>
                <p>${info.address}</p>
            </div>`;
        container.appendChild(infoElement);
        getAddress(info.address, info.name, map);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

var mapContainer = document.getElementById('map');
var mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
};
var map = new kakao.maps.Map(mapContainer, mapOption);

function getAddress(address, name, map){
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });
            var infowindow = new kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`
            });

            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
        map.setCenter(coords);
    });
}

function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}
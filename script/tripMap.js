const tripPlaces = [
    {
        name: '뉴욕',
        lat: 40.7128,
        lon: -74.0060,
        image: '../media/NewYork.jpg'
    },
    {
        name: '나이아가라',
        lat: 43.0962,
        lon: -79.0377,
        image: '../media/Niagara.jpg'
    },
    {
        name: '런던',
        lat: 51.5072,
        lon: -0.1276,
        image: '../media/London.jpg'
    },
    {
        name: '에든버러',
        lat: 55.9533,
        lon: -3.1883,
        image: '../media/Edinburgh.jpg'
    },
    {
        name: '베이징',
        lat: 39.9042,
        lon: 116.4074,
        image: '../media/Beijing.jpg'
    },
    {
        name: '교토',
        lat: 35.0116,
        lon: 135.7681,
        image: '../media/Kyoto.jpg'
    },
    {
        name: '오사카',
        lat: 34.6937,
        lon: 135.5023,
        image: '../media/Osaka.jpg'
    },
    {
        name: '다낭',
        lat: 16.0544,
        lon: 108.2022,
        image: '../media/DaNang.jpg'
    },
    {
        name: '블라디보스토크',
        lat: 43.1155,
        lon: 131.8855,
        image: '../media/Vladivostok.jpg'
    }
];

const tripMap = L.map('trip-map', {
    worldCopyJump: true
}).setView([35, 70], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(tripMap);

const redMarkerIcon = L.divIcon({
    className: 'trip-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
});

tripPlaces.forEach(function(place) {
    const marker = L.marker([place.lat, place.lon], {
        icon: redMarkerIcon
    }).addTo(tripMap);

    marker.bindPopup(`
        <div class="trip-popup">
            <strong>${place.name}</strong>
            <img src="${place.image}" alt="${place.name} 미리보기">
        </div>
    `, {
        closeButton: false
    });

    marker.on('mouseover', function() {
        marker.openPopup();
    });

    marker.on('mouseout', function() {
        marker.closePopup();
    });
});

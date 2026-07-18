const currentLocation = document.querySelector('#current-location');

function showLocationMessage(message) {
    if (currentLocation) {
        currentLocation.textContent = message;
    }
}

function formatAddress(address) {
    const city = address.city || address.province || address.state || '';
    const district = address.borough || address.city_district || address.county || '';
    const town = address.suburb || address.town || address.village || address.neighbourhood || '';

    return [city, district, town].filter(Boolean).join(' ');
}

async function getAddressFromCoords(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ko`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('주소 변환 실패');
    }

    const data = await response.json();
    const shortAddress = formatAddress(data.address || {});

    return shortAddress || data.display_name || '주소를 찾을 수 없습니다';
}

if (currentLocation) {
    if (!navigator.geolocation) {
        showLocationMessage('위치 기능을 지원하지 않는 브라우저입니다');
    } else {
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const address = await getAddressFromCoords(lat, lon);
                    showLocationMessage(address);
                } catch (error) {
                    showLocationMessage('주소를 불러오지 못했습니다');
                    console.error(error);
                }
            },
            function() {
                showLocationMessage('위치 권한이 필요합니다');
            }
        );
    }
}

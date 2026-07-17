// 외부에서 가져다 쓸 수 있도록 export를 함수 맨 앞에 붙입니다.
function getWeatherText(code) {
    if (code === 0) return "맑음";
    if ([1, 2].includes(code)) return "대체로 맑음";
    if (code === 3) return "흐림";
    if ([45, 48].includes(code)) return "안개";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "비";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "눈";
    if ([95, 96, 99].includes(code)) return "천둥번개";
    return "알 수 없음";
}

export async function getLiveWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("서버 응답 불안정");
        
        const data = await response.json();
        
        // 필요한 데이터만 깔끔한 객체로 패킹해서 리턴
        return {
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            weatherCode: data.current.weather_code,
            condition: getWeatherText(data.current.weather_code)
        };
    } catch (error) {
        console.error("API 모듈 에러:", error);
        return null; // 에러 시 빈 값 던지기
    }
}

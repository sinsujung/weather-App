// 검색 입력창 요소
const searchBox = document.querySelector(".search-box");

// 도시 정보 표시 요소
const cityElement = document.querySelector(".city");
const dateElement = document.querySelector(".date");
const tempElement = document.querySelector(".temp");
const weatherElement = document.querySelector(".weather");
const hiLowElement = document.querySelector(".hi-low");

// OpenWeather API 키와 URL (여기에 본인의 API 키를 넣어야 합니다)
const apiKey = "c9843e8b986c940f8a3bf51526e6938a"; // 여기에 본인의 API 키를 넣으세요
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// 검색 후 엔터키 이벤트 처리
searchBox.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
        const city = searchBox.value;  // 입력된 도시 값
        if (city) {  // 입력이 비어있지 않으면
            getWeather(city);  // 날씨 정보 가져오기
            searchBox.value = "";  // 검색 후 입력창 비우기
        }
    }
});

// 날씨 정보 가져오기 함수
function getWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("도시를 찾을 수 없습니다.");
                return;
            }

            // 받은 데이터를 화면에 표시
            cityElement.innerText = `${data.name}, ${data.sys.country}`; // 도시, 나라
            const date = new Date();
            dateElement.innerText = date.toLocaleDateString("ko-KR", {
                weekday: "long", year: "numeric", month: "long", day: "numeric"
            });  // 현재 날짜

            tempElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`; // 온도
            weatherElement.innerText = data.weather[0].description;  // 날씨 설명
            hiLowElement.innerText = `${Math.round(data.main.temp_min)}°C/${Math.round(data.main.temp_max)}°C`;  // 최저/최고 기온
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

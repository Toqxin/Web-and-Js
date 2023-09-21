const apiKey = "APIKEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {

    if (!city) {
        document.querySelector(".error-message").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const response = await fetch(apiUrl + encodeURIComponent(city) + `&APPID=${apiKey}`);
    if (response.status === 404) {
        document.querySelector(".error-message").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";


    const weatherCode = data.weather[0].main;
    if (weatherCode === "Clouds") {
        weatherIcon.src = "clouds.png";
    } else if (weatherCode === "Clear") {
        weatherIcon.src = "clear.png";
    } else if (weatherCode === "Rain") {
        weatherIcon.src = "rain.png";
    } else if (weatherCode === "Drizzle") {
        weatherIcon.src = "drizzle.png";
    } else if (weatherCode === "Mist") {
        weatherIcon.src = "mist.png";
    }else if (weatherCode === "Snow") {
        weatherIcon.src = "snow.png";
    }
    
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error-message").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

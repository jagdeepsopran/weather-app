const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weather-info");


async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=e7affb678278cfab47baf41214818d7b`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p id="error">${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature : ${Math.round(main.temp)}°C</p>
        <p>Weather : ${weather[0].description}</p>
        <p>Humidity : ${main.humidity}%</p>
        <p>Wind Speed : ${wind.speed} m/s</p>
    `;
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        cityInput.style.animation = "shake 0.1s linear 2";
        weatherInfo.innerHTML = `<p style="color:black;">Please enter a city name</p>`;
    }
});

document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityName = document.getElementById('city-input').value;
    const weatherDetails = await getWeatherDetails(cityName);
    displayWeatherDetails(weatherDetails);
});

const getWeatherDetails = async (cityName) => {
    const API_KEY = 'b8a997876333b796d47ade4a290593fd';
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}

const displayWeatherDetails = (data) => {
    const weatherDetails = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
    const weatherCards = document.getElementById('weather-details');
    weatherCards.innerHTML = '';
    weatherDetails.forEach(forecast => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${forecast.name}, ${forecast.sys.country}</h2>
            <p>Temperature: ${forecast.main.temp}°C</p>
            <p>Feels Like: ${forecast.main.feels_like}°C</p>
            <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
        `;
        weatherCards.appendChild(card);
    });
}

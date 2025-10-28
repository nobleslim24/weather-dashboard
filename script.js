const apiKey = "84cf68c85ce2acb0056fd05b42bd3501";
const weatherContainer = document.querySelector('.weather-container');
const searchBox = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    weatherContainer.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function showWeather(data) {
  weatherContainer.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <h3>${data.weather[0].description}</h3>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) getWeather(city);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) getWeather(city);
  }
});

const apiKey = "84cf68c85ce2acb0056fd05b42bd3501";

const cityInput = document.getElementById("citySearch");
const searchBtn = document.querySelector(".text-2xl.font-bold");


cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});


searchBtn.addEventListener("click", getWeather);

function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Abeg enter city name!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) throw new Error("City no dey found 😢");
      return response.json();
    })
    .then((data) => {
      // update main display
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById("condition").textContent = data.weather[0].main;
      document.getElementById("d-humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("d-wind").textContent = `${data.wind.speed} km/h`;
      document.getElementById("d-pressure").textContent = `${data.main.pressure} mbar`;
      document.getElementById("d-feels").textContent = `${Math.round(data.main.feels_like)}°C`;
      document.getElementById("d-rain").textContent = data.weather[0].description;

      // AQI dummy since OpenWeatherMap free plan no include it
      document.getElementById("aqi").textContent = "AQI - 45";
      document.getElementById("aqiText").textContent = "Air quality is good 🌿";
    })
    .catch((error) => {
      alert(error.message);
    });
}

function displayWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let timeElement = document.querySelector("#current-time");
  let dayElement = document.querySelector("#current-day");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#current-weather-icon");

  cityElement.innerHTML = `${response.data.city}, ${response.data.country}`;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = ` ${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatTime(date);
  dayElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return ` ${hours}:${minutes}`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}

function searchCity(city) {
  let apiKey = "b5913f071fao57fb23b245a065fb8tac";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b5913f071fao57fb23b245a065fb8tac";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

 response.data.daily.forEach(function (day, index) {
  if (index < 5) {
    forecastHtml =
      forecastHtml +
      `
 <div class="weather-forecast-single-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <img src="${
    day.condition.icon_url
  }" class="weather-forecast-icon" />
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max">${Math.round(
    day.temperature.maximum
  )}º</span>
  <span class="weather-forecast-temperature-min">${Math.round(
    day.temperature.minimum
  )}º</span>
  </div>
 </div>
`;
  }
  });
  let forecast = document.querySelector("#forecast");

  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Oslo");



//citat vsetko zdola nahor, lebo tak funkcie na seba nadvazuju a vzajomne sa vyvolavaju (separation of concerns-nech funkcia robi len jednu vec a nech ju robi dobre)

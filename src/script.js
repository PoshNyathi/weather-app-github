function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#current-temperature-icon");
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
}


function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity(searchInput.value)
}

function getForecast(city) {
  let apiKey = "14c9cb77ffb4d04ao4a9dc1980dda3t2";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&nits=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Paris");

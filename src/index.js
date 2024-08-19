function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperatureValue = Math.round(convertTemperature(response.data.temperature.current));
    temperatureElement.innerHTML = temperatureValue;
    
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.main.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;

    let windElement = document.querySelector("#wind-speed");
    let speed = Math.round(response.data.wind.speed * 1.609344);
    windElement.innerHTML = speed;

    /*let dayTime = new Date(response.data.time * 1000);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    timeElement = document.querySelector("#time");
    let minutes = dayTime.getMinutes();
    if (minutes < 10) {
        minutes = `0${dayTime.getMinutes()}`;
    }
    timeElement.innerHTML = `${days[dayTime.getDay()]} ${dayTime.getHours()}:${minutes}`;
    */
    let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let hours = date.getHours();
let minutes = date.getMinutes();
let time;
if (hours > 12) {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time = hours - 12 + ":" + minutes + "PM";
} else {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time = `${hours}:${minutes}AM`;
}
let currentDateTime = `${days[date.getDay()]} ${time}`;
document.getElementById("current-date-time").innerHTML = `${currentDateTime}`;

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function searchCity(city){
let apiKey = "73a673doafc73bccb4ff04ct60632486";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}

function convertTemperature(celcius){
    let temp = 9/5 * celcius + 32;
    return temp;
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

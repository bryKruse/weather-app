function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();

  return `${day} ${month} ${date}, ${year} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thursday", "Friday", "Saturday", "Sunday"];
  let forecastHTML = `<div class="row upcoming-days-weather">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2 next-days">
                <div class="day">${day}</div>
                <div class="icon-weather-future">
                  <i class="fas fa-cloud"></i>
                </div>

                <span class="high-temperature">70°F |</span>
                <span class="low-temperature">64°F </span>
              
            `;
    forecastHTML = forecastHTML + `</div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showTemp(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#current-temp");
  cityTemp.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-day-feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#windy").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#today-time-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#today-weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-info");
  console.log(searchInput.value);
  let h1 = document.querySelector("#city");
  let city = searchInput.value;
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", findLocation);

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

function chooseCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  let celsiusTemperature = (fahrenheitTemperature - 32) * 0.55555555555;
  temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemperature = null;

function chooseFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", chooseCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", chooseFahrenheit);

search("New York");
displayForecast();

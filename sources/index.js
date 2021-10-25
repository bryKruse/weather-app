let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", chooseCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", chooseFahrenheit);

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours(timestamp);
  let minutes = now.getMinutes(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay(timestamp)];
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
  let month = months[now.getMonth(timestamp)];
  let year = now.getFullYear(timestamp);
  let date = now.getDate(timestamp);

  //let dayToday = document.querySelector("#day");
  //dayToday.innerHTML = `${day}`;
  //let currentDate = document.querySelector("#date");
  //currentDate.innerHTML = `${month} ${date}, ${year}`;
  //let currentTime = document.querySelector("#time");
  //currentTime.innerHTML = now.toLocaleString("en-US", {
  //hour: "numeric",
  //minute: "numeric",
  //hour12: true,
  return `${day} ${month} ${date},${year} ${hours}:${minutes}`;
}

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
  document.querySelector(`#today-time-date`).innerHTML = formatDate(
    response.data.dt * 1000
  );
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

function currentTemp(event) {
  let cityEl = document.querySelector("#city");
  let cityinfo = document.querySelector("#search-city-info");
  cityEl.innerHTML = searchInput.value;
  cityinfo.innerHTML = searchInput.value;
  navigator.geolocation.getCurrentPosition(currentTemp);
  console.log(currentTemp);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

function chooseCelsius(event) {
  event.preventDefault();
  let showCelsius = document.querySelector("#current-temp");
  showCelsius.innerHTML = `25`;
}
function chooseFahrenheit(event) {
  event.preventDefault();
  let showFahrenheit = document.querySelector("#current-temp");
  showFahrenheit.innerHTML = `77`;
}

const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "5c29b1e2687d195e6508d0eec666a9a5";

function onGeoOk(position) {
  if (localStorage.setItem("location",location) == null){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = {"lat":lat, "lon":lon}
    const a = localStorage.setItem("location",JSON.stringify(location));
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
      });
  } else{
    const savedLocation = JSON.parse(localStorage.getItem("location"));
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${savedLocation["lat"]}&lon=${savedLocation["lon"]}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
      })
  }
}
function onGeoError() {
  console.log("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "5c29b1e2687d195e6508d0eec666a9a5";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const STORAGEKEY = "location";

function getData(lat,lon) {
  const url = `${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}



function handleLocation(position){
  const getLocal = JSON.parse(localStorage.getItem(STORAGEKEY));
  if(getLocal!==null){
    getLocalStorage(getLocal);
  } else{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = {
      lat,
      lon
    };
    localStorage.setItem(STORAGEKEY,JSON.stringify(location));
    getData(lat,lon);
  }



  
}

function getLocalStorage(getLocal){
  const lat = getLocal["lat"];
    const lon = getLocal["lon"];
  const url = `${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}



function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(handleLocation, onGeoError);
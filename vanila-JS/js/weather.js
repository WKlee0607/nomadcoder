const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const weatherIcon = document.querySelector("#wher-div #weatherIcon");
const btn = document.querySelector("#wher-div #refresh-wher");
const API_KEY = "5c29b1e2687d195e6508d0eec666a9a5";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const STORAGEKEY = "location";

function getData(lat,lon) {
  const url = `${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      const temp = data.main.temp.toFixed(0);
      const wher = data.weather[0].main;
      const icon = data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      weather.innerText = `${wher} / ${temp}℃`;
      weatherIcon.classList.remove("hidden");
      weatherIcon.setAttribute("src",weatherIconAdrs);
    });

}

function refresh(){
  localStorage.removeItem(STORAGEKEY);
  window.location.reload()
}


function handleLocation(){
    const getLocal = JSON.parse(localStorage.getItem(STORAGEKEY));
    btn.addEventListener("click",refresh);
    const url = `${API_URL}lat=${getLocal.lat}&lon=${getLocal.lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        city.innerText = data.name;
        const temp = data.main.temp.toFixed(0);
        const wher = data.weather[0].main;
        const icon = data.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        weather.innerText = `${wher} / ${temp}℃`;
        weatherIcon.classList.remove("hidden");
        weatherIcon.setAttribute("src",weatherIconAdrs);
    });
  
  }


function onGeoError(){
  alert("Can't find you. No weather for you.");
}


if(localStorage.getItem(STORAGEKEY) !== null){
  handleLocation();
}else{
  navigator.geolocation.getCurrentPosition(handleLocation, onGeoError);
}

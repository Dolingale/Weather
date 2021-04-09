let city;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition((position) => {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lon=" +
      position.coords.longitude + '&lat=' + position.coords.latitude + 
      "&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric";

    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "json";
    request.send();

    request.onload = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          let response = request.response;
          let temperature = response.main.temp;
          document.querySelector(
            "#temperature_label"
          ).textContent = temperature;
          document.querySelector("#ville").textContent = response.name;
        } else {
          alert("Un problème est intervenu, merci de revenir plus tard.");
        }
      }
    };
  }, error, options);
} else {
  city = "Paris";
  takeTemperature(city);
}
var options = {
  enableHighAccuracy: true
}

let button = document.querySelector("#changer");
button.addEventListener("click", () => {
  newCity = prompt("Veuillez entrez une nouvelle ville");
  takeTemperature(newCity);
});
let chooseCity = "";

function error() {
  city = "Paris";
  takeTemperature(city);
}

function takeTemperature(city) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric";

  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        let response = request.response;
        let temperature = response.main.temp;
        document.querySelector("#temperature_label").textContent = temperature;
        document.querySelector("#ville").textContent = response.name;
      } else {
        alert("Un problème est intervenu, merci de revenir plus tard.");
      }
    }
  };
}

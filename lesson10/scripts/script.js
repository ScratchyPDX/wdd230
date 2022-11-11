const APPID = "4d9f17ef42374d8bec405fcc33edb96a";

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const cityName = document.querySelector('#city-name');
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const windSpeed = document.querySelector("#wind-speed");
const windChill = document.querySelector("#wind-chill");
const windDirection = document.querySelector("#wind-direction")

const url = "https://api.openweathermap.org/data/2.5/weather?zip=97060&appid=4d9f17ef42374d8bec405fcc33edb96a&units=imperial"

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function capitalize(str) {
  const arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
}

function degToCompass(num) {
  // Get direction code from DEG provided by the API
  // - Divide the angle by 22.5 because 360deg/16 directions
  // - Add .5 so that when you truncate the value you can break the 'tie' between the change threshold
  // - Directly index into the array and print the value (mod 16)
  const arrayOfDirectionCodes = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  let val = Math.floor((num / 22.5) + 0.5);
  return arrayOfDirectionCodes[(val % 16)];
}

function displayResults(weatherData) {
  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = capitalize(desc);
  cityName.textContent = weatherData.name;
  humidity.textContent = weatherData.main.humidity;
  pressure.textContent = (weatherData.main.pressure * 0.030).toFixed(1);
  windSpeed.textContent = weatherData.wind.speed.toFixed(0);
  windChill.textContent = weatherData.main.feels_like.toFixed(0);
  windDirection.textContent = degToCompass(weatherData.wind.deg)
}

apiFetch();


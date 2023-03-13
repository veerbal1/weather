import { createHourlyCards, createDailyCards } from "./weatherForecastCards.js";
import { startLoadingState, endLoadingState } from "./setLoadingState.js";
import { currentWeatherData } from "./currentWeatherData.js";
import { weatherForecastData } from "./weatherForecastData.js";

const API_KEY = "";

const searchBoxInput = document.querySelector(".search-box-input");
const gpsButton = document.querySelector(".gps-button");

createHourlyCards();
createDailyCards();

const fetchWeatherData = async (data) => {
  await startLoadingState();
  await currentWeatherData(data, API_KEY);
  await weatherForecastData(data, API_KEY);
  await endLoadingState();
};

const getUserLocation = async () => {
  const successCallback = async (position) => {
    const data = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    await fetchWeatherData(data);
  };

  const errorCallback = (error) => {
    console.log(error);
    fetchWeatherData("Istanbul");
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

searchBoxInput.addEventListener("keyup", async (event) => {
  if (event.keyCode === 13) {
    await fetchWeatherData(searchBoxInput.value);
  }
});

gpsButton.addEventListener("click", getUserLocation);

getUserLocation();
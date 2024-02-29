import { createAsyncThunk } from "@reduxjs/toolkit";

// const API_KEY = "F3UN26FPK3N87QRTJFHH83P7A";
const API_KEY = "5MT84K8GFF76AFQHAHE25A4V7";

const API_BASE_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export const getTripWeatherRequest = createAsyncThunk(
    "trips/getTripWeather",
    async ({ city, startDate, endDate }) => {
        const apiUrl = `${API_BASE_URL}${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch weather data: ${response.statusText}`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const getCityWeatherRequest = createAsyncThunk(
    "trips/getCityWeather",
    async (city) => {
        const apiUrl = `${API_BASE_URL}${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch weather data: ${response.statusText}`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

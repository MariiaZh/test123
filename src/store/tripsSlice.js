import { createSlice } from "@reduxjs/toolkit";

import { getTripWeatherRequest, getCityWeatherRequest } from "./API/weatherApi";

import { picturesCities } from "../utils/citiesImagesImports";
import { getDisplayDate } from "../utils/functions";

const initialTrips = [
    {
        id: new Date().getTime() + 23,
        city: "Paris",
        picture: picturesCities.Paris,
        startDate: new Date("2024-03-12").getTime(),
        endDate: new Date("2024-03-18").getTime(),
    },
];

const loadedTrips = JSON.parse(localStorage.getItem("unknown")) || initialTrips;

const tripsSlice = createSlice({
    name: "trips",
    initialState: {
        fullTrips: loadedTrips,
        trips: loadedTrips,
        tripWeather: [],
        currentTrip: null,
        currentWeather: {},
        modalActive: false,
        modalAuth: false,
        userKey: "unknown",
        userProfile: {},
        scrollToTop: false,
        scrollToBottom: { status: false, scrollTo: "" },
        sorted: "Added",
        newTripId: null,
        loading: "",
    },
    reducers: {
        setTrip(state, { payload }) {
            state.currentTrip = payload;
        },
        clearNew(state, action) {
            state.newTripId = null;
        },
        searchCity(state, { payload }) {
            state.trips = state.fullTrips.filter((trip) =>
                trip.city.toLowerCase().includes(payload.toLowerCase())
            );
            state.currentTrip = null;
            state.currentWeather = {};
            state.tripWeather = [];
        },
        stopSearchCity(state, action) {
            state.trips = state.fullTrips;
        },
        modalUse(state, { payload }) {
            state[payload.name] = payload.value;
            if (payload.name == "modalActive" && !payload.value) {
                // state.newTrip = [];
            }
        },
        addTrip(state, { payload }) {
            state.trips = [payload, ...state.trips];
            state.fullTrips = [payload, ...state.fullTrips];
            state.currentTrip = null;
            state.currentWeather = {};
            state.tripWeather = [];
            state.modalActive = false;
            state.scrollToTop = true;
            state.newTripId = payload.id;
            localStorage.setItem(state.userKey, JSON.stringify(state.trips));
        },
        deleteTrip(state, { payload }) {
            state.trips = state.trips.filter((trip) => trip.id != payload);
            state.fullTrips = state.fullTrips.filter(
                (trip) => trip.id != payload
            );
            state.currentTrip = null;
            state.currentWeather = {};
            state.tripWeather = [];
            state.modalActive = false;
            state.scrollToTop = true;
            localStorage.setItem(state.userKey, JSON.stringify(state.trips));
        },
        updateScroll(state, { payload }) {
            state.scrollToTop = payload;
        },
        shiftCardsList(state, { payload }) {
            state.scrollToBottom = payload;
        },
        sortList(state, { payload }) {
            state.sorted = payload;
            switch (payload) {
                case "Name":
                    state.trips = state.trips.sort((a, b) =>
                        a.city.localeCompare(b.city)
                    );
                    break;
                case "Start date":
                    state.trips = state.trips.sort(
                        (a, b) => new Date(a.startDate) - new Date(b.startDate)
                    );
                    break;
                case "Added":
                    state.trips = state.fullTrips;
                    break;
            }
        },
        logInUser(state, { payload }) {
            state.userProfile = {
                picture: payload.picture,
                name: payload.name,
                email: payload.email,
            };
            state.userKey = payload.email;
            state.currentTrip = null;
            state.currentWeather = {};
            state.tripWeather = [];
            state.fullTrips =
                JSON.parse(localStorage.getItem(payload.email)) || [];
            state.trips = JSON.parse(localStorage.getItem(payload.email)) || [];
        },
        logOut(state, action) {
            state.userProfile = {};
            state.userKey = "unknown";
            state.currentTrip = null;
            state.currentWeather = {};
            state.tripWeather = [];
            state.fullTrips = JSON.parse(localStorage.getItem("unknown"));
            state.trips = JSON.parse(localStorage.getItem("unknown"));
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getTripWeatherRequest.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getTripWeatherRequest.rejected, (state, action) => {
                state.loading = "rejected";
                state.error = action.error.message;
            })
            .addCase(getTripWeatherRequest.fulfilled, (state, { payload }) => {
                state.loading = "fulfilled";
                state.tripWeather = payload.days.map((day) => {
                    const dayName = new Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                    }).format(new Date(day.datetime));
                    return {
                        dayName,
                        icon: day.icon,
                        date: getDisplayDate(day.datetime),
                        tempMax: day.tempmax,
                        tempMin: day.tempmin,
                        description: day.description,
                    };
                });
            })
            .addCase(getCityWeatherRequest.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getCityWeatherRequest.rejected, (state, action) => {
                state.loading = "rejected";
                state.error = action.error.message;
            })
            .addCase(getCityWeatherRequest.fulfilled, (state, { payload }) => {
                state.loading = "fulfilled";
                state.currentWeather = {
                    city: payload.address,
                    date: getDisplayDate(payload.days[0].datetime),
                    dayName: new Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                    }).format(new Date(payload.days[0].datetime)),
                    icon: payload.days[0].icon,
                    temp: payload.days[0].temp,
                };
            });
    },
});

export const {
    setTrip,
    searchCity,
    stopSearchCity,
    modalUse,
    addTrip,
    updateScroll,
    sortList,
    shiftCardsList,
    logInUser,
    logOut,
    deleteTrip,
    clearNew,
} = tripsSlice.actions;

export default tripsSlice.reducer;

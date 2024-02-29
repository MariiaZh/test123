import { configureStore } from "@reduxjs/toolkit";
import tripsSlice from "./tripsSlice";

export default configureStore({
    reducer: {
        trips: tripsSlice,
    },
});

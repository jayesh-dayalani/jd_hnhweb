import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./FormSlice";

const MyStore = configureStore({
    reducer:{
        form : FormSlice
    }
})
export default MyStore
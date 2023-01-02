import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoRateApi } from "../services/cryptoRateApi";

export default configureStore({
    reducer :{
        [cryptoApi.reducerPath]: cryptoApi.reducer, 
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, 
        [ cryptoRateApi.reducerPath]: cryptoRateApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware, cryptoRateApi.middleware)
})
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoRateApiHeaders ={
    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
}

const baseUrl='https://alpha-vantage.p.rapidapi.com';
const createRequest = (url) => ({url,headers: cryptoRateApiHeaders})

export const cryptoRateApi = createApi({
    reducerPath: 'cryptoRateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        getCryptoRate: builder.query({
            query: ({from,to}) => createRequest(`/query?from_currency=${from}&function=CURRENCY_EXCHANGE_RATE&to_currency=${to}`)
        }),
    }) 
});

export const {
    useGetCryptoRateQuery
} = cryptoRateApi;
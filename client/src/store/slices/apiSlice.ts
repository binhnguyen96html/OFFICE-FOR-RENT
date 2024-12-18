import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../constants/apiConstants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Buildings', 'Districts', 'Users', 'Customers'],
    endpoints: (builder) => ({})
})



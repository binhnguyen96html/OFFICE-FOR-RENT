import {apiSlice} from "./apiSlice";
import {DISTRICT_URL} from "../../constants/apiConstants";

export const districtsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDistricts: builder.query({
            query: () => ({
                url: `${DISTRICT_URL}`
            }),
            keepUnusedDataFor: 5,
        }),
    })
})

export const {
    useGetDistrictsQuery
} = districtsApiSlice;
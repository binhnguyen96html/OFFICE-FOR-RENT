import {apiSlice} from "./apiSlice";
import {BUILDING_URL} from "../../constants/apiConstants";

export const buildingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBuildings: builder.query({
            query: () => ({
                url: `${BUILDING_URL}`
            }),
            keepUnusedDataFor: 5,
        }),
    })
})

export const {
    useGetBuildingsQuery
} = buildingsApiSlice;
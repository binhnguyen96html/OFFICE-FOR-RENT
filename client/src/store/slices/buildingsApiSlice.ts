import {apiSlice} from "./apiSlice";
import {BUILDING_URL} from "../../constants/apiConstants";
import qs from 'query-string';

export const buildingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBuildings: builder.query({
            query: () => ({
                url: `${BUILDING_URL}`
            }),
            keepUnusedDataFor: 5,
        }),
        findBuildings: builder.query({
            query: (params) => ({
                url: `${BUILDING_URL}/search?${qs.stringify(params)}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        createBuilding: builder.mutation({
           query: (data) => ({
               url: `${BUILDING_URL}`,
               method: 'POST',
               body: data,
           }),
            invalidatesTags: ['Buildings']
        })
    })
})

export const {
    useGetBuildingsQuery,
    useFindBuildingsQuery,
    useCreateBuildingMutation,
} = buildingsApiSlice;
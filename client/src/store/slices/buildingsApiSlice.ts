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
        getBuildingById: builder.query({
            query: (buildingId) => ({
                url: `${BUILDING_URL}/${buildingId}`,
                method: 'GET',
            })
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
        }),
        updateBuilding: builder.mutation({
            query: ({buildingId, data}) => ({
                url: `${BUILDING_URL}/${buildingId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Buildings']
        }),
        deleteBuilding: builder.mutation({
            query: ({buildingId}) => ({
                url: `${BUILDING_URL}/${buildingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Buildings']
        }),
    })
})

export const {
    useGetBuildingsQuery,
    useGetBuildingByIdQuery,
    useFindBuildingsQuery,
    useCreateBuildingMutation,
    useUpdateBuildingMutation,
    useDeleteBuildingMutation
} = buildingsApiSlice;
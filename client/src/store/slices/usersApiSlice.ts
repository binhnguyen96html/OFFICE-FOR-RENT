
import {apiSlice} from "./apiSlice";
import {USER_URL} from "../../constants/apiConstants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: `${USER_URL}`
            }),
            keepUnusedDataFor: 5,
        }),
        getUsersWithAssginedBuilding: builder.query({
            query: ({buildingId}) => ({
                url:`${USER_URL}/assigned-staffs/${buildingId}`
            }),
            keepUnusedDataFor: 5,
        }),
        updateAssignStaffToBuilding: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/assign-staffs-to-building`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetUsersQuery,
    useLazyGetUsersWithAssginedBuildingQuery,
    useUpdateAssignStaffToBuildingMutation
} = usersApiSlice;
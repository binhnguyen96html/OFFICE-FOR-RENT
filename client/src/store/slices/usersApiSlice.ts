
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
        getUsersWithAssignedBuilding: builder.query({
            query: ({buildingId}) => ({
                url:`${USER_URL}/assigned-staffs/${buildingId}`
            }),
            keepUnusedDataFor: 5,
        }),
        getUsersWithAssignedCustomer: builder.query({
            query: ({customerId}) => ({
                url:`${USER_URL}/assigned-staffs-to-customer/${customerId}`
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
    useLazyGetUsersWithAssignedBuildingQuery,
    useLazyGetUsersWithAssignedCustomerQuery,
    useUpdateAssignStaffToBuildingMutation
} = usersApiSlice;
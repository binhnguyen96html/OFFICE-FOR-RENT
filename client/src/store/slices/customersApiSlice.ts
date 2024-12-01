import {apiSlice} from "./apiSlice";
import {CUSTOMER_URL, USER_URL} from "../../constants/apiConstants";
import qs from 'query-string';


export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomers: builder.query({
            query: () => ({
                url: `${CUSTOMER_URL}}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        findCustomers: builder.query({
            query: (params) => ({
                url: `${CUSTOMER_URL}/search?${qs.stringify(params)}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        findCustomerById: builder.query({
            query: ({customerId}) => ({
                url: `${CUSTOMER_URL}/${customerId}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        createCustomer: builder.mutation({
            query: (data) => ({
                url: `${CUSTOMER_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Customers']
        }),
        updateCustomer: builder.mutation({
            query: ({customerId, data}) => ({
                url: `${CUSTOMER_URL}/edit/${customerId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags:['Customers']
        }),
        deleteCustomer: builder.mutation({
            query: ({customerId}) => ({
                url: `${CUSTOMER_URL}/${customerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customers'],
        }),
        updateAssignStaffsToCustomer: builder.mutation({
            query: (data) => ({
                url: `${CUSTOMER_URL}/assign-staffs-to-customer`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Customers']
        })
    })
})

export const {
    useGetAllCustomersQuery,
    useFindCustomersQuery,
    useFindCustomerByIdQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useUpdateAssignStaffsToCustomerMutation,
} = customersApiSlice;
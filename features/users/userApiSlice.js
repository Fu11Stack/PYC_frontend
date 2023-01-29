import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSLice = apiSlice.injectEndpoints({
     endpoints: builder => ({
         getUsers: builder.query({
             query: () => '/users',
             validateStatus: (response, result) => {
                 return response.status === 200 && !result.Error
             },
             keepUnusedDatafor: 5,
             transformResponse: responseData => {
                 const loadedUsers = responseData.map(user => {
                     user.id = user._id
                     return user
                 });
                 return usersAdapter.setAll(initialState, loadedUsers)
             },
             providedTags: (result, error, arg) => {
                 if (result?.ids) {
                     return [
                         { type: 'User', id:'LIST' },
                         ...results.ids.map(id => ({ type: 'Users', id }))
                     ]
                 } else return [{ type: 'User', id: 'LIST' }]
             }
         }),
     }),
})

export const {
 useGetUsersQuery,
} = usersApiSLice

// returns the query results object 
export const selectUsersResult = userApiSlice.endpoints.getUsers.select()

// creates momoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    userResult => userResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring 

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// Define the initial state with a users array
const initialState = {
    users: [
        { id: '0', name: 'Dude Lebowski' },
        { id: '1', name: 'Neil Young' },
        { id: '2', name: 'Dave Gray' }
    ]
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL)
        consosle.log(response)
        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
})

// Create a slice of the Redux store for users
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // No reducers defined yet, but you can add them here
    },
    extraReducers (builder) {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {

            state.users = action.payload
        } )
    }
});

// Selector to access the list of users from the state
export const allUsers = (state) => state.users.users

// Export the reducer to be used in the Redux store
export default userSlice.reducer;

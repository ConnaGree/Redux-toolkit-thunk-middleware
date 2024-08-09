import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// Define the initial state with a default users array
const initialState = {
    users: [
        { id: '0', name: 'Dude Lebowski' },
        { id: '1', name: 'Neil Young' },
        { id: '2', name: 'Dave Gray' }
    ]
};

// Thunk to fetch users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        return response.data; // Return fetched users data
    } catch (err) {
        throw new Error(err.message); // Throw error for the rejected case
    }
});

// Create a slice of the Redux store for users
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Reducers can be added here for additional user-related actions
    },
    extraReducers: (builder) => {
        // Handle the fulfilled state of fetchUsers
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload; // Set users data from API
        });
    }
});

// Selector to access the list of users from the state
export const allUsers = (state) => state.users.users;

// Export the reducer to be used in the Redux store
export default userSlice.reducer;

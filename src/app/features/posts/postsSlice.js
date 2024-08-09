import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    posts: [],   // Array to store posts
    status: 'idle',   // Loading status for posts
    error: null,   // Error message if any
    users: []   // Array to store users
};

// Thunk to fetch posts from API
export const fetchPosts = createAsyncThunk('posts/fetchedPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data; // Return fetched posts data
    } catch (err) {
        // Throw the error to be caught in the rejected case
        throw new Error(err.message);
    }
});

// Thunk to fetch users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        return response.data; // Return fetched users data
    } catch (err) {
        throw new Error(err.message);
    }
});

// Create a slice of the store for posts and users
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // Reducer to add a new post
        addPost: (state, action) => {
            state.posts.unshift({
                id: nanoid(),  // Generate a unique ID for the post
                title: action.payload.title,  // Set the post title
                content: action.payload.content,  // Set the post content
                date: new Date().toISOString(),  // Set the current date
                userName: action.payload.userName,  // Set the user name
                reactions: {  // Initialize reactions count
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
            });
        },
        // Reducer to add a reaction to a post
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const postToBeUpdated = state.posts.find(post => post.id === postId);
            if (postToBeUpdated) {
                postToBeUpdated.reactions[reaction] += 1;  // Increment the reaction count
            }
        }
    },
    extraReducers: (builder) => {
        // Handle fulfilled state of fetchUsers
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;  // Set users data
        });
        // Handle pending state of fetchPosts
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';  // Set status to loading
        });
        // Handle fulfilled state of fetchPosts
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';  // Set status to succeeded
            const loadedPosts = action.payload.map((post) => {
                // Find user by userId from posts
                const user = state.users.find(user => user.id === post.userId);
                return {
                    ...post,
                    userName: user ? user.name : 'Unknown Author',  // Add user name to post
                    date: new Date().toISOString(),  // Add current date
                    reactions: {  // Initialize reactions count
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                };
            });
            state.posts = loadedPosts;  // Assign loaded posts to state
        });
        // Handle rejected state of fetchPosts
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';  // Set status to failed
            state.error = action.error.message;  // Set error message
        });
    }
});

// Selectors to get specific parts of the state
export const allPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

// Export actions and reducer
export const { addPost, addReaction } = postSlice.actions;
export default postSlice.reducer;

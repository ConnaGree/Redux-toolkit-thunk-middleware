import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
    users: []
};

export const fetchPosts = createAsyncThunk('posts/fetchedPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data; // No need for the spread operator here
    } catch (err) {
        // Throw the error to be caught in the rejected case
        throw new Error(err.message);
    }
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        response = await axios.get(USERS_URL)
        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
})


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {

            state.posts.unshift({
                id: nanoid(),
                title: action.payload.title,
                content: action.payload.content,
                date: new Date().toISOString(),
                userName: action.payload.userName,
                reactions: {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
            });
        },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const postToBeUpdated = state.posts.find(post => post.id === postId);
            if (postToBeUpdated) {
                postToBeUpdated.reactions[reaction] += 1;
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const loadedPosts = action.payload.map((post) => {
                const user = state.users.find(user => user.id === post.userId)
                return {
                    ...post,
                    userName: user ? user.name : 'Unknown Author',
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            })
            state.posts = loadedPosts; // Directly assign the array
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message; // Use action.error.message for consistency
        });
    }
});

export const allPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const { addPost, addReaction } = postSlice.actions;
export default postSlice.reducer;

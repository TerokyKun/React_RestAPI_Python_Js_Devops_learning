import { configureStore } from '@reduxjs/toolkit';
import {postsReduser} from './slises/posts'
import { authReduser } from './slises/auth';

const store = configureStore({
    reducer: {
        posts: postsReduser,
        auth: authReduser,
    } 
});

export default store;

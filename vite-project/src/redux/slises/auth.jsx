import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios';


export const fetchAuth  = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

export const fetchLogin  = createAsyncThunk('auth/fetchLogin', async (params) => {
    const {data} = await axios.get('/auth/me', params);
    return data;
});

export const fetchRegistr  = createAsyncThunk('/auth/fetchRegistr', async (params) => {
    const {data} = await axios.post('/auth/registr', params);
    return data;
});


const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        state.data = null;
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
        state.status = 'loading';
        state.data = null;

    },
    [fetchAuth.fulfilled]: (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
        state.status = 'error';
        state.data = null;

    },
    [fetchLogin.pending]: (state) => {
        state.status = 'loading';
        state.data = null;

    },
    [fetchLogin.fulfilled]: (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
    },
    [fetchLogin.rejected]: (state) => {
        state.status = 'error';
        state.data = null;

    },
    [fetchRegistr.pending]: (state) => {
        state.status = 'loading';
        state.data = null;

    },
    [fetchRegistr.fulfilled]: (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
    },
    [fetchRegistr.rejected]: (state) => {
        state.status = 'error';
        state.data = null;

    }
  }
})
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectToken = (state) => state.auth.data?.token;
export const nickName = (state) => state.auth.data?.nickName;
export const email = (state) => state.auth.data?.email;



export const authReduser = authSlice.reducer;

export const {logout} = authSlice.actions;
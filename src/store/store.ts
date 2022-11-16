import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './reducers/authSlice';

const reducer = {
    auth: authSlice.reducer
};

const store = configureStore({
    reducer,
});

export default store;
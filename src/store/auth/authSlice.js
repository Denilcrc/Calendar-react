

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({ //recordar colocarlo en el store.js
    name: 'auth',
    initialState: {
       status: 'checking', //authenticated, not-authenticated
       user: {},
       errorMessage: undefined,
    },
    reducers: { //recordar que los reducers generan un nuevo state
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        },
    }
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;



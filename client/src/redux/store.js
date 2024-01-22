import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";
import { usersSlice } from "./usersSlice";
import cartReducer from './cartSlice';

const store=configureStore({
    reducer:{
        loaders:loadersSlice.reducer,
        users:usersSlice.reducer,
        cart: cartReducer,
    }
});
export default store;
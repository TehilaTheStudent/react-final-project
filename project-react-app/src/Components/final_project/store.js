import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './features/products/productsSlice';
import usersSlice from './features/users/userSlice';
import ordersSlice from './features/orders/ordersSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        orders: ordersSlice,
        users: usersSlice
    },
    devTools:true// process.env.NODE_ENV !== 'production', // Enable only in development
    // Add middleware and enhancers specific to store1
});

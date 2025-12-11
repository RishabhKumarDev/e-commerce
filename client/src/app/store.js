import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminProductsReducers from '../features/admin/adminSlice'
import shoppingProductsReducers from '../features/shopping/shoppingSlice';
import ShoppingCartReducer from '../features/shopping/cartSlice';
import ShoppingAddressReducer from '../features/shopping/addressSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducers,
        shoppingProducts: shoppingProductsReducers,
        shoppingCart: ShoppingCartReducer,
        shoppingAddress: ShoppingAddressReducer,
    },
});
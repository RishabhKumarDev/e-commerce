import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminProductsReducers from '../features/admin/adminSlice'
import adminOrderSlice from '../features/admin/orderSlice';
import shoppingProductsReducers from '../features/shopping/shoppingSlice';
import ShoppingCartReducer from '../features/shopping/cartSlice';
import ShoppingAddressReducer from '../features/shopping/addressSlice';
import ShoppingOrderReducer from '../features/shopping/orderSlice';
import ShoppingSearchReducer from '../features/shopping/searchSlice';
import ShoppingReviewReducer from '../features/shopping/reviewSlice';
import CommonBannerReducer from '../features/common/bannerSlice';



export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducers,
        adminOrders: adminOrderSlice,
        shoppingProducts: shoppingProductsReducers,
        shoppingCart: ShoppingCartReducer,
        shoppingAddress: ShoppingAddressReducer,
        shoppingOrder: ShoppingOrderReducer,
        shoppingSearch: ShoppingSearchReducer,
        shoppingReview: ShoppingReviewReducer,
        commonBanner: CommonBannerReducer
    },
});
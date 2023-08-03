import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import updateCompany from "../slices/companySlice"

const store = configureStore({
    reducer: {
        companyUpadte: updateCompany,
    },
});
type AppDispatchType = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useDispatcher: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

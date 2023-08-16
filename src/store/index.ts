import { errorMiddleware } from '@/middlewares'
import api from '@/services'
import ModalSlice from '@/services/modal'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

const reducers = combineReducers({
    [api.reducerPath]: api.reducer,
    [ModalSlice.name]: ModalSlice.reducer,
})

const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(api.middleware, errorMiddleware)
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type IDispatch = typeof store.dispatch
export const useAppDispatch: () => IDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

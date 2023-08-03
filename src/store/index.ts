import api from '@/services'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(api.middleware)
    },
})

export default store
type RootState = ReturnType<typeof store.getState>
type IDispatch = typeof store.dispatch
export const useAppDispatch: () => IDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

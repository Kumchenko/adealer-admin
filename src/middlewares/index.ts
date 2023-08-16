import { ModalType } from '@/constants'
import { showModal } from '@/services/modal'
import { IDispatch } from '@/store'
import { Middleware, MiddlewareAPI, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit'

export const errorMiddleware: Middleware =
    (api: MiddlewareAPI<IDispatch>) => next => (action: PayloadAction<{ data: Error }>) => {
        if (isRejectedWithValue(action)) {
            api.dispatch(
                showModal({
                    type: ModalType.Error,
                    description: action.payload.data.message,
                }),
            )
        }

        return next(action)
    }

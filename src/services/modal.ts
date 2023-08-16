import { ModalType, modalTimeout } from '@/constants'
import { Modal, AsyncModalArgs, ModalArgs } from '@/interfaces'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

let modalCounter = 1

type IInitialState = {
    show: boolean
    modals: Modal[]
}

const initialState: IInitialState = {
    show: false,
    modals: [],
}

const showModal = createAsyncThunk(
    'modal/showModal',
    async ({ seconds = modalTimeout, ...modal }: AsyncModalArgs, { dispatch }) => {
        dispatch(openModal(modal))
        setTimeout(() => {
            dispatch(closeModal())
        }, seconds * 1000)
    },
)

const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalArgs>) => {
            if (!state.show) state.show = true
            state.modals.push({
                key: modalCounter++,
                type: action.payload.type || ModalType.Info,
                ...action.payload,
            })
        },
        closeModal: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload) {
                state.modals = state.modals.filter(modal => modal.key !== action.payload)
            } else {
                state.modals.splice(0, 1)
            }

            if (!state.modals.length) state.show = false
        },
    },
})

const { actions, reducer } = ModalSlice

export default ModalSlice
export const { openModal, closeModal } = actions
export { showModal }

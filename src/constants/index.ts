import { toOptions } from '@/utils/toOptions'

export * from './asidePoints'
export * from './order'
export * from './calls'

export const pollingInterval = 30000 // 30s
export const logoutTimeout = 2700 // 4s
export const modalTimeout = 2500 // 3.5s

export enum DesignColor {
    Violet = 'violet',
    Red = 'red',
    Green = 'green',
    Transparent = 'transparent',
}

export enum Sort {
    Asc = 'asc',
    Desc = 'desc',
}

export enum ModalType {
    Info = 'info',
    Error = 'error',
}

export const sortOptions = toOptions(Sort)

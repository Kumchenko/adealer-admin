import { ISort } from './Generic'

export type ICallMe = {
    id: number
    name: string
    tel: string
    created: Date
    checked: Date | null
}

export enum ECallMeFilter {
    All = 'all',
    Created = 'created',
    Checked = 'checked',
}

export enum ECallMeSortField {
    ID = 'id',
    NAME = 'name',
    TEL = 'tel',
    EMAIL = 'email',
    COST = 'cost',
    CREATED = 'created',
}

export type ICallMeGetMany = Partial<{
    id: string
    name: string
    tel: string
    page: number
    perPage: number
    from: string
    to: string
    filter: ECallMeFilter
    apply: boolean
    sortBy: ECallMeSortField
    sort: ISort
}>

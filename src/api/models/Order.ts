import { ISort } from './Generic'

export type IOrder = {
    id: number
    serviceId: number
    name: string
    surname: string
    tel: string
    email: string
    cost: number
    created: Date
}

export enum EOrderFilter {
    All = 'ALL',
    Created = 'CREATED',
    Process = 'INPROCESS',
    Done = 'DONE',
}

export enum EOrderSortField {
    ID = 'id',
    NAME = 'name',
    SURNAME = 'surname',
    TEL = 'tel',
    EMAIL = 'email',
    COST = 'cost',
    CREATED = 'created',
}

export type IOrderGetMany = Partial<{
    id?: string
    name: string
    surname: string
    tel: string
    email: string
    page: string
    perPage: string
    from: string
    to: string
    modelId: string
    componentId: string
    qualityId: string
    apply: string
    filter: EOrderFilter
    sort: ISort
    sortBy: EOrderSortField
}>

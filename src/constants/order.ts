import { toOptions } from '@/utils/toOptions'

export enum OrderFilter {
    All = 'ALL',
    Created = 'CREATED',
    Processing = 'INPROCESS',
    Done = 'DONE',
}

export enum OrderStatus {
    Process = 'INPROCESS',
    Done = 'DONE',
}

export enum OrderSortBy {
    ID = 'id',
    Name = 'name',
    Surname = 'surname',
    Tel = 'tel',
    Email = 'email',
    Cost = 'cost',
    Created = 'created',
}

export const ordersPerPage = [6, 12, 18, 24, 30]

export const orderFilterOptions = toOptions(OrderFilter)

export const orderSortByOptions = toOptions(OrderSortBy)

export const orderStatusOptions = toOptions(OrderStatus)

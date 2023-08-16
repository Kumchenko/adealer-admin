import { CallField, CallFilter, OrderFilter, OrderStatus, Sort, ModalType } from '@/constants'

export type LoginEmployeeArgs = {
    login: string
    password: string
}

export type EmployeeData = {
    id: number
    login: string
}

export type AxiosBaseQuery = {
    baseURL?: string
}

export type AxiosBaseQueryError = {
    status: number
    data: string
}

export type CallData = {
    id: number
    name: string
    tel: string
    created: string
    checked: string | null
}

export type PaginationType = {
    pages: number
    page: number
    perPage: number
    total: number
}

export type ListResponse<T> = {
    pagination: PaginationType
    data: T[]
}

export type GetCallsArgs = {
    id: string
    name: string
    tel: string
    page: number
    perPage: number
    from: string
    to: string
    apply: boolean
    filter: CallFilter
    sort: Sort
    sortBy: CallField
}

export type Endpoint = {
    href: string
    title: string
}

export type ServiceData = {
    id: number
    modelId: string
    componentId: string
    qualityId: string
    cost: number
}

export type OperationData = {
    id: number
    dateTime: string
    status: string
    orderId: number
    employeeId: number
    employee: EmployeeData
}

export type OrderData = {
    id: number
    serviceId: number
    name: string
    surname: string
    tel: string
    email: string
    cost: number
    created: string
    service: ServiceData
    operations: OperationData[]
}

export type GetOrdersArgs = {
    id: string
    name: string
    surname: string
    tel: string
    email: string
    modelId: string
    componentId: string
    qualityId: string
    page: number
    perPage: number
    filter: OrderFilter
    from: string
    to: string
    apply: boolean
    sort: Sort
}

export type GetServicesArgs = {
    modelId: string
    componentId: string
}

export type PatchOrderArgs = {
    modelId: string
    componentId: string
    qualityId: string
    id: number
    name: string
    surname: string
    tel: string
    email: string
    cost: number
    status: OrderStatus
}

export type CallStats = {
    all: number
    created: number
    checked: number
}

export type OrderStats = {
    all: number
    created: number
    processing: number
    done: number
    model: string
    component: string
}

export type ModalArgs = Partial<Omit<Modal, 'key'>>

export type AsyncModalArgs = Partial<AsyncModal & ModalArgs>

export type Modal = {
    key: number
    type: ModalType
    title?: string
    description?: string
}

export type AsyncModal = Modal & {
    milliSeconds?: number
}

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

export enum LoadingStatus {
    Idle = 'idle',
    Fetching = 'fetching',
    Fetched = 'fetched',
    Error = 'error',
}

export enum CallField {
    ID = 'id',
    Name = 'name',
    Tel = 'tel',
    Created = 'created',
    Checked = 'checked',
}

export enum CallFilter {
    All = 'all',
    Created = 'created',
    Checked = 'checked',
}

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

export type GetCallsArgs = Partial<{
    id: string
    name: string
    tel: string
    page: number
    perPage: number
    from: string
    to: string
    apply: boolean
}>

export type Endpoint = {
    href: string
    title: string
}

import { toOptions } from '@/utils'

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

export const CallTableHeaders = ['id', 'name', 'tel', 'created', 'checked'] // Headers for Calls Table

export const callsPerPage = [5, 10, 15, 20, 25]

export const callFilters = toOptions(CallFilter)

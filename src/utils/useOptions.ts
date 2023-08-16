'use client'
import { useMemo } from 'react'
import { baseIdConverter } from './stringConverter'

const emptyArray: string[] = []

export const useOptions = (array: string[] | undefined, converter: (x: string) => string = baseIdConverter) => {
    return useMemo(
        () =>
            array?.map(item => ({
                title: converter(item),
                value: item,
            })),
        [array, converter],
    )
}

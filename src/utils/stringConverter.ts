import { capitalizeFirstLetter } from './capitalizeFirstLetter'

export const baseIdConverter = (string: string) => capitalizeFirstLetter(string).split('-').join(' ')
export const modelIdConverter = (string: string) =>
    string
        .split('-')
        .map(word => capitalizeFirstLetter(word))
        .join(' ')
        .replace(/Ip/, 'iP')

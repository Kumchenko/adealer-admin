export const getDateTimeInputValue = (dateStr?: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toISOString().replace(/.{8}$/, '')
}

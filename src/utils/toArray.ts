export const toArray = (enumObj: Object) => {
    const values = Object.values(enumObj)
    return Object.keys(enumObj).map((key, index) => ({ key, value: values[index] }))
}

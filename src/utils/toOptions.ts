export const toOptions = (enumObj: Object) => {
    const values = Object.values(enumObj)
    return Object.keys(enumObj).map((key, index) => ({ title: key, value: values[index] }))
}

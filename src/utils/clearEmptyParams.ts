export const clearEmptyParams = (oldParams: { [key: string]: any } | null | undefined) => {
  if (!oldParams) return oldParams

  let params = oldParams
  for (const key of Object.keys(params)) {
    if (!params[key]) {
      delete params[key]
    }
  }
  return params
}

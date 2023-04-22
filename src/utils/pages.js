export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit)
}

//TODO: сделать хук usePagination на основе useMemo
export const getPagesArray = (totalPages) => {
  let result = []
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1)
  }

  return result
}

export const getOrdinalPerPage = (index: number, page: number, perPage: number) => {
  return (index + 1) + (page - 1) * perPage
} 
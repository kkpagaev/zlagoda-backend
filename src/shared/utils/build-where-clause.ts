export interface QueryAndParams {
  query: string
  params: any[]
}

export const buildWhereClause = <T>(where: Partial<T>): QueryAndParams => {
  const fields = Object.keys(where),
    params = Object.values(where)

  if (!fields.length) {
    return {
      query: "",
      params: [],
    }
  }

  const query =
    " WHERE " + fields.map((field, i) => `"${field}" = $${i + 1}`).join(" AND ")

  return {
    query,
    params,
  }
}

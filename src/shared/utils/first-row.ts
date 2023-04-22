import { QueryResult } from "pg"
import { nullable } from "pratica"

export const mapFirstRow =
  <T, U>(mapper: (row: T) => U) =>
  (result: QueryResult<T>) => {
    return (
      nullable(result.rows[0])
        .map((row) => mapper(row))
        .value() ?? null
    )
  }

import { CategoryEntity } from "./category.entity"

export class Category {
  public readonly number: number

  public readonly name: string

  public productsCount: number

  constructor(partial?: Partial<Category>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(row: CategoryEntity) {
    return new Category({
      number: row.category_number,
      name: row.category_name,
      productsCount: row.products_count
        ? parseFloat(row.products_count)
        : undefined,
    })
  }
}

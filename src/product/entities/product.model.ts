import { CategoryEntity } from "src/category/entities/category.entity"
import { ProductEntity } from "./product.entity"
import { Category } from "src/category/entities/category.model"

export class Product {
  id: number

  categoryNumber: number

  name: string

  characteristics: string

  category?: Category

  constructor(partial?: Partial<Product>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(row: ProductEntity, categoryRow?: CategoryEntity) {
    return new Product({
      id: row.id_product,
      name: row.product_name,
      characteristics: row.characteristics,
      categoryNumber: row.category_number,
      category: categoryRow && Category.fromRow(categoryRow),
    })
  }
}

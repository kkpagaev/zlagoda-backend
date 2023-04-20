import { ProductEntity } from "./product.entity"

export class Product {
  id: number

  categoryNumber: number

  name: string

  characteristics: string

  constructor(partial?: Partial<Product>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(row: ProductEntity) {
    return new Product({
      id: row.id_product,
      name: row.product_name,
      characteristics: row.characteristics,
      categoryNumber: row.category_number,
    })
  }
}

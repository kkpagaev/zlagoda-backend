import { Product } from "src/product/entities/product.model"
import { StoreProductEntity } from "./store-product.entity"
import { ProductEntity } from "src/product/entities/product.entity"

export class StoreProduct {
  upc: string

  upcProm: string

  productId: number

  sellingPrice: number

  numberOfProducts: number

  isPromotional: boolean

  product?: Product

  constructor(partial?: Partial<StoreProduct>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(row: StoreProductEntity, productRow?: ProductEntity) {
    return new StoreProduct({
      upc: row.UPC,
      upcProm: row.UPC_prom ?? undefined,
      productId: row.id_product,
      sellingPrice: parseFloat(row.selling_price),
      numberOfProducts: row.products_number,
      isPromotional: row.promotional_product,
      product: productRow ? Product.fromRow(productRow) : undefined,
    })
  }
}

import { StoreProductEntity } from "./store-product.entity"

export class StoreProduct {
  upc: string

  upcProm: string

  productId: number

  sellingPrice: number

  numberOfProducts: number

  isPromotional: boolean

  constructor(partial?: Partial<StoreProduct>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(row: StoreProductEntity) {
    return new StoreProduct({
      upc: row.UPC,
      upcProm: row.UPC_prom ?? undefined,
      productId: row.id_product,
      sellingPrice: parseFloat(row.selling_price),
      numberOfProducts: row.products_number,
      isPromotional: row.promotional_product,
    })
  }
}

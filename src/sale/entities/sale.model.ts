import { SaleEntity } from "./sale.entity"
import { StoreProduct } from "src/store-product/entities/store-product.model"
import { StoreProductEntity } from "src/store-product/entities/store-product.entity"
import { ProductEntity } from "src/product/entities/product.entity"

export class Sale {
  upc: string
  checkNumber: string
  sellingPrice: number
  amount: number
  storeProduct?: StoreProduct

  constructor(partial?: Partial<Sale>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(
    row: SaleEntity,
    storeProductRow?: StoreProductEntity,
    productRow?: ProductEntity,
  ) {
    return new Sale({
      upc: row.UPC,
      checkNumber: row.check_number,
      sellingPrice: parseFloat(row.selling_price),
      amount: row.product_number,
      storeProduct: storeProductRow
        ? StoreProduct.fromRow(storeProductRow, productRow)
        : undefined,
    })
  }
}

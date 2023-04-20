import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateStoreProductDto } from "./dto/create-store-product.dto"
import { UpdateStoreProductDto } from "./dto/update-store-product.dto"
import { StoreProductEntity } from "./entities/store-product.entity"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { StoreProduct } from "./entities/store-product.model"
import { nullable } from "pratica"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"

@Injectable()
export class StoreProductRepository {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public save({
    upc,
    upcProm,
    productId,
    sellingPrice,
    numberOfProducts,
    isPromotional,
  }: CreateStoreProductDto): Promise<StoreProduct> {
    return this.pool
      .query<StoreProductEntity>(
        `INSERT INTO "Store_Product" 
        ("UPC","UPC_prom","id_product","selling_price","products_number","promotional_product") 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          upc,
          upcProm,
          productId,
          sellingPrice,
          numberOfProducts,
          isPromotional,
        ],
      )
      .then((res) => StoreProduct.fromRow(res.rows[0]))
  }

  public findAll(): Promise<StoreProduct[]> {
    return this.pool
      .query<StoreProductEntity>(`SELECT * FROM "Store_Product"`)
      .then((res) => res.rows.map((row) => StoreProduct.fromRow(row)))
  }

  public findOne(upc: string): Promise<StoreProduct | null> {
    return this.pool
      .query<StoreProductEntity>(
        `SELECT * FROM "Store_Product" WHERE "UPC" = $1`,
        [upc],
      )
      .then(
        (res) =>
          nullable(res.rows[0])
            .map((row) => StoreProduct.fromRow(row))
            .value() ?? null,
      )
  }

  public findOneOrFail(upc: string): Promise<StoreProduct> {
    return this.findOne(upc).then(
      throwIfNoValue(() => new NotFoundException("Store Product not found")),
    )
  }

  public update(upc: string, updateProductDto: UpdateStoreProductDto) {
    return { id: upc, ...updateProductDto }
  }

  public remove(upc: string) {
    return this.pool
      .query(`DELETE FROM "Store_Product" WHERE "UPC" = $1`, [upc])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}

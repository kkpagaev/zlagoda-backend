import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { ProductEntity } from "./entities/product.entity"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { Product } from "./entities/product.model"
import { nullable } from "pratica"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"

@Injectable()
export class ProductRepository {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public save({
    name,
    characteristics,
    categoryNumber,
  }: CreateProductDto): Promise<Product> {
    return this.pool
      .query<ProductEntity>(
        `INSERT INTO "Product" 
        ("product_name", "characteristics", "category_number") 
        VALUES ($1, $2, $3) RETURNING *`,
        [name, characteristics, categoryNumber],
      )
      .then((res) => Product.fromRow(res.rows[0]))
  }

  public findAll(): Promise<Product[]> {
    return this.pool
      .query<ProductEntity>(`SELECT * FROM "Product"`)
      .then((res) => res.rows.map((row) => Product.fromRow(row)))
  }

  public findOne(id: number): Promise<Product | null> {
    return this.pool
      .query<ProductEntity>(`SELECT * FROM "Product" WHERE "id_product" = $1`, [
        id,
      ])
      .then(
        (res) =>
          nullable(res.rows[0])
            .map((row) => Product.fromRow(row))
            .value() ?? null,
      )
  }

  public findOneOrFail(id: number): Promise<Product> {
    return this.findOne(id).then(
      throwIfNoValue(() => new NotFoundException("Product not found")),
    )
  }

  public update(id: number, updateProductDto: UpdateProductDto) {
    return { id, ...updateProductDto }
  }

  public remove(id: number) {
    return this.pool
      .query(`DELETE FROM "Product" WHERE "Product_number" = $1`, [id])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}

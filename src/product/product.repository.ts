import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { ProductEntity } from "./entities/product.entity"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { Product } from "./entities/product.model"
import { nullable } from "pratica"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"
import { CategoryEntity } from "src/category/entities/category.entity"

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
      .query<ProductEntity & CategoryEntity>(
        `SELECT p.*, c.* FROM "Product" AS p 
        LEFT JOIN "Category" AS c ON c.category_number = p.category_number`,
      )
      .then((res) => res.rows.map((row) => Product.fromRow(row, row)))
  }

  public findOne(id: number): Promise<Product | null> {
    return this.pool
      .query<ProductEntity & CategoryEntity>(
        `SELECT p.*, c.*FROM "Product" AS p 
        LEFT JOIN "Category" AS c 
        ON c.category_number = p.category_number
        WHERE "id_product" = $1`,
        [id],
      )
      .then(
        (res) =>
          nullable(res.rows[0])
            .map((row) => Product.fromRow(row, row))
            .value() ?? null,
      )
  }

  public findOneOrFail(id: number): Promise<Product> {
    return this.findOne(id).then(
      throwIfNoValue(() => new NotFoundException("Product not found")),
    )
  }

  public update(id: number, dto: UpdateProductDto) {
    return this.pool
      .query<ProductEntity>(
        `UPDATE "Product" 
       SET "product_name" = $1, "characteristics" = $2, "category_number" = $3
       WHERE "id_product" = $4
       RETURNING *`,
        [dto.name, dto.characteristics, dto.categoryNumber, id],
      )
      .then((res) => Product.fromRow(res.rows[0]))
  }

  public remove(id: number) {
    return this.pool
      .query(`DELETE FROM "Product" WHERE "id_product" = $1`, [id])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}

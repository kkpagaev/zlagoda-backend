import { Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { Category } from "./entities/category.model"
import { nullable } from "pratica"
import { CategoryEntity } from "./entities/category.entity"

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public save(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.pool
      .query<CategoryEntity>(
        `INSERT INTO "Category" ("category_name") VALUES ($1) RETURNING *`,
        [createCategoryDto.name],
      )
      .then((res) => Category.fromRow(res.rows[0]))
  }

  public findAll(): Promise<Category[]> {
    return this.pool
      .query<CategoryEntity>(
        `SELECT * FROM "Category"
      ORDER BY category_name`,
      )
      .then((res) => res.rows.map((row) => Category.fromRow(row)))
  }

  public findAllWithProductCount(): Promise<Category[]> {
    return this.pool
      .query<CategoryEntity>(
        `SELECT c.category_number, c.category_name, COUNT(p.*) as products_count FROM "Category" c 
        LEFT JOIN "Product" p  ON p."category_number" = c."category_number"
        GROUP BY c.category_number, c.category_name
        ORDER BY category_name`,
      )
      .then((res) => res.rows.map((row) => Category.fromRow(row)))
  }

  public findOne(id: number): Promise<Category | null> {
    return this.pool
      .query<CategoryEntity>(
        `SELECT * FROM "Category" WHERE "category_number" = $1`,
        [id],
      )
      .then(
        (res) =>
          nullable(res.rows[0])
            .map((row) => Category.fromRow(row))
            .value() ?? null,
      )
  }

  public update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.pool
      .query<CategoryEntity>(
        `UPDATE "Category" SET "category_name" = $1 WHERE "category_number" = $2 RETURNING *`,
        [updateCategoryDto.name, id],
      )
      .then((res) => Category.fromRow(res.rows[0]))
  }

  public remove(id: number) {
    return this.pool
      .query(`DELETE FROM "Category" WHERE "category_number" = $1`, [id])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }

  public categoriesProductsCounts() {
    return this.pool
      .query(
        `SELECT
          c."category_number",
          c."category_name",
          SUM(sp."products_number") AS "products_number"
        FROM "Category" AS c
        LEFT JOIN "Product" AS p
        ON p."category_number" = c."category_number"
        LEFT JOIN "Store_Product" AS sp
        ON sp."id_product" = p."id_product"
        GROUP BY 1, 2
        ORDER BY "products_number" DESC`,
      )
      .then((res) => res.rows)
  }
}

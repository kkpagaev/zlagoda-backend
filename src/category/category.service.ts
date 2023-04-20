import { Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { Category } from "./entities/category.model"
import { nullable } from "pratica"
import { CategoryEntity } from "./entities/category.entity"

@Injectable()
export class CategoryService {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.pool
      .query<CategoryEntity>(
        `INSERT INTO "Category" ("category_name") VALUES ($1) RETURNING *`,
        [createCategoryDto.name],
      )
      .then((res) => Category.fromRow(res.rows[0]))
  }

  public findAll(): Promise<Category[]> {
    return this.pool
      .query<CategoryEntity>(`SELECT * FROM "Category"`)
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
    return { id, ...updateCategoryDto }
  }

  public remove(id: number) {
    return this.pool
      .query(`DELETE FROM "Category" WHERE "category_number" = $1`, [id])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}

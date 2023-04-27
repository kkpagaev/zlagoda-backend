import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateSaleDto } from "./dto/create-sale.dto"
import { UpdateSaleDto } from "./dto/update-sale.dto"
import { SaleEntity } from "./entities/sale.entity"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { Sale } from "./entities/sale.model"
import { nullable } from "pratica"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"
import { StoreProductEntity } from "src/store-product/entities/store-product.entity"
import { ProductEntity } from "src/product/entities/product.entity"

@Injectable()
export class SaleRepository {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public save(checkNumber: string, dto: CreateSaleDto): Promise<Sale> {
    return this.pool
      .query<SaleEntity>(
        `INSERT INTO "Sale" 
        ("check_number", "UPC", "selling_price", "product_number") 
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [checkNumber, dto.upc, dto.sellingPrice, dto.amount],
      )
      .then((res) => Sale.fromRow(res.rows[0]))
  }

  public saveMany(checkNumber: string, dtos: CreateSaleDto[]): Promise<Sale[]> {
    return Promise.all(
      dtos.map((dto) => {
        return this.save(checkNumber, dto)
      }),
    )
  }

  public findAll(): Promise<Sale[]> {
    return this.pool
      .query<SaleEntity & StoreProductEntity & ProductEntity>(
        `SELECT s.*, sp.*, p.* FROM "Sale" AS s
        LEFT JOIN "Store_Product" AS sp ON sp."UPC" = s."UPC"
        LEFT JOIN "Product" AS p ON sp.id_product = p.id_product`,
      )
      .then((res) => res.rows.map((row) => Sale.fromRow(row, row, row)))
  }

  public findAllForCheck(checkNumber: string): Promise<Sale[]> {
    return this.pool
      .query<SaleEntity & StoreProductEntity & ProductEntity>(
        `SELECT s.*, sp.*, p.* FROM "Sale" AS s
        LEFT JOIN "Store_Product" AS sp ON sp."UPC" = s."UPC"
        LEFT JOIN "Product" AS p ON sp.id_product = p.id_product
        WHERE s.check_number = $1`,
        [checkNumber],
      )
      .then((res) => res.rows.map((row) => Sale.fromRow(row, row, row)))
  }

  public findOne(checkNumber: string): Promise<Sale | null> {
    return this.pool
      .query<SaleEntity>(
        `SELECT s.*, sp.*, p.* FROM "Sale" AS s
      LEFT JOIN "Store_Product" AS sp ON sp."UPC" = s."UPC"
      LEFT JOIN "Product" AS p ON sp.id_product = p.id_product
      WHERE s.check_number = $1`,
        [checkNumber],
      )
      .then(
        (res) =>
          nullable(res.rows[0])
            .map((row) => Sale.fromRow(row))
            .value() ?? null,
      )
  }

  public findOneOrFail(checkNumber: string): Promise<Sale> {
    return this.findOne(checkNumber).then(
      throwIfNoValue(() => new NotFoundException("Check not found")),
    )
  }

  public update(checkNumber: string, updateCheckDto: UpdateSaleDto) {
    return { checkNumber, ...updateCheckDto }
  }

  public remove(checkNumber: string) {
    return this.pool
      .query(`DELETE FROM "Sale" WHERE "check_number" = $1`, [checkNumber])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}
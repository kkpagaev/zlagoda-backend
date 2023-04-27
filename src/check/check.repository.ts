import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateCheckDto } from "./dto/create-check.dto"
import { CheckEntity } from "./entities/check.entity"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { Check } from "./entities/check.model"
import { nullable } from "pratica"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"

@Injectable()
export class CheckRepository {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public save(dto: CreateCheckDto): Promise<Check> {
    return this.pool
      .query<CheckEntity>(
        `INSERT INTO "Check" 
        ("check_number", "id_employee", "card_number", "print_date", "sum_total", "vat") 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          dto.checkNumber,
          dto.employeeId,
          dto.cardNumber,
          dto.printDate,
          dto.sumTotal,
          dto.valueAddedTax,
        ],
      )
      .then((res) => Check.fromRow(res.rows[0]))
  }

  public findAll(): Promise<Check[]> {
    return this.pool
      .query<CheckEntity>(`SELECT * FROM "Check"`)
      .then((res) => res.rows.map((row) => Check.fromRow(row)))
  }

  public findOne(checkNumber: string): Promise<Check | null> {
    return this.pool
      .query<CheckEntity>(`SELECT * FROM "Check" WHERE "check_number" = $1`, [
        checkNumber,
      ])
      .then(
        (res) =>
          nullable(res.rows[0])
            .map((row) => Check.fromRow(row))
            .value() ?? null,
      )
  }

  public findOneOrFail(checkNumber: string): Promise<Check> {
    return this.findOne(checkNumber).then(
      throwIfNoValue(() => new NotFoundException("Check not found")),
    )
  }

  public remove(checkNumber: string) {
    return this.pool
      .query(`DELETE FROM "Check" WHERE "check_number" = $1`, [checkNumber])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}

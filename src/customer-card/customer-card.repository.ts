import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateCustomerCardDto } from "./dto/create-customer-card.dto"
import { UpdateCustomerCardDto } from "./dto/update-customer-card.dto"
import { CustomerCardEntity } from "./entities/customer-card.entity"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool } from "pg"
import { CustomerCard } from "./entities/customer-card.model"
import { nullable } from "pratica"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"

@Injectable()
export class CustomerCardRepository {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public save({
    cardNumber,
    customer: { name, surname, patronymic },
    address: { city, street, zipCode },
    phoneNumber,
    percent,
  }: CreateCustomerCardDto): Promise<CustomerCard> {
    return this.pool
      .query<CustomerCardEntity>(
        `INSERT INTO "Customer_Card" 
        ("card_number","cust_surname","cust_name","cust_patronymic",
        "phone_number","city","street","zip_code","percent") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          cardNumber,
          surname,
          name,
          patronymic,
          phoneNumber,
          city,
          street,
          zipCode,
          percent,
        ],
      )
      .then((res) => CustomerCard.fromRow(res.rows[0]))
  }

  public findAll(): Promise<CustomerCard[]> {
    return this.pool
      .query<CustomerCardEntity>(
        `SELECT * FROM "Customer_Card"
        ORDER BY "cust_surname"`,
      )
      .then((res) => res.rows.map((row) => CustomerCard.fromRow(row)))
  }

  public findOne(cardNumber: string): Promise<CustomerCard | null> {
    return this.pool
      .query<CustomerCardEntity>(
        `SELECT * FROM "Customer_Card" WHERE "card_number" = $1`,
        [cardNumber],
      )
      .then(
        (res) =>
          nullable(res.rows[0])
            .map((row) => CustomerCard.fromRow(row))
            .value() ?? null,
      )
  }

  public findOneOrFail(cardNumber: string): Promise<CustomerCard> {
    return this.findOne(cardNumber).then(
      throwIfNoValue(() => new NotFoundException("Customer Card not found")),
    )
  }

  public update(
    cardNumber: string,
    dto: UpdateCustomerCardDto,
  ): Promise<CustomerCard> {
    return this.pool
      .query<CustomerCardEntity>(
        `UPDATE "Customer_Card"
         SET "cust_surname" = $2,
             "cust_name" = $3,
             "cust_patronymic" = $4,
             "phone_number" = $5,
             "city" = $6,
             "street" = $7,
             "zip_code" = $8,
             "percent" = $9
         WHERE "card_number" = $1 RETURNING *`,
        [
          cardNumber,
          dto.customer.surname,
          dto.customer.name,
          dto.customer.patronymic,
          dto.phoneNumber,
          dto.address.city,
          dto.address.street,
          dto.address.zipCode,
          dto.percent,
        ],
      )
      .then((res) => CustomerCard.fromRow(res.rows[0]))
  }

  public remove(cardNumber: string) {
    return this.pool
      .query(`DELETE FROM "Customer_Card" WHERE "card_number" = $1`, [
        cardNumber,
      ])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}

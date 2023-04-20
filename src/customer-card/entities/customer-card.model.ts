import { CustomerCardEntity } from "./customer-card.entity"

export class CustomerCard {
  public cardNumber: string

  public customer: {
    surname: string

    name: string

    patronymic?: string
  }

  public phoneNumber: string

  public address: {
    city?: string

    street?: string

    zipCode?: string
  }

  public percent: number

  constructor(partial?: Partial<CustomerCard>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(row: CustomerCardEntity) {
    return new CustomerCard({
      cardNumber: row.card_number,
      customer: {
        name: row.cust_name,
        surname: row.cust_surname,
        patronymic: row.cust_patronymic ?? undefined,
      },
      phoneNumber: row.phone_number,
      address: {
        city: row.city ?? undefined,
        street: row.street ?? undefined,
        zipCode: row.zip_code ?? undefined,
      },
      percent: row.percent,
    })
  }
}

import { CheckEntity } from "./check.entity"

export class Check {
  checkNumber: string

  employeeId: string

  cardNumber?: string

  printDate: Date

  sumTotal: number

  valueAddedTax: number

  constructor(partial?: Partial<Check>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  public static fromRow(row: CheckEntity) {
    return new Check({
      checkNumber: row.check_number,
      employeeId: row.id_employee,
      cardNumber: row.card_number ?? undefined,
      printDate: row.print_date,
      sumTotal: parseFloat(row.sum_total),
      valueAddedTax: parseFloat(row.vat),
    })
  }
}

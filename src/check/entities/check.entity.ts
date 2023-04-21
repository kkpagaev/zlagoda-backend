type Decimal = string

export class CheckEntity {
  check_number: string
  id_employee: string
  card_number: string | null
  print_date: Date
  sum_total: Decimal
  vat: Decimal
}

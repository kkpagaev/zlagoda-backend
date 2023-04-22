export class EmployeeEntity {
  id_employee: string

  empl_surname: string
  empl_name: string
  empl_patronymic: string | null

  password: string

  role: string

  salary: string

  date_of_birth: Date
  date_of_start: Date

  phone_number: string

  city: string
  street: string
  zip_code: string
}

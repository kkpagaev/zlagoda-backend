import { Exclude } from "class-transformer"
import { EmployeeEntity } from "./employee.entity"

export enum Role {
  Cashier = "cashier",
  Manager = "manager",
}

export class Employee {
  id: string

  name: string

  surname: string

  patronymic: string

  @Exclude()
  password: string

  role: Role

  salary: number

  birthDate: Date

  startDate: Date

  phoneNumber: string

  city: string

  street: string

  zipCode: string

  constructor(partial: Partial<Employee>) {
    Object.assign(this, partial)
  }

  public static fromRow(row: EmployeeEntity) {
    return new Employee({
      id: row.id_employee,
      name: row.empl_name,
      surname: row.empl_surname,
      patronymic: row.empl_patronymic,
      birthDate: row.date_of_birth,
      startDate: row.date_of_start,
      password: row.password,
      phoneNumber: row.phone_number,
      role: row.role as Role,
      salary: parseFloat(row.salary),
      city: row.city,
      street: row.street,
      zipCode: row.zip_code,
    })
  }
}

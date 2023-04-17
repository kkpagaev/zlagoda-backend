import { Exclude } from "class-transformer"

export enum Role {
  User = "user",
  Admin = "admin",
  Moderator = "moderator",
}

export class Employee {
  id_employee: string

  empl_name: string

  empl_surname: string

  empl_patronymic: string

  @Exclude()
  password: string

  role: Role

  constructor(partial: Partial<Employee>) {
    Object.assign(this, partial)
  }
}

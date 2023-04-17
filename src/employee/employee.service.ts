import { Injectable, NotFoundException } from "@nestjs/common"
import { Pool } from "pg"
import { InjectDB } from "../db/inject-db.decorator"
import { CreateEmployeeDto } from "./dto/create-employee.dto"
import { UpdateEmployeeDto } from "./dto/update-employee.dto"
import { hash } from "bcrypt"
import { Employee, Role } from "./entities/employee.entity"

const BCRYPT_SALT_ROUNDS = 12

@Injectable()
export class EmployeeService {
  constructor(@InjectDB() private readonly db: Pool) {}

  private async hashPassword(password: string) {
    const newPassword = await hash(password, BCRYPT_SALT_ROUNDS)

    return newPassword
  }

  async create({
    empl_name,
    empl_surname,
    empl_patronymic,
    password,
  }: CreateEmployeeDto) {
    const newPassword = await this.hashPassword(password)
    // TODO generate id
    const id_employee = "1231231233"

    const empl = await this.db.query(
      "INSERT INTO Employee (id_employee, empl_name, empl_surname, empl_patronymic, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_employee, empl_name, empl_surname, empl_patronymic, newPassword],
    )

    return this.map(empl.rows[0])
  }

  async findAll() {
    return (await this.db.query("SELECT version()")).rows
  }

  async findOne(id: string) {
    const result = await this.db.query(
      "SELECT * FROM Employee WHERE id_employee = $1",
      [id],
    )
    if (result.rows.length === 0) {
      throw new NotFoundException("Employee not found")
    }

    const empl = this.map(result.rows[0])

    return empl
  }

  async findOneWithRole(id: string, role: Role) {
    const result = await this.db.query(
      `
SELECT * FROM Employee WHERE id_employee = $1 AND role = $2
ORDER BY id_employee ASC
`,
      [id, role],
    )

    if (result.rows.length === 0) {
      throw new NotFoundException("Employee not found")
    }

    const empl = this.map(result.rows[0])

    return empl
  }

  update(id: string, dto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`
  }

  remove(id: string) {
    return `This action removes a #${id} employee`
  }

  async findBySurname(surname: string) {
    const result = await this.db.query(
      "SELECT * FROM Employee WHERE empl_surname = $1",
      [surname],
    )
    if (result.rows.length === 0) {
      throw new NotFoundException("Employee not found")
    }

    const empl = this.map(result.rows[0])

    return empl
  }

  private map(empl: any): Employee {
    return new Employee({
      id_employee: empl.id_employee,
      empl_name: empl.empl_name,
      empl_surname: empl.empl_surname,
      empl_patronymic: empl.empl_patronymic,
      password: empl.password,
      role: empl.role,
    })
  }
}

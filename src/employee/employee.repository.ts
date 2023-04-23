import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateEmployeeDto } from "./dto/create-employee.dto"
import { UpdateEmployeeDto } from "./dto/update-employee.dto"
import { EmployeeEntity } from "./entities/employee.entity"
import { InjectDB } from "src/db/inject-db.decorator"
import { Pool, QueryResult } from "pg"
import { Employee, Role } from "./entities/employee.model"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"
import { buildWhereClause } from "src/shared/utils/build-where-clause"
import { mapFirstRow } from "src/shared/utils/first-row"

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectDB()
    private readonly pool: Pool,
  ) {}

  public save(dto: CreateEmployeeDto): Promise<Employee> {
    return this.pool
      .query<EmployeeEntity>(
        `INSERT INTO "Employee" 
        ("id_employee", "empl_surname", "empl_name","empl_patronymic", "password",
        "role", "salary", "date_of_birth", "date_of_start", 
        "phone_number", "city", "street", "zip_code")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [
          dto.id,
          dto.surname,
          dto.name,
          dto.patronymic,
          dto.password,
          dto.role,
          dto.salary,
          dto.birthDate,
          dto.startDate,
          dto.phoneNumber,
          dto.city,
          dto.street,
          dto.zipCode,
        ],
      )
      .then((res) => Employee.fromRow(res.rows[0]))
  }

  public findAll(): Promise<Employee[]> {
    return this.pool
      .query<EmployeeEntity>(`SELECT * FROM "Employee" ORDER BY "empl_surname"`)
      .then((res) => res.rows.map((row) => Employee.fromRow(row)))
  }

  public findAllByRole(role: Role): Promise<Employee[]> {
    return this.pool
      .query<EmployeeEntity>(
        `SELECT * FROM "Employee"
      WHERE "role" = $1
      ORDER BY "empl_surname"`,
        [role],
      )
      .then((res) => res.rows.map((row) => Employee.fromRow(row)))
  }

  public findBy(where: Partial<EmployeeEntity>): Promise<Employee[]> {
    return this.findByRaw(where).then((res) => res.rows.map(Employee.fromRow))
  }

  public findOneBy(where: Partial<EmployeeEntity>): Promise<Employee | null> {
    return this.findByRaw(where).then(mapFirstRow(Employee.fromRow))
  }

  public findOneByOrFail(
    where: Partial<EmployeeEntity>,
  ): Promise<Employee | null> {
    return this.findOneBy(where).then(
      throwIfNoValue(() => new NotFoundException("Employee not found")),
    )
  }

  private findByRaw(
    where: Partial<EmployeeEntity>,
  ): Promise<QueryResult<EmployeeEntity>> {
    const whereClause = buildWhereClause(where)

    return this.pool.query<EmployeeEntity>(
      `SELECT * FROM "Employee"${whereClause}`,
    )
  }

  public findOne(id: string): Promise<Employee | null> {
    return this.pool
      .query<EmployeeEntity>(
        `SELECT * FROM "Employee" WHERE "id_employee" = $1`,
        [id],
      )
      .then(mapFirstRow(Employee.fromRow))
  }

  public findOneOrFail(id: string): Promise<Employee> {
    return this.findOne(id).then(
      throwIfNoValue(() => new NotFoundException("Employee not found")),
    )
  }

  public update(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
    return this.pool
      .query<EmployeeEntity>(
        `UPDATE "Employee"
         SET "empl_surname" = $2,
             "empl_name" = $3,
             "empl_patronymic" = $4,
             "role" = $5,
             "salary" = $6,
             "date_of_birth" = $7,
             "date_of_start" = $8,
             "phone_number" = $9,
             "city" = $10,
             "street" = $11,
             "zip_code" = $12
         WHERE "id_employee" = $1 RETURNING *`,
        [
          id,
          dto.surname,
          dto.name,
          dto.patronymic,
          dto.role,
          dto.salary,
          dto.birthDate,
          dto.startDate,
          dto.phoneNumber,
          dto.city,
          dto.street,
          dto.zipCode,
        ],
      )
      .then((res) => Employee.fromRow(res.rows[0]))
  }

  public remove(id: string) {
    return this.pool
      .query(`DELETE FROM "Employee" WHERE "id_employee" = $1`, [id])
      .then((res) => ({
        affected: res.rowCount,
      }))
  }
}

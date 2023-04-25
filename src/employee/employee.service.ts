import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateEmployeeDto } from "./dto/create-employee.dto"
import { UpdateEmployeeDto } from "./dto/update-employee.dto"
import { hash } from "bcrypt"
import { Role } from "./entities/employee.model"
import { EmployeeRepository } from "./employee.repository"
import { EmployeeFilterQuery } from "./dto/filter-query.dto"
import { throwIfNoValue } from "src/shared/utils/throw-if-no-value"

const BCRYPT_SALT_ROUNDS = 12

@Injectable()
export class EmployeeService {
  constructor(private readonly repo: EmployeeRepository) {}

  private async hashPassword(password: string) {
    const newPassword = await hash(password, BCRYPT_SALT_ROUNDS)

    return newPassword
  }

  public async create(dto: CreateEmployeeDto) {
    const hashedPassword = await this.hashPassword(dto.password)

    return this.repo.save({ ...dto, password: hashedPassword })
  }

  public findAll(query: EmployeeFilterQuery) {
    if (query.role) {
      return this.repo.findAllByRole(query.role)
    }

    return this.repo.findAll()
  }

  public findOne(id: string) {
    return this.repo.findOneOrFail(id)
  }

  public findOneBySurname(surname: string) {
    return this.repo
      .findOneBySurname(surname)
      .then(
        throwIfNoValue(
          () => new NotFoundException("Employee with given surname not found"),
        ),
      )
  }

  public findOneWithRole(id: string, role: Role) {
    return this.repo.findOneByOrFail({
      id_employee: id,
      role: role,
    })
  }

  public update(id: string, dto: UpdateEmployeeDto) {
    return this.repo.update(id, dto)
  }

  public remove(id: string) {
    return this.repo.remove(id)
  }
}

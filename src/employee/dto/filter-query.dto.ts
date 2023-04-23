import { IsIn, IsOptional } from "class-validator"
import { Role } from "../entities/employee.model"

export class EmployeeFilterQuery {
  @IsIn([Role.Cashier, Role.Manager])
  @IsOptional()
  role?: Role
}

import { IsIn, IsOptional } from "class-validator"
import { Role } from "../entities/employee.model"
import { ApiProperty } from "@nestjs/swagger"

export class EmployeeFilterQuery {
  @IsIn([Role.Cashier, Role.Manager])
  @IsOptional()
  @ApiProperty()
  role?: Role
}

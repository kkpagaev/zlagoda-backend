import { UseGuards, applyDecorators } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger"
import { Role } from "src/employee/entities/employee.model"
import { Roles } from "./roles.decorator"
import { RolesGuard } from "./roles.guard"

export const AuthorizeFor = (...roles: Role[]) =>
  applyDecorators(ApiBearerAuth("jwt"), Roles(...roles), UseGuards(RolesGuard))

import { SetMetadata } from "@nestjs/common"
import { Role } from "../employee/entities/employee.model"

export const WithRole = (role: Role) => SetMetadata("role", role)

import { SetMetadata } from "@nestjs/common"
import { Role } from "../employee/entities/employee.entity"

export const WithRole = (role: Role) => SetMetadata("role", role)

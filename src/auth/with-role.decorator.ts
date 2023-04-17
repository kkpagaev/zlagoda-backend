import { SetMetadata } from "@nestjs/common"
import { Role } from "../user/entities/user.entity"

export const WithRole = (role: Role) => SetMetadata("role", role)

import { SetMetadata, UseGuards } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger"
import { Role } from "../user/entities/user.entity"
import { AuthGuard } from "./auth.guard"

export const RequireAuthentication = (...roles: Role[]): MethodDecorator => {
  return (target, key, descriptor) => {
    SetMetadata("roles", roles)
    ApiBearerAuth("jwt")(target, key, descriptor)
    UseGuards(AuthGuard)(target, key, descriptor)
  }
}

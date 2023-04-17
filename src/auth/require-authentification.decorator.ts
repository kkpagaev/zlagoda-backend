import { UseGuards } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger"
import { AuthGuard } from "./auth.guard"

export const RequireAuthentication = (): MethodDecorator => {
  return (target, key, descriptor) => {
    ApiBearerAuth("jwt")(target, key, descriptor)
    UseGuards(AuthGuard)(target, key, descriptor)
  }
}

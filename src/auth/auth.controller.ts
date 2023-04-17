import { Body, Controller, Post, Req } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/sign-in.dto"
import { RequireAuthentication } from "./require-authentification.decorator"
import { Request } from "express"
import { Role } from "../user/entities/user.entity"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  async signIn(@Body() { email, password }: SignInDto) {
    return await this.authService.signIn(email, password)
  }

  @Post("test")
  @RequireAuthentication(Role.Admin, Role.User)
  test(@Req() req: Request) {
    return req.user
  }
}

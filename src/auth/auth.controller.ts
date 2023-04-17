import { Body, Controller, Post, Req } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/sign-in.dto"
import { RequireAuthentication } from "./require-authentification.decorator"
import { Request } from "express"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  async signIn(@Body() { email, password }: SignInDto) {
    return await this.authService.signIn(email, password)
  }

  @Post("test")
  @RequireAuthentication()
  test(@Req() req: Request) {
    return req.user
  }
}

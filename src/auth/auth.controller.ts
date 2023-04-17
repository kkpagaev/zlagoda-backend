import { Body, Controller, Post, Req } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/sign-in.dto"
import { Request } from "express"
import { Role } from "../user/entities/user.entity"
import { Roles } from "./roles.decorator"
import { Public } from "./public.decorator"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @Public()
  async signIn(@Body() { email, password }: SignInDto) {
    return await this.authService.signIn(email, password)
  }

  @Post("test")
  @Roles(Role.Admin, Role.User)
  @ApiBearerAuth("jwt")
  test(@Req() req: Request) {
    return req.user
  }
}

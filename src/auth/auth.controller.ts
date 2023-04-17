import { Body, Controller, Post, Req } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/sign-in.dto"
import { Request } from "express"
import { Role } from "../user/entities/user.entity"
import { Public } from "./public.decorator"
import { WithRole } from "./with-role.decorator"

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
  @WithRole(Role.Admin)
  @ApiBearerAuth("jwt")
  test(@Req() req: Request) {
    return req.user
  }
}

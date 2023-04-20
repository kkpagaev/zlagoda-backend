import { Body, Controller, Post, Req } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/sign-in.dto"
import { Request } from "express"
import { Public } from "./public.decorator"
import { WithRole } from "./with-role.decorator"
import { Role } from "../employee/entities/employee.entity"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @Public()
  async signIn(@Body() { id_employee, password }: SignInDto) {
    return await this.authService.signIn(id_employee, password)
  }

  @Post("test")
  @WithRole(Role.User)
  @ApiBearerAuth("jwt")
  test(@Req() req: Request) {
    return (req as any).user
  }
}

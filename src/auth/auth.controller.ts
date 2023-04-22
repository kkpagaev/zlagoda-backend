import { Body, Controller, Post, Req } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/sign-in.dto"
import { Request } from "express"
import { Public } from "./public.decorator"
import { Role } from "../employee/entities/employee.model"
import { AuthorizeFor } from "./roles/authorize-for"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @Public()
  async signIn(@Body() { employeeId, password }: SignInDto) {
    return await this.authService.signIn(employeeId, password)
  }

  @Post("test")
  @AuthorizeFor(Role.Cashier)
  test(@Req() req: Request) {
    return (req as any).user
  }
}

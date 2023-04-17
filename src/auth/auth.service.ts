import { Injectable, UnauthorizedException } from "@nestjs/common"
import { compareSync } from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { EmployeeService } from "../employee/employee.service"

export interface JwtPayload {
  id_employee: string
}

@Injectable()
export class AuthService {
  constructor(
    private epmloyeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(id: string, pass: string): Promise<any> {
    try {
      const empl = await this.epmloyeeService.findOne(id)
      if (!empl || !compareSync(pass, empl.password)) {
        throw new UnauthorizedException("Invalid credentials")
      }

      const payload: JwtPayload = { id_employee: empl.id_employee }
      const accessToken = await this.jwtService.signAsync(payload)

      return {
        accessToken,
      }
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials")
    }
  }
}

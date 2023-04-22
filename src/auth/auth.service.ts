import { Injectable, UnauthorizedException } from "@nestjs/common"
import { compareSync } from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { EmployeeService } from "../employee/employee.service"

export interface JwtPayload {
  sub: string
}

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(id: string, pass: string): Promise<any> {
    try {
      const empl = await this.employeeService.findOne(id)
      if (!empl || !compareSync(pass, empl.password)) {
        throw new UnauthorizedException("Invalid credentials")
      }

      const payload: JwtPayload = { sub: empl.id }
      const accessToken = await this.jwtService.signAsync(payload)

      return {
        accessToken,
      }
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials")
    }
  }
}

import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { compareSync } from "bcrypt"
import { JwtService } from "@nestjs/jwt"

export interface JwtPayload {
  user_id: number
  email: string
}

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.users.findByEmail(email)
    if (!user || !compareSync(pass, user.password)) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const payload: JwtPayload = { user_id: user.id, email: user.email }
    const accessToken = await this.jwtService.signAsync(payload)

    return {
      accessToken,
    }
  }
}

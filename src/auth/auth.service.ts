import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { compareSync } from "bcrypt"

@Injectable()
export class AuthService {
  constructor(private users: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.users.findByEmail(email)
    if (!user || !compareSync(pass, user.password)) {
      throw new UnauthorizedException("Invalid credentials")
    }
    // TODO: return a JWT
    return user
  }
}

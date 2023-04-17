import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { UserService } from "../user/user.service"
import { JwtPayload } from "./auth.service"

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    config: ConfigService,
  ) {
    this.jwtSecret = config.get("JWT_SECRET")
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtSecret,
      })
      const user = await this.userService.findOneWithRoles(payload.user_id)
      request["user"] = user
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }
}

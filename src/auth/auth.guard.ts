import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { Role } from "../employee/entities/employee.model"
import { EmployeeService } from "../employee/employee.service"
import { JwtPayload } from "./auth.service"

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string

  constructor(
    private jwtService: JwtService,
    private emplService: EmployeeService,
    config: ConfigService,
    private reflector: Reflector,
  ) {
    this.jwtSecret = config.get("JWT_SECRET")
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler(),
    )

    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      return false
    }
    const role = this.reflector.get<Role>("role", context.getHandler())
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtSecret,
      })
      const empl = await this.emplService.findOneWithRole(
        payload.id_employee,
        role,
      )

      request["user"] = empl
    } catch (e) {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }
}

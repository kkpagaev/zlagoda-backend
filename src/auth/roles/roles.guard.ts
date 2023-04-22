import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Observable } from "rxjs"
import { Role } from "src/employee/entities/employee.model"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[] | undefined>(
      "roles",
      context.getHandler(),
    )

    if (!roles?.length) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.role)
  }

  private matchRoles(endpointRoles: Role[], employeeRole: Role): boolean {
    return endpointRoles.includes(employeeRole)
  }
}

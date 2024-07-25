import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomerRole } from 'src/customers/domain/customer-role.entity';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user.sub.role;

    return this.matchRoles(roles, userRole);
  }

  private matchRoles(
    allowedRoles: CustomerRole | CustomerRole[],
    userRole: CustomerRole,
  ) {
    return allowedRoles.includes(userRole);
  }
}

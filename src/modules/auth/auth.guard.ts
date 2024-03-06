import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/user-payload.interface';
import { RequestUser } from './interfaces/request-user.interface';
import { Reflector } from '@nestjs/core';
import { UserType } from '../user/enum/type-user.enum';
import { ROLES_KEY } from 'src/resources/decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestUser>();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException('Erro de autenticação');

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;

      if (!requiredRoles.some((role) => role === payload.typeUser))
        throw new ForbiddenException(
          'Permissão insuficiente para acessar esta rota',
        );
    } catch (error) {
      console.error(error);

      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException('JWT inválido');
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

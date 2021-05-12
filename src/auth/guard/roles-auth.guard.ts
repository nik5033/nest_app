import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../users/entities/users.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader: string = request.header('Cookie');
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const token = authHeader.split('=')[1];
    const user = this.jwtService.verify(token);
    return roles.includes(user.role);
  }
}

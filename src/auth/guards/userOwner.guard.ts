import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // viene del FirebaseAuthGuard
    const userIdParam = request.params.slum; // /users/:id

    // Si es admin → permitir edición
    if (user.role === 'ADMIN') return true;

    // Si intenta modificar su propio perfil → permitir
    if (user.uid === userIdParam) return true;

    throw new ForbiddenException('No tenés permiso para editar este usuario');
  }
}

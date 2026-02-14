import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly resourceService: any) {} // inyectás tu servicio aquí

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.slum;

    // buscar el recurso (manga, capítulo, lo que sea)
    const resource = await this.resourceService.findOne(resourceId);

    if (!resource) {
      throw new ForbiddenException('Resource not found');
    }

    // si es admin → permitir
    if (user.role === 'ADMIN') return true;

    // si es el dueño → permitir
    if (resource.ownerId === user.uid) return true;

    throw new ForbiddenException('You are not the owner of this resource');
  }
}
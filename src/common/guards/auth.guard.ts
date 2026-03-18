import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtener el request de la peticion
    const request = context.switchToHttp().getRequest<Request>();

    // Extraer el token del header
    const token = this.extractTokenFromHeader(request);

    // Si el token no existe lanzar error
    if (!token) throw new UnauthorizedException();

    // Si el token existe verificar el tiempo de expiracion
    const payload = await this.jwtService.verifyAsync(token);

    // Si el token es funcional agregar el payload al request
    request['user'] = payload;

    // Devolver el resultado
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

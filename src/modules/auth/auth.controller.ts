import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesion' })
  public login(): string {
    return this.authService.login();
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  public profile(): string {
    return 'Perfil del usuario';
  }
}

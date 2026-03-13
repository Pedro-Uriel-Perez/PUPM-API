import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre de usuario', example: 'juanperez' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Contraseña', example: '123456' })
  password: string;
}

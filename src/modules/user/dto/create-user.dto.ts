import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Apellido del usuario', example: 'Perez' })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ description: 'Nombre de usuario', example: 'juanperez' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'Contraseña', example: '123456' })
  password: string;
}

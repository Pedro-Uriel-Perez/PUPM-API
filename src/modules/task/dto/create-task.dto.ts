import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Nombre es requerido' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ description: 'Nombre de la tarea', example: 'Mi tarea' })
  name: string;

  @IsString({ message: 'Descripcion es requerida' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({
    description: 'Descripcion de la tarea',
    example: 'Completar el proyecto',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Prioridad de la tarea', example: 1 })
  priority: number;

  @IsNumber()
  @IsInt()
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  user_id: number;
}

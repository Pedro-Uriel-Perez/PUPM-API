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
  name: string;

  @IsString({ message: 'Descripcion es requerida' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  priority: number;

  @IsNumber()
  @IsInt()
  user_id: number;
}

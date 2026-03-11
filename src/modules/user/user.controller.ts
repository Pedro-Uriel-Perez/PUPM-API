import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilService } from 'src/common/services/util.service';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userSvc: UserService,
    private readonly utilSvc: UtilService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  public async getUsers() {
    return await this.userSvc.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userSvc.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  public async insertUser(@Body() user: CreateUserDto) {
    return await this.userSvc.insertUser(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return await this.userSvc.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  public async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userSvc.deleteUser(id);
    return { deleted: true, message: 'Usuario eliminado correctamente' };
  }
}

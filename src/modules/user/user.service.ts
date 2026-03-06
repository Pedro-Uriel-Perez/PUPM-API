import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async createUser(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    await this.getUserById(id);
    return await this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}

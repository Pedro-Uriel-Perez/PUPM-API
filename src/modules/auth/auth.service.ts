import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { LoginDto } from './dto/login.dto';
import { UtilService } from '../../common/services/util.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private utilSvc: UtilService,
  ) {}

  async login(dto: LoginDto): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) throw new UnauthorizedException();

    const isValid = await this.utilSvc.checkPassword(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };

    const access_token = await this.jwtService.signAsync(payload);

    const refresh_token = this.utilSvc.generateToken(payload, '7d');
    const hashedRefreshToken = await this.utilSvc.hashPassword(refresh_token);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { hash: hashedRefreshToken },
    });

    return { access_token, refresh_token };
  }

  async refresh(userId: number, refreshToken: string): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.hash) throw new UnauthorizedException();

    const isValid = await this.utilSvc.checkPassword(refreshToken, user.hash);
    if (!isValid) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  async logout(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hash: null },
    });
  }
}

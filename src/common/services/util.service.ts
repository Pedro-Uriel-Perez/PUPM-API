import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {
  constructor(private jwtService: JwtService) {}

  public async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public async checkPassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }

  public generateToken(payload: object, expiresIn: JwtSignOptions['expiresIn']): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  public getPayload(token: string): object {
    return this.jwtService.decode(token);
  }
}

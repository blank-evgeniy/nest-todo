import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './types/auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      void password;

      return result;
    }

    return null;
  }

  login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './types/auth.types';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: DatabaseService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const { password, ...result } = user;

      return result;
    } catch (_error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: Prisma.UserCreateInput) {
    try {
      const existingUser = await this.userService.findOneByEmail(createUserDto.email);

      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const userData = { ...createUserDto, password: hashedPassword };

      const user = await this.prisma.user.create({
        data: userData,
      });

      const payload: JwtPayload = { email: user.email, sub: user.id, name: user.name };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Error registering user');
    }
  }
}

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: Prisma.UserCreateInput) {
    return this.authService.register(registerDto);
  }
}

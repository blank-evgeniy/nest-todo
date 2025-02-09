import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserProfile } from './types/user.types';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class UserProfileController {
  @Get()
  findOne(@Request() req: { user: UserProfile }) {
    return req.user;
  }
}

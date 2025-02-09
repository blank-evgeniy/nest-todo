import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfileController } from './user-profile.controller';

@Module({
  controllers: [UserController, UserProfileController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

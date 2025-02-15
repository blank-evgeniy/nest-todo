import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UserProfile } from './types/user.types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(id: number): Promise<UserProfile | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

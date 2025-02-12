import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/types/auth.types';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodoOwnershipGuard implements CanActivate {
  constructor(private readonly prisma: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user.id;
    const todoId = request.params.id;

    const todo = await this.prisma.toDo.findUnique({ where: { id: Number(todoId) } });

    if (!todo || todo.authorId !== userId) {
      throw new ForbiddenException('You do not have permission to access this ToDo');
    }

    return true;
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: DatabaseService) {}

  async findUserTodos(authorId: number) {
    return this.prisma.toDo.findMany({ where: { authorId } });
  }

  async findOneById(id: number) {
    return this.prisma.toDo.findUnique({ where: { id } });
  }

  async createTodo(
    authorId: number,
    createToDoDto: Omit<Prisma.ToDoCreateInput, 'author' | 'authorId'>
  ) {
    const data = {
      ...createToDoDto,
      authorId,
    };

    return this.prisma.toDo.create({ data });
  }

  async updateTodo(id: number, updateToDoDto: Prisma.ToDoUpdateInput) {
    return this.prisma.toDo.update({ where: { id }, data: updateToDoDto });
  }

  async deleteTodo(id: number) {
    return this.prisma.toDo.delete({ where: { id } });
  }
}

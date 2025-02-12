import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TodoService } from './todo.service';
import { UserProfile } from 'src/user/types/user.types';
import { TodoOwnershipGuard } from './todo-ownership.guard';
import { Prisma } from '@prisma/client';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findUserTodos(@Request() req: { user: UserProfile }) {
    return this.todoService.findUserTodos(req.user.id);
  }

  @UseGuards(TodoOwnershipGuard)
  @Get(':id')
  async findTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findOneById(id);
  }

  @Post()
  async createTodo(
    @Body() createTodoDto: Prisma.ToDoCreateInput,
    @Request() req: { user: UserProfile }
  ) {
    return this.todoService.createTodo(req.user.id, createTodoDto);
  }

  @UseGuards(TodoOwnershipGuard)
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: Prisma.ToDoUpdateInput
  ) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @UseGuards(TodoOwnershipGuard)
  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}

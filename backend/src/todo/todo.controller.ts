import { Controller, Delete, Get, Post, Body, ValidationPipe, Patch, Param, UseGuards, HttpException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from 'src/Dtos/todo.dto';
import { TodoValidationPipe } from 'src/Pipes/todoValidationPipe';
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/Decorators/user.decorator";
import { UserEntity } from 'src/Entities/user.entity';

@UseGuards(AuthGuard())
@Controller('todos')
export class TodoController { 
    constructor(
        private readonly todoService: TodoService
    ) {}

    @Get("getAll")
    getAllTodos(
        @User() user: UserEntity
    ) {
        return this.todoService.getAllTodos(user);
    }

    @Post("create")
    createTodo(
        @Body(ValidationPipe) data: TodoDto,
        @User() user: UserEntity
    ) {
        return this.todoService.createTodo(data, user);
    }

    @Patch("update/:id")
    updateTodo(
        @Param("id") id: number,
        @Body(TodoValidationPipe) data: TodoDto,
        @User() user: UserEntity
    ) {
        return this.todoService.updateTodo(id, data, user);
    }

    @Delete("delete/:id")
    deleteTodo(
        @Param("id") id: number,
        @User() user: UserEntity

    ) {
        return this.todoService.deleteTodo(id, user);
    }
}
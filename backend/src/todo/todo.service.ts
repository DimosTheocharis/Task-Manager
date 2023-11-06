import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TodoDto } from 'src/Dtos/todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entities/todo.entity';
import { UserEntity } from 'src/Entities/user.entity';
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity) private repository: Repository<TodoEntity>
    ) { }

    async getAllTodos(user: UserEntity) {
        const query = this.repository.createQueryBuilder("todo");
        query.where(`todo.userID = :userID`, { userID: user.userID });

        try {
            return await query.getMany();
        } catch (error) {
            throw new NotFoundException("Todos not found");
        }
    }

    async createTodo(todoDto: TodoDto, user: UserEntity) {
        const newTodo: TodoEntity = new TodoEntity();
        const { title, description } = todoDto;
        newTodo.title = title;
        newTodo.description = description;
        newTodo.status = TodoStatus.OPEN;
        newTodo.userID = user.userID;

        this.repository.create(newTodo);
        try {
            return await this.repository.save(newTodo);
        } catch (error) {
            throw new InternalServerErrorException("Something went wrong the the creation of the todo");
        }
    }

    async updateTodo(todoID: number, data: TodoDto, user: UserEntity) {
        const todoToUpdate = await this.repository.findOne({ where: { todoID: todoID, userID: user.userID } });
        if (!todoToUpdate) {
            throw new NotFoundException(`Todo with id: ${todoID} was not found!`);
        }
        todoToUpdate.title = data.title;
        todoToUpdate.description = data.description;
        todoToUpdate.status = data.status;

        try {
            return await this.repository.save(todoToUpdate);
        } catch (error) {
            throw new InternalServerErrorException(`Something went wrong with the updation of the todo with id: ${todoID}!`);
        }
    }

    async deleteTodo(todoID: number, user: UserEntity) {
        const todoToDelete: TodoEntity = await this.repository.findOne({ where: { todoID: todoID, userID: user.userID } });
        if (!todoToDelete) {
            throw new NotFoundException(`Todo with id: ${todoID} was not found!`);
        }

        try {
            return await this.repository.remove(todoToDelete);
        } catch (error) {
            throw new InternalServerErrorException(`Something went wrong with the deletion of the todo with id: ${todoID}!`);
        }
    }
}

import { IsNotEmpty, MaxLength } from "class-validator";
import { TodoStatus } from "src/Entities/todo.entity";

export class TodoDto {
    @IsNotEmpty()
    @MaxLength(30, { message: "Title should consist of 30 characters at most" })
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    status: TodoStatus;
}
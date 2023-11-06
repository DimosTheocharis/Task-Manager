import { TodoStatus } from "../Models/todo";

export class TodoDto {
    title!: string;
    description!: string;
    status: TodoStatus = TodoStatus.OPEN;
}
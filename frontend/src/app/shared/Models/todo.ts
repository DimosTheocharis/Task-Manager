export class TodoEntity {
    todoID!: number;
    title!: string;
    description!: string;
    status!: TodoStatus;
    userID!: number;
}

export enum TodoStatus {
    OPEN = "OPEN",
    "IN PROGRESS" = "IN PROGRESS",
    COMPLETED = "COMPLETED"
}
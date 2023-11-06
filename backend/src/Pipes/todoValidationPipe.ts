import { ArgumentMetadata, PipeTransform, BadRequestException } from "@nestjs/common";
import { TodoDto } from "src/Dtos/todo.dto";
import { TodoStatus } from "src/Entities/todo.entity";

export class TodoValidationPipe implements PipeTransform {
    private readonly allowedStatus: TodoStatus[] = [TodoStatus.OPEN, TodoStatus["IN PROGRESS"], TodoStatus.COMPLETED];

    transform(value: TodoDto, metadata: ArgumentMetadata) {

        if (!this.isValid(value.status)) {
            throw new BadRequestException("The status of the todo is not valid!");
        }

        return value;
    }

    private isValid(status: TodoStatus) {
        const index: number = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    userID: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(
        () => TodoEntity, 
        (todo) => todo.user   
    )
    todos: TodoEntity[];
}
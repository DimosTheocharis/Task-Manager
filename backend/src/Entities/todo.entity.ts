import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("todo")
export class TodoEntity {
    @PrimaryGeneratedColumn()
    todoID: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TodoStatus;

    @Column()
    userID: number;

    @ManyToOne(
        () => UserEntity,
        (user) => user.todos
    )
    // Λέει ότι το join column είναι το propertyName + referencedColumnName και αποθηκεύεται στο table todo
    // επειδή έχει οριστεί το name, τότε κάνει overwrite το παραπάνω και το join column θα ονομαστεί "userID" αντί για userUserID 
    @JoinColumn({
        name: "userID",
        referencedColumnName: "userID" // # by default, to referencedColumnName είναι το primaryKey του target 
    })
    user: UserEntity;
}

export enum TodoStatus {
    OPEN = "OPEN",
    "IN PROGRESS" = "IN PROGRESS",
    COMPLETED = "COMPLETED"
}
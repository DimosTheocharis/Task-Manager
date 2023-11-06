import { TodoDto } from '../shared/Dtos/todo';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, Observable, catchError } from "rxjs";
import { TodoEntity } from "../shared/Models/todo";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: "root"
})
export class TodoService {
    private apiUrl: string = "http://localhost:3000/api";
    constructor(
        private http: HttpClient
    ) { }

    getTodos(): Observable<TodoEntity[]> {
        return this.http.get<TodoEntity[]>(`${this.apiUrl}/todos/getAll`, httpOptions);
    }

    createTodo(todoDto: TodoDto): Observable<TodoEntity> {
        return this.http.post<TodoEntity>(`${this.apiUrl}/todos/create`, todoDto, httpOptions);
    }

    updateTodo(todoDto: TodoDto, todoID: number): Observable<TodoEntity> {
        return this.http.patch<TodoEntity>(`${this.apiUrl}/todos/update/${todoID}`, todoDto, httpOptions);
    }

    deleteTodo(todoID: number): Observable<TodoEntity> {
        return this.http.delete<TodoEntity>(`${this.apiUrl}/todos/delete/${todoID}`, httpOptions);
    }
}
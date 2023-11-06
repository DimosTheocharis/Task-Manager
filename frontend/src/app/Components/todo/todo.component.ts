import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoEntity } from 'src/app/shared/Models/todo';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo!: TodoEntity;
  @Output() onEdit: EventEmitter<string> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onTodoEdit() {
    this.onEdit.emit("edit");
  }

  onTodoDelete() {
    this.onDelete.emit("emit");
  }
}

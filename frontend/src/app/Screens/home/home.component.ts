import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { TodoEntity } from 'src/app/shared/Models/todo';
import { TodoService } from 'src/app/Services/todo.service';
import { TodoDto } from 'src/app/shared/Dtos/todo';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public todoForm!: FormGroup;
  public todos!: TodoEntity[];
  public filteredTodos!: TodoEntity[];
  public isOld: boolean = false;
  public selectedTodo!: TodoEntity | null;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private todoService: TodoService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.buildPopupTodoForm();

    this.fetchTodos();
  }

  buildPopupTodoForm() {
    this.todoForm = this.fb.group({
      title: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
      status: new FormControl("OPEN", [Validators.required])
    })
  }

  resetPopupTodoForm() {
    this.todoForm.reset();
    this.todoForm.patchValue({
      title: null,
      description: null,
      status: "OPEN"
    })
  }

  populatePopupTodoForm(todo: TodoEntity) {
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      status: todo.status
    })

    this.todoForm.controls['title'].markAsDirty();
    this.todoForm.controls['description'].markAsDirty();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe(
      (data: TodoEntity[]) => {
        if (data) {
          this.todos = data;
          this.filteredTodos = [...data];
        }
      }
    )
  }

  onChangeTodoStatus(event: any) {
    if (event.target.value === "ALL") {
      this.filteredTodos = [...this.todos];
    } else {
      this.filteredTodos = this.todos.filter((todo: TodoEntity) => {
        return todo.status === event.target.value;
      })
    }
  }

  onTodoInsert(popup: any) {
    this.isOld = false;
    this.selectedTodo = null;
    this.resetPopupTodoForm();
    this.modalService.open(popup, { ariaLabelledBy: "modal-window-insert-todo", size: "md" })
      .result.then(
        (result) => {
          const todoDto = new TodoDto();
          todoDto.title = this.todoForm.value["title"];
          todoDto.description = this.todoForm.value["description"];

          this.todoService.createTodo(todoDto).subscribe({
            next: (data: TodoEntity) => {
              this.toastr.success("Todo created successfully!", "", { timeOut: 1000 });
              this.fetchTodos();
            },
            error: (error: any) => {
              console.log(error);
              this.toastr.error("Something went wrong during the creation of the todo!", "", { timeOut: 1000 });
            }
          })
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
  }

  onTodoEdit(popup: any, todo: TodoEntity, event: any) {
    if (event !== "edit") {
      return;
    }

    this.isOld = true;
    this.selectedTodo = todo;
    this.populatePopupTodoForm(todo);
    this.modalService.open(popup, { ariaLabelledBy: "modal-window-edit-todo", size: "md" })
      .result.then(
        (result) => {
          const todoDto = new TodoDto();
          todoDto.title = this.todoForm.value["title"];
          todoDto.description = this.todoForm.value["description"];
          todoDto.status = this.todoForm.value["status"];

          this.todoService.updateTodo(todoDto, todo.todoID).subscribe({
            next: (data) => {
              this.toastr.success("Todo created successfully!", "", { timeOut: 1000 });
              this.fetchTodos();
            },
            error: (error: any) => {
              this.toastr.error("Something went wrong during the processing of the todo!", "", { timeOut: 1000 });
            }
          })
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
  }

  onTodoDelete(popup: any, todo: TodoEntity) {
    this.selectedTodo = todo;

    this.modalService.open(popup, { ariaLabelledBy: "modal-window-delete-todo", size: "md" })
      .result.then(
        (result) => {
          this.todoService.deleteTodo(this.selectedTodo!.todoID).subscribe({
            next: (data) => {
              this.toastr.success("Todo deleted successfully!", "", { timeOut: 1000 });
              this.fetchTodos();
            },
            error: (error: any) => {
              console.error(error);
              this.toastr.error("Something went wrong during the deletion of the todo!", "Todo Deletion Failed", { timeOut: 1000 });
            }
          })
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      )
  }
}

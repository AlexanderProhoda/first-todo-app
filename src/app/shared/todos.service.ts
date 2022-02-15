import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { Todo } from "../interfaces/todo.interface"

@Injectable({providedIn: 'root'})
export class TodosService {
    public todos: Todo[] = []

    constructor(public http: HttpClient) {}

    fetchTodos(): Observable<Todo[]> {
        const todos = localStorage.getItem('todos')
        if (todos) {
          return of(JSON.parse(todos))
          .pipe(tap( todos => this.todos = todos))
        } else return of([])
    
    }

      onToggle(id: number){
        const idx = this.todos.findIndex(t => t.id ===id)
        this.todos[idx].completed = !this.todos[idx].completed
        this.setTodosToLocalStorage();
      }

      removeTodo(id: number) {
        this.todos = this.todos.filter(t => t.id != id)
        this.setTodosToLocalStorage();
      }

      addTodo(todo: Todo) {
        this.todos.push(todo);
        this.setTodosToLocalStorage();
      }

      setTodosToLocalStorage() {
        const todos = JSON.stringify(this.todos)
        localStorage.setItem('todos', todos)
      }
}
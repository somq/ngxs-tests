import { Action } from '@ngxs/store';
import { Todo } from './todos.model';

let currentId = 1;

export class AddTodo {
  static readonly type = '[Todo] Add Todo';
  id: number;
  constructor(public payload: Todo) {
    payload.id = currentId++;
  }
}

export class AddTodoAsync {
  static readonly type = '[Todo] Add Todo Async';
  constructor(public payload: Todo) {
    payload.id = currentId++;
  }
}

export class ToggleTodo {
  static readonly type = '[Todo] Toggle Todo';
  constructor(public payload: { id: number, text: string  }) {}
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete Todo';
  constructor(public payload: { id: number }) {}
}
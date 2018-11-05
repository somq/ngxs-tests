import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as actions from './todos.actions';
import { Todo } from './todos.model';

import { Observable, timer, of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { SetError } from '../errors/errors.actions';

@State<Array<Todo>>({
  name: 'todos', 
  defaults: []
})
export class TodosState {
  @Action(actions.AddTodo)
  AddTodo(
    store: StateContext<Array<Todo>>, 
    action: actions.AddTodo
  ) {
    const todos = store.getState();
    store.setState(todos.concat(action.payload));
  } 

  @Action(actions.ToggleTodo)
  ToggleTodo(
    store: StateContext<Array<Todo>>, 
    action: actions.ToggleTodo
  ) {
    console.log(`action: `, action);
    const todos = store.getState();
    store.setState(this.toggleTodo(todos, action));
  } 

  @Action(actions.DeleteTodo)
  DeleteTodo(
    store: StateContext<Array<Todo>>, 
    action: actions.DeleteTodo
  ) {
    const todos = store.getState();
    store.setState(todos.filter(todo => todo.id != action.payload.id));
  } 

  @Action(actions.AddTodoAsync)
  AddTodoAsync(
    store: StateContext<Array<Todo>>, 
    action: actions.AddTodoAsync
  ) {
    return timer(2000).pipe(
      map(() => {
        throw (new Error(`${action.payload.text} failed`));
        const todos = store.getState();
        store.setState(todos.concat(action.payload));
      }),
      catchError(error => store.dispatch(new SetError({ error })))
    )
  } 

  private toggleTodo(todos, action){
    console.log(`todos, action: `, todos, action);
    todos[0].text = 'adadadad'
    const newArray = [...todos]
    return newArray
    // return todos.map(todo => {
    //   //skip other items
    //   if (todo.id !== action.payload.id)
    //     return todo;
    //   //toggle
    //   return {
    //     id: todo.id,
    //     // text: action.payload.text,
    //     text: todo.text,
    //     completed: todo.completed
    //   };
    // });
  }
}
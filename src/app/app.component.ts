import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select, Actions, ofActionErrored, ofActionDispatched } from '@ngxs/store';
import { Todo } from './store/todos/todos.model';
import { BaseError } from './store/errors/errors.model';
import * as fromTodos from './store/todos/todos.actions';
import * as fromFilter from './store/filter/filter.actions';
import { SetError } from './store/errors/errors.actions';

import { trigger, state, style, transition, animate, useAnimation, keyframes } from '@angular/animations';
import { bounceInLeft, bounceOutRight } from 'ng-animate';

export const deviceCardAnimation = trigger('deviceCardAnimation', [
  transition('void => *', useAnimation(bounceInLeft, {params: { timing: 2, delay: 0 }})),
  transition('* => void', useAnimation(bounceOutRight, {params: { timing: 0.7, delay: 0 }})),
])
// export const deviceCardAnimation = trigger('deviceCardAnimation', [
  // transition('void => *', useAnimation(bounceInLeft, {params: { timing: 2, delay: 0 }})),
  // transition('* => void', useAnimation(bounceOutRight, {params: { timing: 0.7, delay: 0 }})),
  
//   state('incoming', style({
//     height: '200px',
//     opacity: 1,
//     backgroundColor: 'yellow'
//   })),
//   state('outgoing', style({
//     height: '100px',
//     opacity: 0.5,
//     backgroundColor: 'green'
//   })),
//   transition('incoming => outgoing', useAnimation(bounceInLeft, {params: { timing: 2, delay: 0 }})),
//   transition('outgoing => incoming', useAnimation(bounceOutRight, {params: { timing: 0.7, delay: 0 }})),
// ])

const deviceCardAnimation = [
  trigger('deviceCardAnimation', [
    transition('void => test', useAnimation(bounceInLeft, {params: { timing: 2, delay: 0 }})),
    transition('* => void', useAnimation(bounceOutRight, {params: { timing: 0.7, delay: 0 }})),
  ])
  trigger('deviceCardAnimation', [
    transition("void => dont", [
      // animate(3000, keyframes([
      //   style({transform: 'translateX(100%)', opacity: 0}),
      //   style({transform: 'translateX(0)', opacity: 1})
      // ]))
      ]
    )
  ]),
]

@Component({
  selector: 'my-app',
  template: `
    <div>
      <div>
        <input #todo (keydown.enter)="addTodo(todo)">
        <button (click)="addTodo(todo)">Add todo</button>
        <button (click)="addTodoAsync(todo)">Add todo (async)</button>
      </div>
      <ul   >
        <li [@deviceCardAnimation]="'test'" style="background:red; margin-top: 5px;" *ngFor="let todo of todos | async | visibleTodos:currentFilter" (click)="onTodoClick(todo.id)"
          [style.textDecoration]="todo.completed?'line-through':'none'">
          {{todo.text}} <a href="#" (click)="removeTodo(todo.id)">x</a>
        </li>
      </ul>
      <p>Show: 
        <a href="#" 
          (click)="applyFilter('SHOW_ALL');"
          [ngClass]="{'active': currentFilter==='SHOW_ALL', 'inactive': currentFilter!='SHOW_ALL'}">All</a>&nbsp;
        <a href="#" 
          (click)="applyFilter('SHOW_ACTIVE');"
          [ngClass]="{'active': currentFilter==='SHOW_ACTIVE', 'inactive': currentFilter!='SHOW_ACTIVE'}">Active</a>&nbsp; 
        <a href="#" 
          (click)="applyFilter('SHOW_COMPLETED');"
          [ngClass]="{'active': currentFilter==='SHOW_COMPLETED', 'inactive': currentFilter!='SHOW_COMPLETED'}">Completed</a>
      </p>
      <div *ngFor="let error of errors | async">{{error.message}}</div>
    </div>
  `,
    animations: [deviceCardAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  @Select(state => state.counter) counter: Observable<number>;

  @Select(state => state.todos) todos: Observable<Array<Todo>>;
  //@Select(state => state.filter) currentFilter: Observable<String>;
  @Select(state => state.errors) errors: Observable<Array<BaseError>>;
  currentFilter: string;

  constructor(
    private _store: Store,
    private actions$: Actions
  ) { 
    this._store.select(state => state.filter).subscribe(filter => {
      this.currentFilter = filter;
    });

    this.actions$.pipe(
      ofActionErrored(fromTodos.AddTodoAsync))
      .subscribe(action => { 
        console.log(`AddTodoAsync Action failed`);
      });
  }

  private addTodo(input) {
    if (input.value.length === 0) return;
    this._store.dispatch(
      new fromTodos.AddTodo(
        <Todo>{ text: input.value, completed: false }
      )
    );
    input.value = '';

    /**
    setTimeout(() => {
    this._store.dispatch(
      new fromTodos.AddTodo(
        <Todo>{ text: 'eeeeeee', completed: false }
      )
    )
    ,2000})
    setTimeout(() => {
    this._store.dispatch(
      new fromTodos.AddTodo(
        <Todo>{ text: 'zzz', completed: false }
      )
    )
    ,3000})
    */
  }

  private addTodoAsync(input) {
    this._store.dispatch(
      new fromTodos.AddTodoAsync(
        <Todo>{ text: input.value, completed: false }
      )
    );
    input.value = '';
  }

  private onTodoClick(id) {
    this._store.dispatch(
      new fromTodos.ToggleTodo({id, text: Math.random().toString(36).substring(7)})
    );
  }
  private removeTodo(id) {
    this._store.dispatch(
      new fromTodos.DeleteTodo(<Todo>{ id })
    );
  }

  private applyFilter(filter) {
    this._store.dispatch(
      new fromFilter.SetCurrentFilter({ filter })
    );
  }

  getAnimation(o) {
    console.log(o)
   const flag = false
   if(flag) {
     return 'deviceCardAnimationx'
   } else {
    return null;
   }
  }
}
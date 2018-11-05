import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CounterComponent } from './counter/counter.component';

import { NgxsModule, State, Action, StateContext } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TodosState } from './store/todos/todos.state';
import { FilterState } from './store/filter/filter.state';
import { ErrorsState } from './store/errors/errors.state';
import { VisibleTodosPipe } from './visibleTodosPipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    NgxsModule.forRoot([TodosState, FilterState, ErrorsState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
     BrowserAnimationsModule
  ],
  declarations: [ AppComponent, HelloComponent, CounterComponent, VisibleTodosPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

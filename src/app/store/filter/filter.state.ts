import { State, Action, StateContext } from '@ngxs/store';
import * as actions from './filter.actions';

@State<String>({
  name: 'filter', 
  defaults: "SHOW_ALL"
})
export class FilterState {
  @Action(actions.SetCurrentFilter)
  AddTodo(
    store: StateContext<String>, 
    action: actions.SetCurrentFilter
  ) {
    store.setState(action.payload.filter);
  } 
}
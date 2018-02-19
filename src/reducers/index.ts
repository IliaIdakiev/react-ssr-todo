import { combineReducers } from 'redux';
import { AppState } from '../interfaces/app-state';
import { UPDATE_TODO, LOAD_TODOS } from '../actions/types';
import { Todo } from '../interfaces/todo';

export const initialState: AppState = {
  todos: [],
  loaded: false
};

const handlers: { [type: string]: (state: AppState, payload: any) => any } = {
  [LOAD_TODOS]: (state, todos) => ({ todos, loaded: true }),
  [UPDATE_TODO]: (state, updatedTodo: Todo) => {
    const todos = state.todos.map(todo => updatedTodo.id === todo.id ? updatedTodo : todo);
    return { todos };
  }
};

export function reducer(state: AppState = initialState, action: any) {
  const handler = handlers[action.type];
  return handler ? Object.assign({}, state, handler(state, action.payload)) : state;
}
import { combineReducers } from 'redux';
import { AppState } from '../interfaces/app-state';
import { UPDATE_TODO, LOAD_TODOS, SELECT_TODO, CLEAR_LOADED, TOGGLE_WAITING } from '../actions/types';
import { Todo } from '../interfaces/todo';

export const initialState: AppState = {
  todos: [],
  loaded: false,
  selectedTodo: null,
  waiting: false
};

const handlers: { [type: string]: (state: AppState, payload: any) => any } = {
  [LOAD_TODOS]: (state, todos) => ({ todos }),
  [UPDATE_TODO]: (state, updatedTodo: Todo) => {
    const todos = state.todos.map(todo => updatedTodo.id === todo.id ? updatedTodo : todo);
    return { todos };
  },
  [SELECT_TODO]: (state, selectedTodo: Todo) => ({ selectedTodo }),
  [CLEAR_LOADED]: () => ({ loaded: false }),
  [TOGGLE_WAITING]: (state) => ({ waiting: !state.waiting })
};

export function reducer(state: AppState = initialState, action: any) {
  const handler = handlers[action.type];
  return handler ? Object.assign({}, state, handler(state, action.payload)) : state;
}
import { Todo } from './todo';

export interface AppState {
  todos: Todo[];
  loaded: boolean;
}
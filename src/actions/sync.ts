import { Todo } from '../interfaces/todo';
import { LOAD_TODOS, UPDATE_TODO, SELECT_TODO, CLEAR_LOADED } from './types';

const actionCreator = <P, T>(type: T) => (payload: P) => ({ type, payload });

export const loadTodo = actionCreator<Todo[], LOAD_TODOS>(LOAD_TODOS);

export const updateTodo = actionCreator<Todo[], UPDATE_TODO>(UPDATE_TODO);

export const selectTodo = actionCreator<Todo, SELECT_TODO>(SELECT_TODO);

export const clearLoaded = actionCreator<null, CLEAR_LOADED>(CLEAR_LOADED);
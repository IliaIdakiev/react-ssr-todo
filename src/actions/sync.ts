import { Todo } from '../interfaces/todo';
import { LOAD_TODOS, UPDATE_TODO } from './types';

export const loadTodo = (payload: Todo[]) => ({ type: LOAD_TODOS, payload });

export const updateTodo = (payload: Todo[]) => ({ type: UPDATE_TODO, payload });
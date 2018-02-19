import { Dispatch } from 'react-redux';

import { loadTodo, updateTodo } from './sync';
import { AppState } from '../interfaces/app-state';
import { Todo } from '../interfaces/todo';

function postData(url: string, data: any) {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
  });
}

export function loadTodosAsync(force = false) {
  return (dispatch: Dispatch<any>, getState: () => AppState) => {
    const { loaded } = getState();
    if (loaded) return;
    fetch('/api/todos').then(res => res.json()).then((data: Todo[]) => dispatch<any>(loadTodo(data)));
  };
}

export function updateTodoAsync(todo: Todo) {
  return (dispatch: Dispatch<any>) => {
    postData('/api/todos', todo).then(res => res.json()).then((data: Todo[]) => dispatch<any>(updateTodo(data)));
  };
}
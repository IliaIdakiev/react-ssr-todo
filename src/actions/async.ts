import { Dispatch } from 'react-redux';

import { loadTodo, updateTodo, selectTodo, clearLoaded } from './sync';
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

export const fetchTodos = (force = false) => (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { loaded } = getState();
  if (loaded) {
    dispatch(clearLoaded(null));
    return;
  }
  fetch(`/api/todos`).then(res => res.json()).then((data: Todo[]) => dispatch<any>(loadTodo(data)));
};

export const fetchTodo = (force = false, id: string) => (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { loaded } = getState();
  if (loaded) {
    dispatch(clearLoaded(null));
    return;
  }
  fetch(`/api/todos?id=${id}`).then(res => res.json()).then((data: Todo) => dispatch<any>(selectTodo(data)));
};

export const saveTodo = (todo: Todo) => (dispatch: Dispatch<any>) => {
  postData(`/api/todos`, todo).then(res => res.json()).then((data: Todo[]) => dispatch<any>(updateTodo(data)));
};
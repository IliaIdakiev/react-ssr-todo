import { loadTodo, selectTodo } from '../src/actions/sync';
import db from './tmp-db';

export const pathResolvers: { [path: string]: any[] } = {
  '/': [() => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(loadTodo(db.getTodos()));
    }, 2000);
  })],
  '/edit/:id': [({ id }: { id: string }) => new Promise((resolve, reject) => {
    const numberId = +id;
    const todo = db.getTodos().filter(todo => todo.id === numberId)[0] || null;
    resolve(selectTodo(todo));
  })]
};
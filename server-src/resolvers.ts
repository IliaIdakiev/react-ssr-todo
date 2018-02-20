import { loadTodo, selectTodo } from '../src/actions/sync';
import db from './tmp-db';

export const pathResolvers: { [path: string]: any[] } = {
  '/': [() => db.getTodos().then((todos: any) => loadTodo(todos))],
  '/edit/:id': [({ id }: { id: string }) => new Promise((resolve, reject) => {
    const numberId = +id;
    db.getTodos().then((todos: any) => {
      const todo = todos.filter((todo: any) => todo.id === numberId)[0] || null;
      resolve(selectTodo(todo));
    })
  })]
};
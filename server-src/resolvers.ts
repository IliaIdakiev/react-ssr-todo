import { loadTodo } from '../src/actions/sync';
import db from './tmp-db';

export const pathResolvers: { [path: string]: any[] } = {
  '/': [() => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(loadTodo(db.getTodos()));
    }, 2000);
  })]
};
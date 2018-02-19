import { Router } from 'express';
import db from './tmp-db';
import { Todo } from '../src/interfaces/todo';

const api = Router();

api.get('/todos', (req, res) => {
  res.send(db.getTodos()).end();
});

api.post('/todos', (req, res) => {
  const updated: Todo = req.body;
  db.setTodos(db.getTodos().map(todo => todo.id === updated.id ? updated : todo));
  res.send(updated);
});

export default api;
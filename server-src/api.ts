import { Router } from 'express';
import db from './tmp-db';
import { Todo } from '../src/interfaces/todo';

const api = Router();

api.get('/todos', (req, res) => {
  const id = +req.query.id;
  const todos = db.getTodos().then((todos: any) => {
    res.send(id ? todos.find((todo: any) => todo.id === id) : todos).end();
  });
});

api.post('/todos', (req, res) => {
  const redirect = req.query.redirect;
  const updated: Todo = {
    id: +req.body.id,
    text: req.body.text,
    completed: !!req.body.completed
  };

  let task = null;

  if (updated.id !== -1) {
    task = db.getTodos()
      .then((todos: Todo[]) => todos.map(todo => todo.id === updated.id ? updated : todo))
      .then(db.setTodos);
  } else {
    task = db.addTodo(updated);
  }

  task.then(data => {
    if (redirect) {
      res.redirect(redirect);
      return;
    }
    res.send(data);
  });
});

export default api;
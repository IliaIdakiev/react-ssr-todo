import { Router } from 'express';

const api = Router();

const todos: any[] = [];

api.get('/todos', (req, res) => {
  res.send(todos).end();
});

api.post('/todos', (req, res) => {

});

export default api;
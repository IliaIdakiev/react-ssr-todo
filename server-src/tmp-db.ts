let todos = [{ text: 'hello', completed: false, id: 1 }, { text: 'world', completed: true, id: 2 }]
const db = {
  getTodos: () => todos,
  setTodos: (newTodos: any) => { todos = newTodos; return todos; }
};

export default db;
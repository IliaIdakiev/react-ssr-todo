let counter = 3;

let todos = [{ text: 'hello', completed: false, id: 1 }, { text: 'world', completed: true, id: 2 }]
const db = {
  getTodos: () => Promise.resolve(todos),
  setTodos: (newTodos: any) => {
    todos = newTodos;
    return Promise.resolve(todos);
  },
  addTodo: (todo: any) => {
    todo.id = counter++;
    todos.push(todo);
    return Promise.resolve(todo);
  }
};

export default db;
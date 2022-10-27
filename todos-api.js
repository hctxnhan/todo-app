export default class TodosAPI {
  // - id
  // - name
  // - status
  static getAllTodos() {
    const todos = JSON.parse(localStorage.getItem('todoapp-todos')) || [];
    return todos;
  }

  static addNewTodos(todo) {
    const todos = this.getAllTodos();
    // Save
    const existed = todos.find((n) => todo.id == n.id);

    if (!existed) {
      todo.id = Math.floor(Math.random() * 100000);
      todo.status = 'todo';
      todos.push(todo);
    }

    localStorage.setItem('todoapp-todos', JSON.stringify(todos));
  }

  static toggleTodo(id) {
    const todos = this.getAllTodos();
    // Save
    const existed = todos.find((n) => id == n.id);
    if (existed) {
      existed.status = existed.status === 'todo' ? 'completed' : 'todo';
      localStorage.setItem('todoapp-todos', JSON.stringify(todos));
    }
  }

  static deleteTodo(id) {
    let todos = this.getAllTodos();
    todos = todos.filter((todo) => todo.id != id);

    localStorage.setItem('todoapp-todos', JSON.stringify(todos));
  }

  static deleteAllTodos() {
    localStorage.removeItem('todoapp-todos');
  }
}

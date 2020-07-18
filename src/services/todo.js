const todos = [];

class TodoService {
  getAll() {
    return todos;
  }

  addTodo(todo) {
    todos.push(todo);
  }

  delete(todo) {
    todos.splice(todos.indexOf(todo), 1);
  }
}
export const todoService = new TodoService();

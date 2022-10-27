import TodosAPI from './todos-api.js';

const todoListElem = document.querySelector('.todo-list');
const inputElem = document.querySelector('.todo-input');
const formElem = document.querySelector('form');

let todos;

refreshList();

function createTodo(todo) {
  const html = `
          <p class="todo-name">${todo.name}</p>
          <button class='remove-button'>
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.87 122.87">
              <title>remove</title>
              <path
                d="M18,18A61.45,61.45,0,1,1,0,61.44,61.28,61.28,0,0,1,18,18ZM77.38,39l6.53,6.54a4,4,0,0,1,0,5.63L73.6,61.44,83.91,71.75a4,4,0,0,1,0,5.63l-6.53,6.53a4,4,0,0,1-5.63,0L61.44,73.6,51.13,83.91a4,4,0,0,1-5.63,0L39,77.38a4,4,0,0,1,0-5.63L49.28,61.44,39,51.13a4,4,0,0,1,0-5.63L45.5,39a4,4,0,0,1,5.63,0L61.44,49.28,71.75,39a4,4,0,0,1,5.63,0ZM61.44,10.54a50.91,50.91,0,1,0,36,14.91,50.83,50.83,0,0,0-36-14.91Z" />
            </svg>
          </button>`;

  const todoElem = document.createElement('li');
  todoElem.innerHTML = html;
  todoElem.classList.add('todo-item');
  if (todo.status === 'completed') {
    todoElem.classList.add('todo-item--completed');
  }
  todoElem.dataset.todoId = todo.id;

  return todoElem;
}

function loadTodoList(todos) {
  todoListElem.innerHTML = '';
  todos.forEach((todo) => {
    todoListElem.appendChild(createTodo(todo));
  });
}

function refreshList() {
  todos = TodosAPI.getAllTodos();
  loadTodoList(todos);
}

formElem.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTodo = {
    name: inputElem.value.trim(),
  };

  inputElem.value = '';

  TodosAPI.addNewTodos(newTodo);
  refreshList();
});

todoListElem.addEventListener('click', (e) => {
  const todo = e.target.closest('.todo-item');

  if (e.target.closest('.remove-button')) {
    if (todo) {
      const id = todo.dataset.todoId;
      TodosAPI.deleteTodo(id);
      refreshList();
    }
  } else if (e.target.closest('.todo-name')) {
    if (todo) {
      const id = todo.dataset.todoId;
      TodosAPI.toggleTodo(id);
      refreshList();
    }
  }
});

// selects required dom-elements
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const taskCount = document.getElementById('task-count');

// array for saving tasks
let todos = [];

// function for saving tasks in localstorage (JSON)
function saveTodos() {
    const todosString = JSON.stringify(todos);
    localStorage.setItem("todos", todosString);
}

// function for loading tasks fron localstorage
function loadTodos() {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
        todos = JSON.parse(todosString);
    
    } else {
        todos = []; // set todos to empty array if no data is found
    }
}

// event listener for the form
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // capture the value of the input field and remove whitespace
    const taskText = input.value.trim();

    // check if the input field is empty
    if (taskText === '') return;

    // create a new todo object
    const newTodo = {
        id: Date.now(), // unique id based on the current timestamp
        text: taskText, // the text of the task
        completed: false // status of the task (not yet completed)
    };

    // add the new task to the array
    todos.push(newTodo);
    saveTodos(); // saves current tasks
    renderTodos();

    // clear the input field
    input.value = '';

    // update the to-do list
    renderTodos();
});

// function to render tasks
function renderTodos() {
    // clear the existing list before rendering new entries
    todoList.innerHTML = '';

    // iterate through the array of todos
    todos.forEach((todo) => {
        // create the list element (li)
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (todo.completed) todoItem.classList.add('completed');

        // create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked; // update the status
            saveTodos(); // saves current tasks
            renderTodos();
        });

        // create the text element
        const span = document.createElement('span');
        span.textContent = todo.text;

        // create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', () => {
            // delete the task based on its id
            todos = todos.filter((t) => t.id !== todo.id);
            saveTodos(); // saves current tasks
            renderTodos();
        });

        // append checkbox, text, and button to the task
        todoItem.appendChild(checkbox);
        todoItem.appendChild(span);
        todoItem.appendChild(deleteButton);

        // append the list element to the to-do list
        todoList.appendChild(todoItem);
    });

    // update the number of open tasks
    updateTaskCount();
}

// function to update the task counter
function updateTaskCount() {
    const openTasks = todos.filter((todo) => !todo.completed).length;
    taskCount.textContent = openTasks;
}


// loads tasks when starting the app
loadTodos();
renderTodos();
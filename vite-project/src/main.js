document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed!");

  // Select required DOM elements
  const form = document.querySelector(".todo-form");
  const input = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  const taskCount = document.getElementById("task-count");

  // Check if all elements exist
  if (!form || !input || !todoList || !taskCount) {
    console.error("One or more DOM elements could not be found!");
    return;
  }

  console.log("All DOM elements found!");

  // Array for saving tasks
  let todos = [];

  // Function for saving tasks in localStorage
  function saveTodos() {
    const todosString = JSON.stringify(todos);
    localStorage.setItem("todos", todosString);
  }

  // Function for loading tasks from localStorage
  function loadTodos() {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      todos = JSON.parse(todosString);
    } else {
      todos = []; // Set todos to an empty array if no data is found
    }
  }

  // Function to update the task counter
  function updateTaskCount() {
    const openTasks = todos.filter((todo) => !todo.completed).length;
    taskCount.textContent = openTasks;
  }

  // Function to render tasks
  function renderTodos() {
    // Clear the existing list before rendering new entries
    todoList.innerHTML = "";

    // Iterate through the array of todos
    todos.forEach((todo) => {
      // Create the list element (li)
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      if (todo.completed) todoItem.classList.add("completed");

      // Create the checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked; // Update the status
        saveTodos(); // Save current tasks
        renderTodos();
      });

      // Create the text element
      const span = document.createElement("span");
      span.textContent = todo.text;

      // Create the delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        // Delete the task based on its id
        todos = todos.filter((t) => t.id !== todo.id);
        saveTodos(); // Save current tasks
        renderTodos();
      });

      // Append checkbox, text, and button to the task
      todoItem.appendChild(checkbox);
      todoItem.appendChild(span);
      todoItem.appendChild(deleteButton);

      // Append the list element to the to-do list
      todoList.appendChild(todoItem);
    });

    // Update the number of open tasks
    updateTaskCount();
  }

  // Event listener for adding tasks
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Capture the value of the input field and remove whitespace
    const taskText = input.value.trim();

    // Check if the input field is empty
    if (!taskText) return;

    // Create a new todo object
    const newTodo = {
      id: Date.now(), // Unique id based on the current timestamp
      text: taskText, // The text of the task
      completed: false, // Status of the task (not yet completed)
    };

    // Add the new task to the array
    todos.push(newTodo);
    saveTodos(); // Save current tasks
    renderTodos();

    // Clear the input field
    input.value = "";
  });

  // Load and render tasks on startup
  loadTodos();
  renderTodos();

  console.log("To-Do List App initialized successfully!");
});

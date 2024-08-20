// Get references to DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const feedbackMessage = document.getElementById('feedback-message');

// Load tasks from localStorage on page load
window.addEventListener('load', loadTasks);

// Add event listener for form submission
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask(todoInput.value, prioritySelect.value);
    todoInput.value = '';
});

// Add event listener for clearing completed tasks
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// Function to add a new task
function addTask(task, priority) {
    if (task === '') return;

    const li = document.createElement('li');
    li.textContent = task;
    li.classList.add(`priority-${priority.toLowerCase()}`);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        todoList.removeChild(li);
        saveTasks();
        showFeedback('Task deleted');
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function() {
        const newTask = prompt('Edit task:', li.textContent);
        if (newTask) {
            li.textContent = newTask;
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            saveTasks();
            showFeedback('Task edited');
        }
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
    });

    todoList.appendChild(li);
    saveTasks();
    showFeedback('Task added');
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.name, task.priority, false);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push({
            name: li.firstChild.textContent,
            priority: li.className.replace('priority-', '').replace(' completed', '')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to clear completed tasks
function clearCompletedTasks() {
    document.querySelectorAll('li.completed').forEach(li => li.remove());
    saveTasks();
    showFeedback('Completed tasks cleared');
}

// Function to show feedback messages
function showFeedback(message) {
    feedbackMessage.textContent = message;
    setTimeout(() => feedbackMessage.textContent = '', 2000);
}

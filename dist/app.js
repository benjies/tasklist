// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListener();

// Load all event listeners
function loadEventListener(){
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
    form.addEventListener('submit', addTask);
    // Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear All Tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}
// Get Tasks from LS
function getTasks(){
    // Check for tasks
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Loop Tasks
    tasks.forEach(function(task){
        // Create list element
        const li = document.createElement('li');
        // Add a class
        li.className = 'collection-item';
        // Create a text node and append to li
        li.innerHTML = `<span id="task-text">${task}</span>`
        // Create new link element X
        const link = document.createElement('a');
        // Add class to a
        link.className = "delete-item";
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e){
    if (taskInput.value === '') {
        alert('Add a task');
        e.preventDefault();
    } else{

    // Create list element
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-item';
    // Create a text node and append to li
    li.innerHTML = `<span id="task-text">${taskInput.value}</span>`
    // Create new link element X
    const link = document.createElement('a');
    // Add class to a
    link.className = "delete-item";
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocaleStorage(taskInput.value);


    // Clear Input
    taskInput.value = '';


    e.preventDefault();
    }
};

// Local Storage Task
function storeTaskInLocaleStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Push task onto Tasks
    tasks.push(task);
    // Convert into strings for storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task Function
function removeTask(e){
    // Check Parent Element sub classes
    if (e.target.parentElement.classList.contains('delete-item')) {
        // Ask user to double check before removing
        if(confirm('Are You Sure?')){
        e.target.parentElement.parentElement.remove();

        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
};

// Remove from LS Function
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task Fucntion
function clearTasks(e){
    // taskList.innerHTML = '';

    //FASTER WAY
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from locale storage
    clearTasksFromLocaleStorage();
}

// Clear Tasks From LS Function
function clearTasksFromLocaleStorage(){
    localStorage.clear();
};

// Filter Tasks Function
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // Gather list items
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'flex';
        } else{
            task.style.display = 'none';
        }
    });
}
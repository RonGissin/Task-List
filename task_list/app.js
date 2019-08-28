// Define UI vars to work with
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event Listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === ""){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // create li element 
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    else{
        // create li element 
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link element
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
        // Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);
        // Clear Input
        taskInput.value = '';

        e.preventDefault();
    }
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === ""){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            // remove task from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(delTask){
    let tasks;
    if(localStorage.getItem('tasks') === ""){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(task === delTask.textContent){
            tasks.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
}

// Clear Tasks
function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // Clear tasks from local storage
    localStorage.clear();

}

// Filter Tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}
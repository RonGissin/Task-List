// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event Listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
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
        // Clear Input
        taskInput.value = '';

        e.preventDefault();
    }
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Tasks
function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

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
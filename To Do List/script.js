window.onload = function() { 
    loadTasks();
};

function addTask() {
    const inputtask = document.getElementById('inputtask');
    const tasklist = document.getElementById('tasklist');

    if(inputtask.value === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <div class='task'>
        <input type='checkbox'>
        <span>${inputtask.value}</span>
        </div>
       `;
    tasklist.append(li);
    inputtask.value = '';
    saveData();      
}

function delete_task() {
    const tasklist = document.getElementById('tasklist');
    const tasks = tasklist.querySelectorAll('li');

    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            task.remove();
        }
    });
    saveData();      
}

function saveData() {
    const tasklist = document.getElementById('tasklist');
    localStorage.setItem("myTasks", tasklist.innerHTML);
}

function loadTasks() {
    const tasklist = document.getElementById('tasklist');
    const savedData = localStorage.getItem("myTasks");
    if (savedData) {
        tasklist.innerHTML = savedData;
    }
}
let input = document.querySelector('input');
let addButton = document.querySelector('.add');
let tasksContainer = document.querySelector('.tasks');
let noTask = document.querySelector('.no-task');
let newTasks = document.querySelector('.new-tasks');
let finishTasks = document.querySelector('.finish-tasks');
let tasksCount = document.querySelector('.tasks-numbers span');
let tasksComplete = document.querySelector('.complete-numbers span');
let rdAll = document.querySelectorAll('.remove-done-all div');

let inputValue = [];

window.onload = () => {
  input.focus();
}

addButton.onclick = () => {
  if(input.value == '') {
    swal({
      title: "Oops",
      text: "No Value To Add !!",
      icon: "warning",
    });
  }
  else {
    addTask(input.value);
    input.value = '';
    input.focus();
  }
  openCloseNoTask();
}

document.addEventListener('click', (e) => {
  if(e.target.className == 'delete fa-regular fa-trash-can') {
    e.target.parentNode.parentNode.remove();
    tasksCount.innerHTML--;
  }
  noTaskInContainer();
});


document.addEventListener('click', (e) => {
  let array = Array.from(document.querySelectorAll('.tasks .task'));
  if(e.target.className == 'done fa-solid fa-circle-check') {
    doneTask(e, array);
  }

  let newTasksArray = Array.from(document.querySelectorAll('.tasks .new-tasks .task'));
  if(e.target.className == 'removeAll close') {
    newTasksArray.forEach((element) => {
      element.remove();
      tasksCount.innerHTML = 0;
    });
  }

  if(e.target.className == 'doneAll close') {
    newTasksArray.forEach((element) => {
      element.classList.add('finish');
      document.querySelectorAll('.text').forEach((element) => {
        element.classList.add('done');
      });
      element.style.order = array.length - 1;
      finishTasks.append(element);
      element.click = false;
      element.style.pointerEvents = 'none';
      tasksComplete.innerHTML = array.length;
      tasksCount.innerHTML = 0;
    });
  }
});

function addTask(value) {
  let task = document.createElement('div');
  task.className = 'task';
  let textTask = document.createElement('div');
  textTask.className = 'text';
  textTask.innerHTML = value;
  let completeTasks = document.createElement('div');
  completeTasks.className = 'complete-task';
  let done = document.createElement('i');
  done.className = 'delete fa-regular fa-trash-can';
  let Delete = document.createElement('i');
  Delete.className = 'done fa-solid fa-circle-check';

  if(!inputValue.includes(input.value)) {
    inputValue.push(textTask.innerHTML);
    completeTasks.append(done, Delete);
    task.append(textTask, completeTasks);
    newTasks.append(task);
    tasksCount.innerHTML++;
  } else {
    swal({
      title: "Oops",
      text: "This Value Is Exists",
      icon: "warning",
  });
  }

}

function noTaskInContainer() {
  if(document.querySelectorAll('.tasks .task').length <= 0) {
    noTask.classList.remove('close');
    noTask.classList.add('open');
  }
}

function doneTask(e, array) {
  e.target.parentNode.previousElementSibling.classList.add('done');
  e.target.parentNode.parentNode.classList.add('finish');
  e.target.parentNode.parentNode.style.order = array.length - 1;
  finishTasks.append(e.target.parentNode.parentNode);
  e.target.parentNode.parentNode.click = false;
  e.target.parentNode.parentNode.style.pointerEvents = 'none';
  tasksComplete.innerHTML++;
  tasksCount.innerHTML--;
}

function openCloseNoTask() {
  noTask.classList.remove('open');
  noTask.classList.add('close');
}

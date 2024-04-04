// Retrieve tasks and nextId from localStorage
//let taskList = JSON.parse(localStorage.getItem("tasks")) || []
//console.log(taskList)
const taskFormEl = $('taskForm');
 const taskTitleInput = $('#taskTitle');
 const taskdescription = $('#taskDescription');
 const taskDeadline = $('#taskDueDate');

function readTasksFromStorage() {
  let tasks= JSON.parse(localStorage.getItem('tasks'));
 if (!tasks) {
   tasks = [];
 }
 return tasks;
}
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks',JSON.stringify(tasks));
} 
// Todo: create a function to generate a unique task id
//function generateTaskId() {

//}

// Todo: create a function to create a task card
function createTaskCard(task) {
const taskCard = $('<div>')
  .addClass('card task-card draggable my-3')
  .attr('data-task-id',task.id);
const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
const cardBody = $('<div>').addClass('card-body');
const cardDescription = $('<p>').addClass('card-text').text(task.description);
const cardDeadline=$('<p>').addClass('card-text').text(task.deadline);
const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger delete')
  .text('Delete')
  .attr('data-task-id', task.id);
cardDeleteBtn.on('click', handleDeleteTask);
console.log ('card created');

if(task.deadline && task.status !== 'done') {
  const now = dayjs();
  const taskDueDate = dayjs(task.deadline, 'DD/MM/YYYY');

  if(now.isSame(taskDueDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
  } else if (now.isAfter(taskDueDate)) {
    taskCard.addClass('bg-danger text-white');
    cardDeleteBtn.addClass('border-light');
  }
}
// Add elements to the card
cardBody.append(cardDescription,cardDeadline, cardDeleteBtn);
taskCard.append(cardHeader,cardBody);

//return taskCard;
console.log(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function printTaskList() {
  const tasks = readTasksFromStorage();

  const todoList =$('#todo-cards');
  todoList.empty();

  const inProgressList =$('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();
    // Loop through the array and create list items
    for (let task of tasks) {
      if(task.status === 'to-do'){
        todoList.append(createTaskCard(task));
      } else if (task.status === 'in-progress') {
        inProgressList.append(createTaskCard(task));
      } else if (task.status === 'done') {
        doneList.append(createTaskCard(task));
      }
    }
    $('.draggable').draggable({
      opacity: 0.7,
      zIndex: 100,
      helper: function (e) {
        const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const taskId = $(this).attr('data-task-id');
  const tasks = readTasksFromStorage();

  tasks.forEach((task)=> {
    if(task.id ===taskId) {
      tasks.splice(tasks.indexOf(task),1);
    }
  });
  saveTasksToStorage(tasks);
  printTaskLists();
}


// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

const taskTitle = taskTitleInput.val().trim();
const description = taskdescription.val();
const deadline = taskDeadline.val();
  
  const newTask = {
  id: crypto.randomUUID(),
  title: taskTitle,
  description: description,
  date: deadline,
  status: "to-do",
  };

  console.log(newTask)

  const tasks = readTasksFromStorage();
  projects.push(newTask);

  saveTasksToStorage(tasks);

  printTaskList();

  taskTitleInput.val('');
  taskdescription.val('');
  taskDeadline.val('');
}




  // let taskList = JSON.parse(localStorage.getitem('tasks')) || []
  // tasks.push(newTask);
  // localStorage.getItem('tasks', JSON.stringify(tasks));

  // if (!taskList) {
  //   taskList = [];
  // alert("Invalid entry");
  // }
  // return tasks;
  // }

// Todo: create a function to handle dropping a task into a new status lane
 function handleDrop(event, ui) {
  const tasks = readTasksFromStorage();
  const taskId =ui.draggable[0].dataset.projectId;
  const newStatus = event.target.id;
  for(let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  localStorage.setItem('tasks',JSON.stringify(tasks));
  printTaskList();
}
taskFormEl.on('submit', handleAddTask);

//taskDisplayEl.on('click', '.btn-delete-task',handleDeleteTask);

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  printTaskList();

  $('.lane').droppable({
    accept: 'draggable',
    drop: handleDrop,
  });

});

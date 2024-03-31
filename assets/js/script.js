// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || []
console.log(taskList)
let nextId = JSON.parse(localStorage.getItem("nextId"));
let title = document.getElementById('title');
let description = document.getElementById('description');
let deadline = document.getElementById('deadline');

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let taskList = (title,description,deadline)
  console.log(taskList)
}

// Todo: create a function to create a task card
function createTaskCard(task) {
const card = $('<div>').addClass('card');
const cardTitle = $('<h3>').text(title);
const cardDescription = $('<p>').text(description);
const cardDeadline=$('<p>').text(deadline);
// Add elements to the card
card.append(cardTitle, cardDescription,cardDeadline);

// Append the card to a container element (e.g., a div with id "card-container")
$('#to-do-cards').append(card);
  console.log("Create task card")
  console.log(task)
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Loop through the array and create list items
   
  console.log("Render Task List")
  //for loop through my task List
for (let i = 0; i < array.length; i++) {
  //createTaskCard(taskList[i])
  // const element = array[i];
  
}
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault()
  console.log("Handle add task")
  // form validation
  
    //if they didn't {
    //   alert("Invalid entry")
    //   return
    // }

// {}
    // taskList.push(newTask)

  // localStorage.setItem("tasks", JSON.stringify(taskList))

}

// Todo: create a function to handle deleting a task
 function handleDeleteTask(event){
    console.log("Hanlde delete task")

 }

// Todo: create a function to handle dropping a task into a new status lane
 function handleDrop(event, ui) {
     $( function() {
         $( "#taskList" ).draggable();
         $( "#todo-cards" ).droppable()
         $("in-progress-cards" ).droppable()
         $("done-cards").droppable(
             {
           drop: function( event, ui ) {
             $( this )
               .addClass( "ui-state-highlight" )
               .find( "p" )
                 .html( "Dropped!" );
           }
         });
       } );
 }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  console.log($("#add-task"))
  $("#add-task").button().on("click", function () {
    console.log("Add task button selected")
    $('#myModal').show();
  });
  // Close the modal when the close button is clicked
  $('.close').click(function(){
    $('#myModal').hide();
    });

  $("#new-task-form").on("submit", handleAddTask)

});

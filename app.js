// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".container-add__new-task-input"); //Add a new task.
var addButton = document.querySelector(".container-add__add-button"); //add button
var incompleteTaskHolder = document.querySelector(".section-todo__planned-tasks-list"); //ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".section-completed__completed-tasks-list"); //completed-tasks


//New task list item
var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input"); //input (checkbox)
    var label = document.createElement("label"); //label
    var editInput = document.createElement("input"); //input (text)
    var editButton = document.createElement("button"); //button.edit
    var deleteButton = document.createElement("button"); //delete button
    var deleteButtonImg = document.createElement("img"); //delete button image

    listItem.className = "task-item";

    label.innerText = taskString;
    label.className = "task-item__current-task";

    //Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.className = "task-item__checkbox"
    editInput.type = "text";
    editInput.className = "task-item__current-input";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "button task-item__edit-button";

    deleteButton.className = "button task-item__delete-button";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "delete-button__icon";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


var addTask = function() {
    console.log("Add Task...");

    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.
var editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".task-item__current-input");
    var label = listItem.querySelector(".task-item__current-task");
    var editBtn = listItem.querySelector(".task-item__edit-button");
    var containsClass = listItem.classList.contains("task-item_edit");

    //If class of the parent is .editmode
    if(containsClass) {

        //switch to .editmode
        //label becomes the inputs value.

        label.classList.remove("current-task_edit");
        editInput.classList.remove("current-input_edit");
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        label.classList.add("current-task_edit");
        editInput.classList.add("current-input_edit");
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("task-item_edit");
};

//Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;

    let label = listItem.querySelector(".task-item__current-task");
    label.classList.add("completed-task-label");

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;

    let label = listItem.querySelector(".task-item__current-task");
    label.classList.remove("completed-task-label");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function() {
    console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
// addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector(".task-item__checkbox");
    var editButton = taskListItem.querySelector(".task-item__edit-button");
    var deleteButton = taskListItem.querySelector(".task-item__delete-button");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    //bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

//Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
const circle = document.querySelectorAll(".item-circle");
const notificationsNumber = document.querySelector(".number");
const botItem = document.querySelectorAll(".bot-item");
let todoItem = document.querySelectorAll(".item-todo");
const clear = document.querySelector(".item-bottom-text-left");
const newItem = document.querySelector(".new-todo");
const containerItem = document.querySelector(".item-container");
const botContainer = document.querySelector(".item-bottom-todo");
const lightDark = document.querySelector(".header-icon");
const body = document.querySelector("body");
const input = document.querySelector(".input-container");
const botContainer2 = document.querySelector(".bot-container2");
const header = document.querySelector(".header");

lightDark.addEventListener('click', function (e) {
    body.classList.toggle("white");
    for (let i = 0, len = todoItem.length; i < len; ++i) {
        todoItem[i].classList.toggle("white");
    }
    botContainer2.classList.toggle("white");
    botContainer.classList.toggle("white");
    input.classList.toggle("white");
    containerItem.style.boxShadow = "rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0rem";
    console.log(lightDark.src);

    const mediaQuery = window.matchMedia('(min-width: 40rem)')

    if (lightDark.src.includes("icon-moon.svg")){
        lightDark.src = "/images/icon-sun.svg";

        if (mediaQuery.matches) {
            header.style.backgroundImage = "url('/images/bg-desktop-dark.jpg')";
        }
        else{
            header.style.backgroundImage = "url('/images/bg-mobile-dark.jpg')";
        }

    }else{
        lightDark.src = "../images/icon-moon.svg";
        if (mediaQuery.matches) {
            header.style.backgroundImage = "url('/images/bg-desktop-light.jpg')";
        }
        else{
            header.style.backgroundImage = "url('/images/bg-mobile-light.jpg')";
        }
    }
    

});


containerItem.addEventListener('click', function (e) {
    item = e.target;
    if (item.classList.contains('item-circle')) {
        let number = notificationsNumber.textContent;
        if (item.classList.contains("check-img"))
        {            
            notificationsNumber.textContent = parseInt(number) + 1;
        }
        else{
            notificationsNumber.textContent = parseInt(number) - 1;
        }

        item.classList.toggle("check-img");
        let text = item.parentNode.parentNode.querySelector(".item-text");
        text.classList.toggle("grey");
    }
 });

 containerItem.addEventListener('dragstart', function (e){
    item = e.target;
    item.classList.add('dragging');
 });

 containerItem.addEventListener('dragend', function (e){
    item = e.target;
    item.classList.remove('dragging');
 });

 containerItem.addEventListener('dragover', function (e){
    e.preventDefault();
    const afterElement = getDragAfterElement(containerItem, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null){
        containerItem.appendChild(draggable);
    }
    else{
        containerItem.insertBefore(draggable, afterElement);
    }

 });

 function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll(".item-todo:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            console.log(offset);
            if (offset < 0 && offset > closest.offset){
                return{offset: offset, element:child};
            }
            else{
                return closest;
            }
           }, {offset:Number.NEGATIVE_INFINITY}).element;
 }



botItem.forEach(function(item){
    item.addEventListener("click", function(e) { 
        for (let i = 0, len = botItem.length; i < len; ++i) {
            botItem[i].classList.remove("active");
        }
        item.classList.add("active");

        if(item.textContent=="Active"){
            active();
        }
        else if(item.textContent=="Completed"){
            completed();
        }
        else{
            all();
        }
        
    });
});


function active(){
    all();
    for (let i = 0, len = todoItem.length; i < len; ++i) {
        let taskItem = todoItem[i].querySelector(".item-text");
        if (taskItem.classList.contains("grey")){
            todoItem[i].classList.add("display-none");
            todoItem[i].classList.remove("item-todo");
        }
    }
}

function completed(){
    all();
    for (let i = 0, len = todoItem.length; i < len; ++i) {
        let taskItem = todoItem[i].querySelector(".item-text");
        if (!taskItem.classList.contains("grey")){
            todoItem[i].classList.add("display-none");
            todoItem[i].classList.remove("item-todo");
        }
    }
}

function all(){
    for (let i = 0, len = todoItem.length; i < len; ++i) {
        todoItem[i].classList.remove("display-none");
        todoItem[i].classList.add("item-todo");
    }
}


clear.addEventListener("click", () => { 
    all();
    for (let i = 0, len = todoItem.length; i < len; ++i) {
        let taskItem = todoItem[i].querySelector(".item-text");
        if (taskItem.classList.contains("grey")){
            todoItem[i].remove();
        }
    }
});

newItem.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        createItem(newItem.value);
        newItem.value = "";
        let number = notificationsNumber.textContent;
        notificationsNumber.textContent = parseInt(number) + 1;
        todoItem = document.querySelectorAll(".item-todo");
    }
 });

 function createItem(val){

    let newElement = document.createElement("div");
    newElement.classList.add("item-todo");
    newElement.classList.add("width");
    
    let newDiv = document.createElement("div"); 
    let newButton = document.createElement("button");
    newButton.classList.add("item-circle");
    newDiv.insertBefore(newButton, null);

    newElement.insertBefore(newDiv, null);

    let newText = document.createElement("div");
    newText.textContent = val;
    newText.classList.add("item-text");

    newElement.insertBefore(newText, null);

    let newImage = document.createElement("img");
    newImage.src = "../images/icon-cross.svg";
    newImage.alt = "cross";
    newImage.classList.add("item-cross");

    newElement.insertBefore(newImage, null);

    newElement.draggable = true;

    containerItem.insertBefore(newElement, botContainer);
 }


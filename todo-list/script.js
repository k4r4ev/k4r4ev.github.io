let storage = {};
storage.desks = [];
let deskNumber = 1;
let taskNumber = 1;

function start() {
    if (localStorage.length === 0) {
        createDesk();
    } else {
        let data = JSON.parse(localStorage.getItem('storage'));
        for (let i in data.desks) {
            createDesk(data.desks[i].name, data.desks[i].tasks);
        }
    }
}

function windowReload() {
    document.getElementById("container").innerHTML = "";
    storage = {};
    storage.desks = [];
    deskNumber = 1;
    taskNumber = 1;
    start();
}

function initHeader() {
    let header = document.createElement("div");
    let clearInput = document.createElement("input");
    clearInput.setAttribute("type", "button");
    clearInput.id = "clear";
    clearInput.value = "Clear";
    let createName = document.createElement("input");
    createName.setAttribute("type", "input");
    createName.id = "deskName";
    createName.setAttribute("placeholder", "The name of the desk");
    let creatDeskButton = document.createElement("input");
    creatDeskButton.setAttribute("type", "button");
    creatDeskButton.id = "createDesk";
    creatDeskButton.value = "Add new desk";
    header.appendChild(clearInput);
    header.appendChild(createName);
    header.appendChild(creatDeskButton);
    document.getElementById("panel").appendChild(header);
    document.getElementById('clear').addEventListener('click', () => clearStorage(), false);
    document.getElementById('createDesk').addEventListener('click', () => createDesk(), false);
}

function storageUpdate() {
    localStorage.removeItem('storage');
    localStorage.setItem('storage', JSON.stringify(storage));
}

function clearStorage() {
    localStorage.removeItem('storage');
    windowReload();
}

function createDesk(deskName = "The name of the desk", tasks = []) {
    let desk = document.createElement("div");
    desk.id = "d" + deskNumber;
    desk.classList.add('desk');
    desk.setAttribute("draggable", "true");
    //TITLE
    let title = document.createElement("div");
    title.classList.add('title');
    let titleText = document.createElement("h2");
    let titleCaption = document.getElementById('deskName').value;
    if (titleCaption != "") {
        deskName = titleCaption;
    }
    titleText.innerHTML = deskName;
    document.getElementById('deskName').value = null;
    saveDesk(deskName); //сохраняем доску (чтобы сбросить индексы в обьекте)
    let titleButton = document.createElement("a");
    titleButton.addEventListener('click', () => deleteDesk(desk.id.slice(1, desk.id.length) - 1), false);
    titleButton.innerHTML = "delete";
    title.appendChild(titleText);
    title.appendChild(titleButton);
    desk.appendChild(title);
    desk.appendChild(document.createElement("hr"));
    //LIST
    let ol = document.createElement("ol");
    ol.className = "list";
    ol.id = "ol" + deskNumber;
    createTasks(ol, tasks);
    desk.appendChild(ol);
    desk.appendChild(document.createElement("hr"));
    //FOOTER
    let footer = document.createElement("div");
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "input");
    nameInput.setAttribute("placeholder", "Name of new task");
    nameInput.id = ol.id + "_input";
    let addingInput = document.createElement("input");
    addingInput.setAttribute("type", "button");
    addingInput.addEventListener('click', () => createTasks(ol), false);
    addingInput.setAttribute("value", "Add new task");
    footer.appendChild(nameInput);
    footer.appendChild(addingInput);
    desk.appendChild(footer);
    document.getElementById("container").appendChild(desk);
    initEvents(desk); //инициализируем события drag-and-drop для доски
    deskNumber++;
}

function saveDesk(deskName) {
    storage.desks.push({
        name: deskName,
        order: deskNumber,
        tasks: []
    });
    storageUpdate(); //сохраняем в localStorage 
}

function deleteDesk(deskOrder) {
    storage.desks.splice(deskOrder, 1);
    storageUpdate();
    windowReload();
}

function createTasks(ol, tasks = []) {
    if (tasks.length === 0) {
        createTask(ol);
    } else {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i][tasks[i].length - 1] === "'") { //если помечена как выполненная
                createTask(ol, tasks[i].slice(0, tasks[i].length - 1), true); //убираем метку
            } else {
                createTask(ol, tasks[i]);
            }
        }
    }
}

function createTask(ol, name = "task #" + taskNumber, completed = false) {
    if (document.getElementById(ol.id + "_input") && //если инпут уже нарисован
        document.getElementById(ol.id + "_input").value != "") {
        name = document.getElementById(ol.id + "_input").value;
        document.getElementById(ol.id + "_input").value = "";
    }
    let li = document.createElement("li");
    li.innerHTML = name;
    li.id = "t" + taskNumber;
    let deskOrder = ol.id.slice(2, ol.id.length) - 1;
    if (completed === true) {
        li.classList.add('complete');
        ol.appendChild(li);
        storage.desks[deskOrder].tasks.push(name + "'");
    } else {
        let span = document.createElement("span");
        span.id = "span" + taskNumber;
        let deleteButton = document.createElement("a");
        deleteButton.addEventListener('click', () => deleteTask(li.id, deskOrder), false);
        deleteButton.innerHTML = "delete";
        let completeButton = document.createElement("a");
        completeButton.addEventListener('click', () => completeTask(li.id, deskOrder), false);
        completeButton.innerHTML = "complete";
        let changeButton = document.createElement("a");
        changeButton.addEventListener('click', () => changeTask(li.id, deskOrder), false);
        changeButton.innerHTML = "change";
        span.appendChild(changeButton);
        span.appendChild(completeButton);
        span.appendChild(deleteButton);
        ol.appendChild(li);
        ol.appendChild(span);
        storage.desks[deskOrder].tasks.push(name);
    }
    storageUpdate();
    taskNumber++;
}

function deleteTask(taskId, deskOrder) {
    storage.desks[deskOrder].tasks.splice(storage.desks[deskOrder].tasks.indexOf(document.getElementById(taskId).innerHTML), 1);
    storageUpdate();
    document.getElementById(taskId).remove();
    document.getElementById("span" + taskId.slice(1, taskId.length)).remove();
}

function completeTask(taskId, deskOrder) {
    storage.desks[deskOrder].tasks[storage.desks[deskOrder].tasks.indexOf(document.getElementById(taskId).innerHTML)] += "'";
    storageUpdate();
    document.getElementById(taskId).classList.add('complete');
    document.getElementById("span" + taskId.slice(1, taskId.length)).remove();
}

function changeTask(taskId, deskOrder) {
    document.getElementById("ol" + (deskOrder + 1) + "_input").value =
        storage.desks[deskOrder].tasks[storage.desks[deskOrder].tasks.indexOf(document.getElementById(taskId).innerHTML)];
    deleteTask(taskId, deskOrder);
    storageUpdate();
}






//DRAG&DROP
let startDesk;
let endDesk;

function initEvents(desk) {
    desk.addEventListener('dragstart', (e) => handleDragStart(e, desk), false);
    desk.addEventListener('dragover', (e) => handleDragOver(e, desk), false);
    desk.addEventListener('drop', (e) => handleDrop(e, desk), false);
    desk.addEventListener('dragend', (e) => handleDragEnd(e, desk), false);
}

function handleDragStart(e, desk) { //срабатывает когда элeмент начал перемещаться
    desk.style.opacity = '0.4';
    startDesk = desk;
}

function handleDragOver(e, desk) { //срабатывает когда перемещаемый элемент оказывается над принимающей элементы зоной
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e, desk) { //вызывается для элемента, над которым произошло сбрасывание перемещаемого элемента
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    endDesk = desk;
}

function handleDragEnd(e, desk) { //срабатывает, когда перетаскивание завершится
    desk.classList.remove('over');
    desk.style.opacity = '1';
    changeDesks(startDesk, endDesk);
}

function changeDesks(startDesk, endDesk) {
    if (startDesk && endDesk && startDesk.id != endDesk.id) {
        let nameTerm = storage.desks[startDesk.id.slice(1, startDesk.id.length) - 1].name;
        let tasksTerm = storage.desks[startDesk.id.slice(1, startDesk.id.length) - 1].tasks;
        storage.desks[startDesk.id.slice(1, startDesk.id.length) - 1].name = storage.desks[endDesk.id.slice(1, endDesk.id.length) - 1].name;
        storage.desks[startDesk.id.slice(1, startDesk.id.length) - 1].tasks = storage.desks[endDesk.id.slice(1, endDesk.id.length) - 1].tasks;
        storage.desks[endDesk.id.slice(1, endDesk.id.length) - 1].name = nameTerm;
        storage.desks[endDesk.id.slice(1, endDesk.id.length) - 1].tasks = tasksTerm;
        storageUpdate();
        windowReload();
    }
}
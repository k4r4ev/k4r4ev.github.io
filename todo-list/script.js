//добавил возможность изменения задачи


let storage = {};
storage.desks = [];
let deskNumber = 1;
let taskNumber = 1;

function start() {
    if (localStorage.length === 0) {
        createDesk();
    } else {
        storage = JSON.parse(localStorage.getItem('storage'));
        for (let i in storage.desks) {
            createDesk(storage.desks[i].name, storage.desks[i].tasks);
        }
    }
    initEvents();
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
    titleButton.addEventListener('click', () => deleteDesk(desk.id), false);
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
    nameInput.id = "input" + deskNumber;
    let addingInput = document.createElement("input");
    addingInput.setAttribute("type", "button");
    addingInput.addEventListener('click', () => createTasks(ol), false);
    addingInput.setAttribute("value", "Add new task");
    footer.appendChild(nameInput);
    footer.appendChild(addingInput);
    desk.appendChild(footer);
    document.getElementById("container").appendChild(desk);
    deskNumber++;
}

function saveDesk(deskName) {
    storage.desks[deskNumber - 1] = {};
    storage.desks[deskNumber - 1].name = deskName;
    storage.desks[deskNumber - 1].tasks = [];
    storageUpdate(); //сохраняем в localStorage 
}

function deleteDesk(deskId) {
    delete storage.desks[Number(deskId.slice(1, deskId.length)) - 1];
    storage.desks.splice(Number(deskId.slice(1, deskId.length)) - 1, 1);
    storageUpdate();
    document.getElementById(deskId).remove(); //удаляем доску
    deskNumber--;
}

function createTasks(ol, tasks = []) {
    if (tasks.length === 0) {
        createTask(ol);
    } else {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i][tasks[i].length - 1] === "'") { //если помечена как выполненная
                createTask(ol, tasks[i].slice(0, tasks[i].length - 1), true);
            } else {
                createTask(ol, tasks[i]);
            }
        }
    }
}

function createTask(ol, name = "task #" + taskNumber, completed = false) {
    if (document.getElementById("input" + ol.id.slice(2, ol.id.length)) && document.getElementById("input" + ol.id.slice(2, ol.id.length)).value != "") {
        name = document.getElementById("input" + ol.id.slice(2, ol.id.length)).value;
        document.getElementById("input" + ol.id.slice(2, ol.id.length)).value = "";
    }
    let li = document.createElement("li");
    li.innerHTML = name;
    li.id = "t" + taskNumber;
    let deskId = Number(ol.id.slice(2, ol.id.length));
    if (completed === true) {
        li.classList.add('complete');
        ol.appendChild(li);
        storage.desks[deskId - 1].tasks.push(name + "'");
    } else {
        let span = document.createElement("span");
        span.id = "span" + taskNumber;
        let deleteButton = document.createElement("a");
        deleteButton.addEventListener('click', () => deleteTask(li.id, deskId), false);
        deleteButton.innerHTML = "delete";
        let completeButton = document.createElement("a");
        completeButton.addEventListener('click', () => completeTask(li.id, deskId), false);
        completeButton.innerHTML = "complete";
        let changeButton = document.createElement("a");
        changeButton.addEventListener('click', () => changeTask(li.id, deskId), false);
        changeButton.innerHTML = "change";
        span.appendChild(changeButton);
        span.appendChild(completeButton);
        span.appendChild(deleteButton);
        ol.appendChild(li);
        ol.appendChild(span);
        storage.desks[deskId - 1].tasks.push(name);
    }
    storageUpdate();
    taskNumber++;
}

function deleteTask(taskId, deskId) {
    storage.desks[deskId - 1].tasks.splice(storage.desks[deskId - 1].tasks.indexOf(document.getElementById(taskId).innerHTML), 1);
    storageUpdate();
    document.getElementById(taskId).remove();
    document.getElementById("span" + taskId.slice(1, taskId.length)).remove();
}

function completeTask(taskId, deskId) {
    storage.desks[deskId - 1].tasks[storage.desks[deskId - 1].tasks.indexOf(document.getElementById(taskId).innerHTML)] += "'";
    storageUpdate();
    document.getElementById(taskId).classList.add('complete');
    document.getElementById("span" + taskId.slice(1, taskId.length)).remove();
}

function changeTask(taskId, deskId) {
    document.getElementById("input" + deskId).value = storage.desks[deskId - 1].tasks[storage.desks[deskId - 1].tasks.indexOf(document.getElementById(taskId).innerHTML)];
    deleteTask(taskId, deskId);
    storageUpdate();
}






//DRAG&DROP
let startDesk;
let endDesk;

function initEvents() {
    var desks = document.querySelectorAll('.desk');
    for (let i = 0; i < desks.length; i++) {
        desks[i].addEventListener('dragstart', (e) => handleDragStart(e, desks[i]), false);
        desks[i].addEventListener('dragover', (e) => handleDragOver(e, desks[i]), false);
        desks[i].addEventListener('drop', (e) => handleDrop(e, desks[i]), false);
        desks[i].addEventListener('dragend', (e) => handleDragEnd(e, desks[i]), false);
    }
    var tasks = document.getElementsByTagName('li');
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].addEventListener('dragstart', (e) => handleDragStart(e, desks[i]), false);
        tasks[i].addEventListener('dragover', (e) => handleDragOver(e, desks[i]), false);
        tasks[i].addEventListener('drop', (e) => handleDrop(e, desks[i]), false);
        tasks[i].addEventListener('dragend', (e) => handleDragEnd(e, desks[i]), false);
    }
}

function handleDragStart(e, desk) { //Срабатывает когда элeмент начал перемещаться
    desk.style.opacity = '0.4';
    startDesk = desk;

}

function handleDragOver(e, desk) { //Срабатывает когда перемещаемый элемент оказывается над принимающей элементы зоной
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e, desk) { //Вызывается для элемента, над которым произошло сбрасывание перемещаемого элемента
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    endDesk = desk;
    return false;
}

function handleDragEnd(e, desk) { //Срабатывает когда перетаскивание завершится
    desk.classList.remove('over');
    desk.style.opacity = '1';
    changeDesks(startDesk, endDesk);
}

function changeDesks(startDesk, endDesk) {
    if (startDesk && endDesk && startDesk.id != endDesk.id) {
        let term1 = storage.desks[Number(startDesk.id.slice(1, startDesk.id.length) - 1)].name;
        let term2 = storage.desks[Number(startDesk.id.slice(1, startDesk.id.length) - 1)].tasks;
        storage.desks[Number(startDesk.id.slice(1, startDesk.id.length) - 1)].name = storage.desks[Number(endDesk.id.slice(1, endDesk.id.length) - 1)].name;
        storage.desks[Number(startDesk.id.slice(1, startDesk.id.length) - 1)].tasks = storage.desks[Number(endDesk.id.slice(1, endDesk.id.length) - 1)].tasks;
        storage.desks[Number(endDesk.id.slice(1, endDesk.id.length) - 1)].name = term1;
        storage.desks[Number(endDesk.id.slice(1, endDesk.id.length) - 1)].tasks = term2;
        storageUpdate();
    }
    windowReload();
}
storage = new Array(new Array());
let d = 1;
let t = 1;

function start() {
    if (localStorage.length == 0) createDesk();
    else stringParser(JSON.parse(localStorage.getItem('storage')));

}

function clearStorage() {
    localStorage.clear();
    location.reload();
}

function createDesk(deskName = "The name of the desk", tasks = new Array()) {
    let desk = document.createElement("div");
    desk.id = "d" + String(d);
    desk.className = "desk";
    //TITLE
    let title = document.createElement("div");
    title.className = "title";
    let titleText = document.createElement("h2");
    titleText.setAttribute("contenteditable", "true")
    let titleCaption = document.getElementById('deskName').value;
    if (titleCaption != "")
        titleText.innerHTML = titleCaption;
    else
        titleText.innerHTML = deskName;
    document.getElementById('deskName').value = null;
    let titleButton = document.createElement("a");
    let deleteDesk = "deleteDesk(d" + d + ");";
    titleButton.setAttribute("onclick", deleteDesk);
    titleButton.innerHTML = "delete";
    title.appendChild(titleText);
    title.appendChild(titleButton);
    desk.appendChild(title);
    desk.appendChild(document.createElement("hr"));
    //LIST
    let ol = document.createElement("ol");
    ol.className = "list";
    ol.id = "ol" + d;
    createTasks(ol, tasks);
    desk.appendChild(ol);
    desk.appendChild(document.createElement("hr"));
    //FOOTER
    let footer = document.createElement("div");
    let addInput = document.createElement("input");
    addInput.setAttribute("type", "button");
    addInput.setAttribute("onclick", "createTasks(ol" + d + ");");
    addInput.setAttribute("value", "Add new task");
    footer.appendChild(addInput);
    desk.appendChild(footer);
    document.getElementById("container").appendChild(desk);
    d++;
}

function deleteDesk(id) {
    document.getElementById(id.remove());
}

function createTasks(ol, tasks = new Array()) {
    if (tasks.length == 0) createTask(ol);
    else
        for (let i = 0; i < tasks.length; i++)
            if (tasks[i][tasks[i].length - 1] == "'") //если помечена как выполненная
                createTask(ol, tasks[i].slice(0, tasks[i].length - 1), 1);
            else createTask(ol, tasks[i]);
}

function createTask(ol, name = "task #" + t, completed = 0) {
    let li = document.createElement("li");
    li.innerHTML = name;
    li.setAttribute("contenteditable", "true");
    li.id = "t" + t;
    if (completed == 1) {
        li.classList.add('complete');
        ol.appendChild(li);
    } else {
        let span = document.createElement("span");
        span.id = "span" + t;
        let del = document.createElement("a");
        del.setAttribute("onclick", "deleteTask(" + t + ")");
        del.innerHTML = "delete";
        let complete = document.createElement("a");
        complete.setAttribute("onclick", "completeTask(" + t + ")");
        complete.innerHTML = "complete";
        span.appendChild(del);
        span.appendChild(complete);
        ol.appendChild(li);
        ol.appendChild(span);
    }
    t++;
}

function deleteTask(id) {
    document.getElementById("t" + id).remove();
    document.getElementById("span" + id).remove();
}

function completeTask(id) {
    document.getElementById("t" + id).classList.add('complete');
    document.getElementById("t" + id).setAttribute("contenteditable", "false");
    document.getElementById("span" + id).remove();
}

function saveToStorage() {
    localStorage.removeItem('storage');
    storage = new Array();
    let desks = document.getElementsByClassName('desk');
    let deskNumber = 0;
    for (let i = 1; i < desks.length + 1; i++) {
        let desk = document.getElementById("d" + i);
        let title = desk.getElementsByTagName("h2");
        let tasks = desk.getElementsByTagName("li");
        let value = "";
        if (tasks.length != 0) { //сохраняем, если доска не пуста
            storage[deskNumber] = new Array(tasks.length + 1);
            storage[deskNumber][0] = title[0].innerHTML;
            for (let j = 0; j < tasks.length; j++)
                if (tasks[j].classList.contains('complete')) storage[deskNumber][j + 1] = tasks[j].innerHTML + "'";
                else storage[deskNumber][j + 1] = tasks[j].innerHTML;
        }
        deskNumber++;
    }
    if (storage.length != 0)
        localStorage.setItem("storage", JSON.stringify(storage)); //сохраняем, если storage не пустой
}

function stringParser(str) {
    for (let i = 0; i < str.length; i++) {
        let deskName = str[i][0]; //название доски - первый элемент массива
        let tasks = new Array();
        for (let j = 0; str[i][j + 1] != null; j++)
            tasks[j] = str[i][j + 1];
        createDesk(deskName, tasks);
    }
}
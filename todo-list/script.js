let storage = "";
let d = 1;
let t = 1;

function start() {
    if (localStorage.length == 0) {
        createDesk();
    } else {
        stringParser(JSON.parse(localStorage.getItem('appStorage')));
    }
}

function clearStorage() {
    localStorage.removeItem('appStorage');
    location.reload();
}

function createDesk(deskName = "The name of the desk", tasks = "") {
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

function createTasks(ol, tasks = "") {
    let start = 0;
    if (tasks == "") {
        createTask(ol);
    } else {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i + 1] == "|") {
                if (tasks[i] == "'") //если помечена как выполненная
                    createTask(ol, tasks.slice(start, i), 1);
                else createTask(ol, tasks.slice(start, i + 1));
                start = i + 2;
            }
        }
    }
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
    localStorage.removeItem('appStorage');
    storage = "";
    let desks = document.getElementsByClassName('desk');
    for (let i = 1; i < desks.length + 1; i++) {
        let desk = document.getElementById("d" + i);
        let title = desk.getElementsByTagName("h2");
        let tasks = desk.getElementsByTagName("li");
        if (tasks.length != 0) { //сохраняем, если доска не пуста
            storage += title[0].innerHTML;
            storage += "{";
            for (let j = 0; j < tasks.length; j++) {
                storage += tasks[j].innerHTML;
                if (tasks[j].classList.contains('complete')) {
                    storage += "'";
                }
                storage += "|";
            }
            storage += "}";
        }
    }
    if (storage != "")
        localStorage.setItem("appStorage", JSON.stringify(storage)); //сохраняем, если storage не пустой
}

function stringParser(str) {
    let deskName = "";
    let tasks = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] != "{") {
            deskName += str[i];
        } else {
            i++;
            while (str[i] != "}") {
                tasks += str[i];
                i++;
            }
            //if (tasks != "") 
            createDesk(deskName, tasks);
            deskName = "";
            tasks = "";
        }
    }
}
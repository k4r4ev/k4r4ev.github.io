let d = 1;
let t = 1;

function createDesk() {
    let desk = document.createElement("div");
    desk.setAttribute("id", "d" + String(d));
    desk.className = "desk";
    //TITLE
    let title = document.createElement("div");
    title.className = "title";
    let titleText = document.createElement("h2");
    titleText.setAttribute("contenteditable", "true")
    let titleCaption = document.getElementById('deskName').value;
    if (titleCaption != "") {
        titleText.innerHTML = titleCaption;
    } else {
        titleText.innerHTML = "The name of the desk";
    }
    document.getElementById('deskName').value = null;
    let titleButton = document.createElement("a");
    let deleteDesk = "deleteDesk(d" + d + ");";
    titleButton.setAttribute("onclick", deleteDesk);
    titleButton.innerHTML = "&nbsp;delete";
    title.appendChild(titleText);
    title.appendChild(titleButton);
    desk.appendChild(title);
    desk.appendChild(document.createElement("hr"));
    //LIST
    let ul = document.createElement("ul");
    ul.className = "list";
    ul.id = "ul" + d;
    for (let i = 0; i < 3; i++) {
        createTask(ul);
    }
    desk.appendChild(ul);
    desk.appendChild(document.createElement("hr"));
    //FOOTER
    let footer = document.createElement("div");
    let input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("onclick", "createTask(ul" + d + ");");
    input.setAttribute("value", "Add new task");
    footer.appendChild(input);
    desk.appendChild(footer);
    document.getElementById("container").appendChild(desk);
    d++;
}

function deleteDesk(id) {
    document.getElementById(id.remove());
}

function createTask(ul) {
    let li = document.createElement("li");
    li.innerHTML = "task #" + t;
    li.setAttribute("contenteditable", "true");
    li.id = "t" + t;
    let span = document.createElement("span");
    span.id = "span" + t;
    let a = document.createElement("a");
    a.setAttribute("onclick", "deleteTask(" + t + ")");
    a.innerHTML = "delete";
    span.appendChild(a);
    ul.appendChild(li);
    ul.appendChild(span);
    t++;
}

function deleteTask(id) {
    document.getElementById("t" + id).remove();
    document.getElementById("span" + id).remove();
}

function changeTask() {
    alert("Task has been changed");
}
let d = 2;
let t = 4;

function createDesk() {
    let desk = document.createElement("div");
    desk.setAttribute("id", "d" + String(d));
    desk.className = "desk";
    let hr = document.createElement("hr");
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
    let titleButton = document.createElement("a");
    let deleteDesk = "deleteDesk(d" + d + ");";
    titleButton.setAttribute("onclick", deleteDesk);
    titleButton.innerHTML = "&nbsp;delete";
    title.appendChild(titleText);
    title.appendChild(titleButton);
    desk.appendChild(title);
    desk.appendChild(hr);
    //LIST
    let ul = document.createElement("ul");
    ul.className = "list";

    let li1 = document.createElement("li");
    li1.innerHTML = "task #1";
    li1.setAttribute("contenteditable", "true");
    li1.id = "t" + t;
    ul.appendChild(li1);
    let span1 = document.createElement("span");
    span1.id = "span" + t;
    span1.innerHTML = "<a onclick=deleteTask(" + t + ")>delete</a>&nbsp;<a onclick='changeTask();'>change</a>";
    t++;
    ul.appendChild(span1);

    let li2 = document.createElement("li");
    li2.innerHTML = "task #2";
    li2.setAttribute("contenteditable", "true");
    li2.id = "t" + t;
    ul.appendChild(li2);
    let span2 = document.createElement("span");
    span2.id = "span" + t;
    span2.innerHTML = "<a onclick='deleteTask(" + t + ");'>delete</a>&nbsp;<a onclick='changeTask();'>change</a>";
    t++;
    ul.appendChild(span2);

    let li3 = document.createElement("li");
    li3.innerHTML = "task #3";
    li3.setAttribute("contenteditable", "true");
    li3.id = "t" + t;
    ul.appendChild(li3);
    let span3 = document.createElement("span");
    span3.id = "span" + t;
    span3.innerHTML = "<a onclick='deleteTask(" + t + ");'>delete</a>&nbsp;<a onclick='changeTask();'>change</a>";
    t++;
    ul.appendChild(span3);
    desk.appendChild(ul);
    desk.appendChild(hr);
    //FOOTER
    let footer = document.createElement("div");
    let input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("placeholder", "Name of new task");
    footer.appendChild(input1);
    let input2 = document.createElement("input");
    input2.setAttribute("type", "button");
    input2.setAttribute("onclick", "createTask();");
    input2.setAttribute("value", "Add new task");
    footer.appendChild(input2);
    desk.appendChild(footer);
    document.getElementById("container").appendChild(desk);
    alert("Desk has been created");
    d++;
}

function deleteDesk(id) {
    document.getElementById(id.remove());
    alert("Desk has been deleted");
}

function createTask() {
    alert("Task has been created");
}

function deleteTask(id) {
    alert(id);
    let task = "t" + id;
    console.log('task',task);
    console.log('taskdelete',document.getElementById(task).remove());
    document.getElementById(task.remove());
    let span = "span" + id;
    document.getElementById(span.remove());
    alert("Task has been deleted");
}

function changeTask() {
    alert("Task has been changed");
}

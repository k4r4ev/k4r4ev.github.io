function createDesk() {
    let desk = document.createElement('div');
    desk.className = "alert";
    desk.innerHTML = `
    <div id="d1" class="desk">
        <div>
            <h2>The name of the desk</h2>
            <a onclick="deleteDesk();">&nbsp;delete</a>
        </div>
        <hr>
        <ul class="list">
            <li id="d1t1" contenteditable="true">task #1</li>
            <span contenteditable="false">(<a onclick="deleteTask();">delete</a>|<a
                    onclick="changeTask();">change</a>)</span>
            <li id="d1t2" contenteditable="true">task #1</li>
            <span contenteditable="false">(<a onclick="deleteTask();">delete</a>|<a
                    onclick="changeTask();">change</a>)</span>
            <li id="d1t3" contenteditable="true">task #1</li>
            <span contenteditable="false">(<a onclick="deleteTask();">delete</a>|<a
                    onclick="changeTask();">change</a>)</span>
        </ul>
        <hr>
        <div>
            <input type="text" placeholder="Name of new task">
            <input type="button" value="Add new task">
        </div>
    </div>`;

    document.body.append(desk);
    alert("Task has been created");
}

function deleteDesk() {
    alert("Desk has been deleted");
}

function createTask() {
    alert("Task has been created");
}

function deleteTask() {
    alert("Task has been deleted");
}

function changeTask() {
    alert("Task has been changed");
}
let windows = document.getElementById("window")
document.addEventListener("click", (e) => drag(e));

function drag(e) {
    windows.style.top = e.pageX;
    windows.style.left = e.pageY;
}
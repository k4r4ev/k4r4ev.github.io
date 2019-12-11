document.getElementById('button').addEventListener('click', () => init(), false);

function init() {
    VK.init({
        apiId: 7241349
    });
    login();
    getFriends();
}

function login() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(function (response) {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error(response.error.error_msg));
            }
        }, 2);
    });
};

function getFriends() {
    return new Promise((resolve, reject) => {
        VK.api('friends.get', {
            v: '5.8',
            name_case: 'nom',
            fields: 'first_name, last_name, photo_100'
        }, response => {
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                let {
                    response: {
                        items
                    }
                } = response;
                resolve(items);
                console.log(items);
                drawFriends(items);
            }
        });
    });
};

function drawFriends(items) {
    document.getElementById("container").innerHTML = "";
    let friends = document.createElement("div");
    friends.classList.add("friends");
    for (item in items) {
        let friend = document.createElement("div");
        friend.classList.add("friend");
        let img = document.createElement("img");
        img.src = items[item].photo_100;
        let infoDiv = document.createElement("div");
        let name = document.createElement("a");
        name.innerHTML = items[item].first_name + " " + items[item].last_name;
        name.href = "https://vk.com/id" + items[item].id;
        infoDiv.appendChild(name);
        if (items[item].city) {
            let city = document.createElement("p");
            city.innerHTML = items[item].city.title;
            city.classList.add("city");
            infoDiv.appendChild(city);
        }
        if (items[item].online || items[item].online == 1) {
            let online = document.createElement("div");
            online.classList.add("online");
            infoDiv.appendChild(online);
        }
        friend.appendChild(img);
        friend.appendChild(infoDiv);
        friends.appendChild(friend);
        if (item != items.length - 1) {
            friends.appendChild(document.createElement("hr"));
        }
    }
    document.getElementById('container').appendChild(friends);
}
let token = "";

function getUrl(method, params) {
    params = params || {};
    params['access_token'] = token;
    return "https://api.vk.com/method/" + method + "?" + $.param(params);
}

function sendRequests(method, params, func) {
    $.ajax({
        url: getUrl(method, params),
        method: 'GET',
        dataType: 'JSONP',
        success: func
    });
}

function getFriends() {
    sendRequests("friends.search", {
        count: 1000,
        fields: "photo_100,city,online",
        v: "5.52"
    }, function (data) {
        drawFriends(data);
        return data;
    });
}

function drawFriends(data) {
    console.log(data);
    let friends = document.createElement("div");
    friends.classList.add("friends");
    for (item in data.response.items) {
        let friend = document.createElement("div");
        friend.classList.add("friend");
        let img = document.createElement("img");
        img.src = data.response.items[item].photo_100;

        let infoDiv = document.createElement("div");
        let name = document.createElement("a");
        name.innerHTML = data.response.items[item].first_name + " " + data.response.items[item].last_name;
        name.href = "https://vk.com/id" + data.response.items[item].id;
        infoDiv.appendChild(name);
        if (data.response.items[item].city) {
            let city = document.createElement("p");
            city.innerHTML = data.response.items[item].city.title;
            city.classList.add("city");
            infoDiv.appendChild(city);
        }
        if (data.response.items[item].online || data.response.items[item].online == 1) {
            let online = document.createElement("div");
            online.classList.add("online");
            infoDiv.appendChild(online);
        }
        friend.appendChild(img);
        friend.appendChild(infoDiv);
        friends.appendChild(friend);
        if (item != data.response.count - 1)
            friends.appendChild(document.createElement("hr"));
    }
    document.getElementById('container').appendChild(friends);
}
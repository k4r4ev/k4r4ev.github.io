window.onload = function () {
    let canvas = document.getElementById('canvas');
    let video = document.getElementById('video');
    let button = document.getElementById('button');
    let context = canvas.getContext('2d');
    let videoStreamUrl = false;

    //функция которая будет выполнена при нажатии на кнопку захвата кадра
    function captureMe() {
        if (!videoStreamUrl) alert('Разрешите доступ к микрофону')
        //переворачиваем canvas зеркально по горизонтали (см. описание внизу статьи)
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        //отрисовываем на канвасе текущий кадр видео
        context.drawImage(video, 0, 0, video.width, video.height);
        //получаем data: url изображения c canvas
        let base64dataUrl = canvas.toDataURL('image/png');
        context.setTransform(1, 0, 0, 1, 0, 0); // убираем все кастомные трансформации canvas
        //на этом этапе можно спокойно отправить  base64dataUrl на сервер и сохранить его там как файл (ну или типа того) 
        //но мы добавим эти тестовые снимки в наш пример:
        let img = new Image();
        img.src = base64dataUrl;
        console.log(base64dataUrl);
        window.document.getElementById('photos').appendChild(img);
    }

    button.addEventListener('click', captureMe);

    //запрашиваем разрешение на доступ к поточному видео камеры
    navigator.getUserMedia({
        video: true
    }, function (stream) {
        //разрешение от пользователя получено
        //получаем url поточного видео
        videoStreamUrl = true;
        video.srcObject = stream
        video.play();
    }, function () {
        console.log('Разрешите доступ к микрофону');
    });
};
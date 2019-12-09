window.onload = function () {
    let canvas = document.getElementById('canvas');
    let video = document.getElementById('video');
    let button = document.getElementById('button');
    let context = canvas.getContext('2d');

    function captureMe() {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, video.width, video.height);
        let base64dataUrl = canvas.toDataURL('image/png');
        context.setTransform(1, 0, 0, 1, 0, 0);
        let img = new Image();
        img.src = base64dataUrl;
        console.log(base64dataUrl);
        window.document.getElementById('photos').appendChild(img);
    }

    button.addEventListener('click', captureMe);

    navigator.getUserMedia({
        video: true
    }, function (stream) {
        video.srcObject = stream;
        video.play();
    }, function () {
        console.log('Error');
    });
};
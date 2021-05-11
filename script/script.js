const video = document.getElementById("video");
video.width = window.screen.width;
video.height = window.screen.height;

var topLeftX, topLeftY, topRightX, topRightY;

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;

var player;
var ball;

var start = false;

function startVideo() {
    navigator.getUserMedia({ video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
    );
}

video.addEventListener("play", () => {
    const displaySize = { width: video.width, height: video.height };

    setInterval(async() => {
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        );
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        if (resizedDetections[0]) {
            topLeftX = video.width - resizedDetections[0].box.topLeft.x;
            topLeftY = resizedDetections[0].box.topLeft.y + screenHeight / 2.8;
            topRightX = (resizedDetections[0].box.topRight.x - video.width) * -1;
            topRightY = resizedDetections[0].box.topRight.y + screenHeight / 2.8;

            player.update((topLeftX + topRightX) / 2, topLeftY);
        }
    }, 100);
});

function setup() {
    player = new Pad();
    ball = new Ball();
    const canvas = createCanvas(video.width, video.height);
    canvas.parent("container");

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    ]).then(startVideo);
}

function keyPressed() {
    if (keyCode == 32) {
        start = !start;
    }
    if (keyCode == 82) {
        start = false;
        ball.reset();
    }
}

function draw() {
    clear();
    noFill();
    stroke(0);
    strokeWeight(8);
    rect(100, 0, screenWidth - 200, screenHeight);
    background(0, 200);

    if (start) ball.update(player);

    player.show();
    ball.show();
}
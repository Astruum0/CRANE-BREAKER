// const video = document.getElementById("video");
// video.width = window.screen.width;
// video.height = window.screen.height;

var topLeftX, topLeftY, topRightX, topRightY;

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;

sidePadding = 100;

gameWidth = screenWidth - sidePadding * 2;

var player;
var ball;

var bricks = [];

var start = false;

function startVideo() {
    navigator.getUserMedia({ video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
    );
}

// video.addEventListener("play", () => {
//     const displaySize = { width: video.width, height: video.height };

//     setInterval(async() => {
//         const detections = await faceapi.detectAllFaces(
//             video,
//             new faceapi.TinyFaceDetectorOptions()
//         );
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         if (resizedDetections[0]) {
//             topLeftX = video.width - resizedDetections[0].box.topLeft.x;
//             topLeftY = resizedDetections[0].box.topLeft.y + screenHeight / 2.8;
//             topRightX = (resizedDetections[0].box.topRight.x - video.width) * -1;
//             topRightY = resizedDetections[0].box.topRight.y + screenHeight / 2.8;

//             player.update((topLeftX + topRightX) / 2, topLeftY);
//         }
//     }, 100);
// });

function setup() {
    player = new Pad();
    ball = new Ball();
    const canvas = createCanvas(screenWidth, screenHeight);
    canvas.parent("container");

    for (var j = 0; j < 4; j++) {
        for (var i = sidePadding; i < gameWidth; i += gameWidth / 10) {
            bricks.push(new Brick(i, j * 50 + 50, gameWidth / 10, 50, true));
        }
    }

    // Promise.all([
    //     faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
    //     faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    // ]).then(startVideo);
}

function draw() {
    clear();
    noFill();
    stroke(0);
    strokeWeight(8);
    rect(sidePadding, 0, screenWidth - sidePadding * 2, screenHeight);
    background(0, 200);

    if (start) ball.update(player, bricks);

    player.update(mouseX, mouseY);

    player.show();
    ball.show();

    for (var i = 0; i < bricks.length; i++) {
        bricks[i].show();
    }
}
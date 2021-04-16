const video = document.getElementById("video");
video.width = window.screen.width;
video.height = window.screen.height;

var topLeftX, topLeftY, topRightX, topRightY;

const player = new Pad();

function startVideo() {
    navigator.getUserMedia({ video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
    );
}

video.addEventListener("play", () => {
    const displaySize = { width: video.width, height: video.height };

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        );
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        if (resizedDetections[0]) {
            topLeftX = video.width - resizedDetections[0].box.topLeft.x;
            topLeftY = resizedDetections[0].box.topLeft.y;
            topRightX = (resizedDetections[0].box.topRight.x - video.width) * -1;
            topRightY = resizedDetections[0].box.topRight.y;

            player.update((topLeftX + topRightX) / 2, topLeftY);
        }
    }, 100);
});

function setup() {
    const canvas = createCanvas(video.width, video.height);
    console.log(video.width, video.height);
    canvas.parent("container");

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    ]).then(startVideo);
}

function draw() {
    clear();
    player.show();
}
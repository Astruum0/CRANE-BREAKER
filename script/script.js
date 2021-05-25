faceapi.env.monkeyPatch({
    Canvas: HTMLCanvasElement,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement("canvas"),
    createImageElement: () => document.createElement("img"),
});

const video = document.getElementById("video");
video.width = window.screen.width;
video.height = window.screen.height;

var topLeftX, topLeftY, topRightX, topRightY;

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;

sidePadding = 100;

gameWidth = screenWidth - sidePadding * 2;

var player;
var ball;

var bricks = [];

var start = false;

var gameoverBackground = document.getElementsByClassName("gameoverScreen")[0];
var gameoverDiv = document.getElementsByClassName("gameoverDiv")[0];
var userScoreDiv = document.getElementById("userScore");
var gameover = false;

function isLevelCleared(level) {
    for (var i = 0; i < level.length; i++) {
        if (level[i].breakable) {
            return false;
        } else {
            addScore(player.score);
        }
    }
    return true;
}

function toggleGameOver() {
    if (!gameover) {
        gameover = true;

        gameoverBackground.style.visibility = "inherit";
        gameoverBackground.style.opacity = 0.5;

        gameoverDiv.style.visibility = "inherit";
        gameoverDiv.style.opacity = 1;

        userScoreDiv.innerText = "Votre score : " + player.score + " pts";
    } else {
        gameoverBackground.style.visibility = "hidden";
        gameoverBackground.style.opacity = 0;

        gameoverDiv.style.visibility = "hidden";
        gameoverDiv.style.opacity = 0;
        gameover = false;
    }
}

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
            topLeftY = resizedDetections[0].box.topLeft.y + screenHeight / 5;
            topRightX = (resizedDetections[0].box.topRight.x - video.width) * -1;
            topRightY = resizedDetections[0].box.topRight.y + screenHeight / 5;

            player.update((topLeftX + topRightX) / 2, topLeftY);
        }
    }, 100);
});

function setup() {
    player = new Pad();
    ball = new Ball();
    const canvas = createCanvas(screenWidth, screenHeight);
    canvas.parent("container");

    bricks = generateLevel(15, 15);

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    ]).then(startVideo);
}

function keyPressed() {
    if (keyCode == 32 && !start && !gameover) {
        start = true;
    }
    // if (keyCode == 82) {
    //     start = false;
    //     ball.reset();
    //     bricks = generateLevel(15, 15);
    //     addScore(player.score);
    //     player.score = 0;
    // }
}

function draw() {
    clear();
    noFill();
    rectMode(CORNER);
    stroke(0);
    strokeWeight(8);
    rect(sidePadding, 0, screenWidth - sidePadding * 2, screenHeight);
    background(0, 200);

    if (start && ball.update(player, bricks)) {
        toggleGameOver();
        start = false;
        ball.reset();
        bricks = generateLevel(15, 15);
        player.score = 0;
    }
    if (isLevelCleared(bricks)) {
        start = false;
        ball.reset();
        bricks = generateLevel(15, 15);
        player.score += 1000;
    }

    // player.update(mouseX, mouseY);

    player.show();
    ball.show();

    textSize(28);
    text(player.score, 20, 100);

    for (var i = 0; i < bricks.length; i++) {
        bricks[i].show();
    }

    if (!start) {
        rectMode(CENTER);
        textAlign(CENTER, TOP);
        textSize(32);
        fill(255);
        text(
            "Press space to continue . . .",
            screenWidth / 2,
            (screenHeight * 2) / 3
        );
    }
}

// Add score from game
function addScore(playerscore) {
    getPlayerScore = playerscore;
    if (store.get("connected") == "true") {
        const addscorequery =
            "INSERT INTO scores (user_id, score, score_date) VALUES ('" +
            store.get("user_id") +
            "', '" +
            getPlayerScore +
            "', NOW())";

        con.query(addscorequery, function(err, result) {
            if (err) throw err;
        });
    } else {
        false;
    }
}
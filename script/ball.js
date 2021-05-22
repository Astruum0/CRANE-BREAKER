var pointInPolygon = require("point-in-polygon");

class Ball {
    constructor(x = screenWidth / 2, y = screenHeight / 2) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-10, 10), random(5));
        this.r = 13;
        this.hit = false;
        this.bounciness = 0.2;
    }

    reset() {
        this.pos = createVector(screenWidth / 2, screenHeight / 2);
        this.vel = createVector(random(-7, 7), random(3, 7));
    }

    bounce(pad) {
        this.hit = true;
        this.vel.y *= -0.95;
        this.vel.y += pad.direction.y * this.bounciness;
        this.vel.x += pad.direction.x * this.bounciness;

        this.pos.y = pad.y - this.r;
    }

    update(pad, bricks) {
        for (var i = -1; i < 2; i += 2) {
            if (pointInPolygon([this.pos.x + this.r * i, this.pos.y], pad.hitbox)) {
                this.bounce(pad);
                break;
            }
            if (pointInPolygon([this.pos.x, this.pos.y + this.r * i], pad.hitbox)) {
                this.bounce(pad);
                break;
            }
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.pos.x - this.r / 2 <= 100) {
            this.vel.x *= -0.95;
            this.pos.x = 100 + this.r / 2;
        }
        if (this.pos.x + this.r / 2 >= screenWidth - 100) {
            this.vel.x *= -0.95;
            this.pos.x = screenWidth - 100 - this.r / 2;
        }
        if (this.pos.y - this.r / 2 <= 0) {
            this.vel.y *= -0.95;
            this.pos.y = this.r / 2;
        }

        let brickIndex = this.intersectWithBrick(bricks);
        if (brickIndex != undefined && bricks[brickIndex].breakable) {
            bricks.splice(brickIndex, 1);
        }
    }

    intersectWithBrick(bricks) {
        for (var i = 0; i < bricks.length; i++) {
            let brick = {
                x1: bricks[i].x,
                y1: bricks[i].y,
                x2: bricks[i].x + bricks[i].w,
                y2: bricks[i].y + bricks[i].h,
            };
            if (
                this.pos.x >= brick.x1 &&
                this.pos.x <= brick.x2 &&
                ((this.pos.y - this.r <= brick.y1 && this.pos.y + this.r >= brick.y1) ||
                    (this.pos.y - this.r <= brick.y2 && this.pos.y + this.r >= brick.y2))
            ) {
                if (this.vel.y <= 0) {
                    this.pos.y = brick.y2 + this.r;
                } else if (this.vel.y > 0) {
                    this.pos.y = brick.y1 - this.r;
                }
                this.vel.y *= -0.98;
                return i;
            } else if (
                this.pos.y >= brick.y1 &&
                this.pos.y <= brick.y2 &&
                ((this.pos.x - this.r <= brick.x1 && this.pos.x + this.r >= brick.x1) ||
                    (this.pos.x - this.r <= brick.x2 && this.pos.x + this.r >= brick.x2))
            ) {
                if (this.vel.x <= 0) {
                    this.pos.x = brick.x2 + this.r;
                } else if (this.vel.y > 0) {
                    this.pos.x = brick.x1 - this.r;
                }

                this.vel.x *= -0.98;
                return i;
            }
        }
    }

    show() {
        fill(255);
        stroke(0);
        strokeWeight(2);
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}
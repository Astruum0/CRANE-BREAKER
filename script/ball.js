var pointInPolygon = require("point-in-polygon");

class Ball {
    constructor(x = screenWidth / 2, y = screenHeight / 2) {
        this.pos = createVector(x, y);
        this.vel = createVector(-5, -10);
        this.r = 20;
        this.hit = false;
        this.bounciness = 0.2;
    }

    reset() {
        this.pos = createVector(screenWidth / 2, screenHeight / 2);
        this.vel = createVector(-5, -10);
    }

    bounce(pad) {
        this.hit = true;
        this.vel.y *= -0.95;
        this.vel.y += pad.direction.y * this.bounciness;
        this.vel.x += pad.direction.x * this.bounciness;

        this.pos.y = pad.y - this.r;
    }

    update(pad) {
        // if (
        //     this.hit == false &&
        //     this.pos.x + this.r >= pad.x - pad.width / 2 &&
        //     this.pos.x - this.r <= pad.x + pad.width / 2 &&
        //     this.pos.y + this.r >= pad.y &&
        //     this.pos.y - this.r <= pad.y + pad.height / 2
        // ) {
        //     this.hit = true;
        //     this.vel.y *= -0.95;
        //     this.vel.y += pad.direction.y * 0.1;
        //     this.vel.x += pad.direction.x * 0.1;
        // } else {
        //     this.hit = false;
        // }
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
    }

    show() {
        fill(255);
        stroke(0);
        strokeWeight(0);
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}
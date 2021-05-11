class Ball {
    constructor(x = screenWidth / 2, y = screenHeight / 2) {
        this.pos = createVector(x, y);
        this.vel = createVector(-5, -10);
        this.r = 20;
    }

    reset() {
        this.pos = createVector(screenWidth / 2, screenHeight / 2);
        this.vel = createVector(-5, -10);
    }

    update(pad) {
        if (
            this.pos.x + this.r >= pad.x - pad.width / 2 &&
            this.pos.x - this.r <= pad.x + pad.width / 2 &&
            this.pos.y + this.r >= pad.y &&
            this.pos.y - this.r <= pad.y + pad.height / 2
        ) {
            this.vel.y *= -1;
            this.vel.y += pad.direction.y * 0.1;
            this.vel.x += pad.direction.x * 0.1;
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.pos.x - this.r / 2 <= 100) {
            this.vel.x *= -1;
            this.pos.x = 100 + this.r / 2;
        }
        if (this.pos.x + this.r / 2 >= screenWidth - 100) {
            this.vel.x *= -1;
            this.pos.x = screenWidth - 100 - this.r / 2;
        }
        if (this.pos.y - this.r / 2 <= 0) {
            this.vel.y *= -1;
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
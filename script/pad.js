width = window.screen.width;
height = window.screen.height;

class Pad {
    constructor() {
        this.width = height / 5;
        this.x = width / 2;
        this.y = height / 2;
        this.height = this.width / 20;
        this.direction = createVector(this.x, this.y);

        this.hitbox = [
            [this.x - this.width / 2, this.y],
            [this.x + this.width / 2, this.y],
            [this.x - this.width / 2, this.y + this.height],
            [this.x + this.width / 2, this.y + this.height],
        ];

        this.score = 0;
    }
    update(x, y) {
        this.x = x;
        this.y = y;

        if (this.direction.y < 0) {
            this.hitbox = [
                [this.x - this.width / 2, this.y],
                [this.x + this.width / 2, this.y],
                [
                    this.x + this.width / 2 - this.direction.x,
                    this.y + this.height - this.direction.y,
                ],
                [
                    this.x - this.width / 2 - this.direction.x,
                    this.y + this.height - this.direction.y,
                ],
            ];
        } else {
            this.hitbox = [
                [this.x - this.width / 2 - this.direction.x, this.y - this.direction.y],
                [this.x + this.width / 2 - this.direction.x, this.y - this.direction.y],
                [this.x + this.width / 2, this.y + this.height],
                [this.x - this.width / 2, this.y + this.height],
            ];
        }
    }
    show() {
        stroke(255, 0, 0);
        rect(this.x - this.width / 2, this.y, this.width, this.height);
        strokeWeight(4);
        //line(this.x, this.y, this.x + this.direction.x, this.y + this.direction.y);
    }
}
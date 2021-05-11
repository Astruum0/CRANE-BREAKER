class Pad {
    constructor() {
        this.width = screenWidth / 5;
        this.x = width / 2;
        this.y = height / 2;
        this.height = this.width / 10;
        this.direction = createVector(this.x, this.y);

        this.hitbox = [
            [this.x - this.width / 2, this.y],
            [this.x + this.width / 2, this.y],
            [this.x - this.width / 2, this.y + this.height],
            [this.x + this.width / 2, this.y + this.height],
        ];
    }
    update(x, y) {
        this.direction.x = x - this.x;
        this.direction.y = y - this.y;
        this.x = x;
        this.y = y;

        if (this.direction.y < 0) {
            this.hitbox = [
                [this.x - this.width / 2, this.y],
                [this.x + this.width / 2, this.y],
                [
                    this.x - this.width / 2 - this.direction.x,
                    this.y + this.height - this.direction.y,
                ],
                [
                    this.x + this.width / 2 - this.direction.x,
                    this.y + this.height - this.direction.y,
                ],
            ];
        } else {
            this.hitbox = [
                [this.x - this.width / 2 - this.direction.x, this.y - this.direction.y],
                [this.x + this.width / 2 - this.direction.x, this.y - this.direction.y],
                [this.x - this.width / 2, this.y + this.height],
                [this.x + this.width / 2, this.y + this.height],
            ];
        }
    }
    show() {
        fill(255, 255, 255);
        stroke(255, 0, 0);
        strokeWeight(1);
        rect(this.x - this.width / 2, this.y, this.width, this.height);
        strokeWeight(4);
        line(this.x, this.y, this.x + this.direction.x, this.y + this.direction.y);
    }
}
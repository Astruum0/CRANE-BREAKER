width = window.screen.width;
height = window.screen.height;

class Pad {
    constructor() {
        this.width = height / 5;
        this.x = width / 2;
        this.y = width / 2;
        this.height = this.width / 10;
    }
    update(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        stroke(255, 0, 0);
        rect(this.x - this.width / 2, this.y, this.width, this.height);
    }
}
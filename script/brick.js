class Brick {
    constructor(x, y, w, h, breakable, color = "blue") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.breakable = breakable;
        this.color = color;
    }

    show() {
        strokeWeight(4);
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }
}
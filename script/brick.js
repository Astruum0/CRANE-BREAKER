class Brick {
    constructor(x, y, w, h, breakable = true) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.breakable = breakable;
        this.color = breakable ? color("blue") : color("grey");
    }

    show() {
        stroke(0);
        strokeWeight(4);
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }
}
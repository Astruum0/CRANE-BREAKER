const generateLevel = (row, col) => {
    let bricks = [];

    let brickHeight = screenHeight / 3 / row;
    let brickWidth = gameWidth / col;

    let diamondShape = random() <= 0.3;
    let reversedDiamondShape = diamondShape ? false : random() <= 0.3;

    let halfVertical = random() <= 0.4;
    let halfHorizontal = random() <= 0.4;

    let diagonal = random() <= 0.5;
    let reverseDiagonal = diagonal ? false : random() <= 0.4;
    let fillUnbreakableDiagonal = false;

    let thickness = Math.floor(Math.random() * 4 + 2);

    let x,
        y = -1;
    for (var j = 0; j < screenHeight / 3; j += brickHeight) {
        y += 1;
        x = -1;
        for (var i = 0; i < gameWidth; i += brickWidth) {
            x += 1;
            if (halfVertical) {
                if (abs(x - parseInt(col / 2)) < thickness / 2) {
                    bricks.push(
                        new Brick(i + sidePadding, j + 30, brickWidth, brickHeight)
                    );
                    continue;
                }
            }
            if (halfHorizontal) {
                if (abs(y - parseInt(row / 2)) < thickness / 2) {
                    bricks.push(
                        new Brick(i + sidePadding, j + 30, brickWidth, brickHeight)
                    );
                    continue;
                }
            }

            if (reverseDiagonal) {
                if (!(
                        abs(x - y) <= thickness - 1 || abs(col - x - 1 - y) <= thickness - 1
                    )) {
                    bricks.push(
                        new Brick(i + sidePadding, j + 30, brickWidth, brickHeight)
                    );
                }
            } else if (diagonal) {
                if (
                    abs(x - y) <= thickness - 1 ||
                    abs(col - x - 1 - y) <= thickness - 1
                ) {
                    bricks.push(
                        new Brick(i + sidePadding, j + 30, brickWidth, brickHeight)
                    );
                    //continue;
                } else if (fillUnbreakableDiagonal) {
                    bricks.push(
                        new Brick(i + sidePadding, j + 30, brickWidth, brickHeight, false)
                    );
                    //continue;
                }
            }

            if (diamondShape) {
                if (Math.min(y, row - y - 1) >= abs(x - parseInt(row / 2))) {
                    bricks.push(
                        new Brick(i + sidePadding, j + 30, brickWidth, brickHeight)
                    );
                }
            } else if (reversedDiamondShape) {
                if (Math.min(y, row - y - 1) <= abs(x - parseInt(row / 2))) {
                    bricks.push(
                        new Brick(i + sidePadding, j + 30, brickWidth, brickHeight)
                    );
                }
            }

            if (!(diamondShape || reversedDiamondShape || diagonal || reverseDiagonal)) {
                bricks.push(
                    new Brick(i + sidePadding, j + 30, brickWidth, brickHeight)
                );
                continue;
            }
        }
    }
    return bricks;
};
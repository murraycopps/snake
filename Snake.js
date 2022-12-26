import { Line } from "./Line.js";
export class Snake {
    constructor(length = 4, parent) {
        this.x = 4;
        this.y = Math.floor(parent.height / 2);
        this.length = length;
        this.startLength = length;
        this.direction = "start";
        this.currentDirection = null;
        this.nextDirection = null;
        this.firstTurn = true;
        this.parent = parent;
        this.pieces = [[this.x - 3, this.y, 4], [this.x - 2, this.y, 3], [this.x - 1, this.y, 2], [this.x, this.y, 1]];
        this.overlayElements = [];

        var lines = this.findLines();
        for (var i in lines) {
            var corner1 = null;
            if (i != lines.length - 1) {
                corner1 = this.findCorner(lines[i * 1], lines[i * 1 + 1]);
            }
            var corner2 = null;
            if (i != 0) {
                corner2 = this.findCorner(lines[i * 1 - 1], lines[i * 1]);
            }
            var end = null;
            if (i == 0) {
                end = this.findEnd(lines[i * 1]);
            }
            this.overlayElements.push(new Line(this.parent.overlay, lines[i], corner1, corner2, end));
        }
        this.parent.overlay.appendChild(this.createHead());


        document.addEventListener('keydown', (event) => {
            if (event.key == " ") {
                this.parent.paused = !this.parent.paused;
            }
            if (this.firstTurn && this.nextDirection == null) {
                if (event.key == "ArrowUp" && this.currentDirection != "s") {
                    this.direction = "n";
                }
                if (event.key == "ArrowDown" && this.currentDirection != "n") {
                    this.direction = "s";
                }
                if (event.key == "ArrowLeft" && this.currentDirection != "e") {
                    this.direction = "w";
                }
                if (event.key == "ArrowRight" && this.currentDirection != "w") {
                    this.direction = "e";
                }
                this.firstTurn = false;
            }
            else if (this.nextDirection == null) {
                if (event.key == "ArrowUp" && this.direction != "s" && this.direction != "n") {
                    this.nextDirection = "n";
                }
                if (event.key == "ArrowDown" && this.direction != "n" && this.direction != "s") {
                    this.nextDirection = "s";
                }
                if (event.key == "ArrowLeft" && this.direction != "e" && this.direction != "w") {
                    this.nextDirection = "w";
                }
                if (event.key == "ArrowRight" && this.direction != "w" && this.direction != "e") {
                    this.nextDirection = "e";
                }
            }


        });
    }
    move() {
        if (this.direction == "start") return;



        if (this.direction == "n" && this.y > 0) {
            this.y -= 1;
        }
        else if (this.direction == "e" && this.x < this.parent.width - 1) {
            this.x += 1;
        }
        else if (this.direction == "s" && this.y < this.parent.height - 1) {
            this.y += 1;
        }
        else if (this.direction == "w" && this.x > 0) {
            this.x -= 1;
        }
        else {
            this.parent.game.lose();
            return;
        }

        if (this.parent.squares[this.y][this.x].element.classList.contains("food")) {
            this.length += 1;
            this.parent.squares[this.y][this.x].element.classList.remove("food");
            this.parent.randomFood();
        }

        this.currentDirection = this.direction;
        var opposite = {
            "n": "s",
            "s": "n",
            "e": "w",
            "w": "e"
        }
        if (this.nextDirection != null && opposite[this.nextDirection] != this.currentDirection) {
            this.direction = this.nextDirection;
            this.nextDirection = null;
        }
        else {
            this.firstTurn = true;
        }

        for (var piece of this.pieces) {
            piece[2]++;
            if (piece[2] >= this.length) {
                this.pieces.shift();
            }
        }
        for (var piece of this.pieces) {
            if (piece[0] == this.x && piece[1] == this.y) {
                this.parent.game.lose();
                return;
            }
        }

        this.pieces.push([this.x, this.y, 1]);
        this.parent.update(this.pieces);

        // console.log(this.parent.overlay.innerHTML[0]);
        // this.parent.overlay.innerHTML = null;
        //loop through overlay elements and remove them
        for (var i in this.overlayElements) {
            this.overlayElements[i].element.remove();
        }
        this.overlayElements = [];


        var lines = this.findLines();

        //if length of lines is greater than length of overlay elements remove the first element
        if (lines.length > this.overlayElements.length) {
            this.overlayElements.shift();
        }
        //loop through lines and overlay elements and update them
        for (var i in lines) {
            var corner1 = null;
            if (i != lines.length - 1) {
                corner1 = this.findCorner(lines[i * 1], lines[i * 1 + 1]);
            }
            var corner2 = null;
            if (i != 0) {
                corner2 = this.findCorner(lines[i * 1 - 1], lines[i * 1]);
            }
            var end = null;
            if (i == 0) {
                end = this.findEnd(lines[i * 1]);
            }
            if (this.overlayElements[i] == undefined) {
                this.overlayElements.push(new Line(this.parent.overlay, lines[i], corner1, corner2, end));
            }
            else {
                this.overlayElements[i].update(lines[i], corner1, corner2, end);
            }
        }
        this.moveHead();

    }
    findLines() {
        var lines = [];
        var firstInLine = this.pieces[0];
        for (var i in this.pieces) {
            if (this.pieces[i][0] == firstInLine[0] || this.pieces[i][1] == firstInLine[1]) continue;
            lines.push([firstInLine, this.pieces[i - 1]]);
            firstInLine = this.pieces[i - 1];

        }
        lines.push([firstInLine, this.pieces[this.pieces.length - 1]]);
        return lines;
    }
    createHead() {
        var head = document.createElement('div');
        head.classList.add("head");
        head.classList.add(this.directionClasses()[this.direction]);
        head.style.gridColumn = this.x + 1;
        head.style.gridRow = this.y + 1;

        var eye = document.createElement('div');
        eye.classList.add("eye");
        head.appendChild(eye);

        eye = document.createElement('div');
        eye.classList.add("eye");
        head.appendChild(eye);

        var mouthParent = document.createElement('div');
        mouthParent.classList.add("mouth-parent");

        var mouthChild = document.createElement('div');
        mouthChild.classList.add("mouth-child");

        mouthParent.appendChild(mouthChild);
        head.appendChild(mouthParent);

        this.head = head;

        return head;
    }
    moveHead(){
        //remove all classes from head
        for(var i in this.directionClasses()){
            this.head.classList.remove(this.directionClasses()[i]);
        }
        this.head.classList.add(this.directionClasses()[this.direction]);
        let root = document.documentElement;
        root.style.setProperty('--xPos', this.x+1);
        root.style.setProperty('--yPos', this.y+1);
        setTimeout(function(){
            this.head.style.gridColumn = this.x + 1;
            this.head.style.gridRow = this.y + 1;
        }.bind(this), 1000);
    }
    findCorner(line1, line2) {
        var corner = line1[1];
        var direction;

        if (corner[0] > line1[0][0]) {
            direction = "w";
        }
        else if (corner[0] < line1[0][0]) {
            direction = "e";
        }
        else if (corner[1] > line1[0][1]) {
            direction = "n";
        }
        else if (corner[1] < line1[0][1]) {
            direction = "s";
        }


        if (corner[0] > line2[1][0]) {
            direction += "w";
        }
        else if (corner[0] < line2[1][0]) {
            direction += "e";
        }
        else if (corner[1] > line2[1][1]) {
            direction += "n";
        }
        else if (corner[1] < line2[1][1]) {
            direction += "s";
        }
        // console.log(direction)
        return direction;
    }
    findEnd(line) {
        var direction;
        if (line[0][0] > line[1][0]) {
            direction = "w";
        }
        else if (line[0][0] < line[1][0]) {
            direction = "e";
        }
        else if (line[0][1] > line[1][1]) {
            direction = "n";
        }
        else if (line[0][1] < line[1][1]) {
            direction = "s";
        }
        return direction;
    }
    directionClasses() {
        return {
            "n": "head-north",
            "s": "head-south",
            "e": "head-east",
            "w": "head-west",
            "start": "head-east"
        }
    }
}
import { Square } from "./Square.js";
import { Snake } from "./Snake.js";
import { Display } from "./Display.js";
export class Board {
  constructor(game, target = document, height = 15, width = 15) {
    game.highScores.push(0);
    this.height = height;
    this.width = width;
    this.game = game;
    this.element = document.createElement('div');
    this.element.setAttribute('id', "board");
    this.element.setAttribute('oncontextmenu', 'return false');
    this.paused = false;

    style.innerHTML = '.board {grid-template-columns: repeat(' + this.width.toString() + ', 40px); grid-template-rows: repeat(' + this.height.toString() + ', 40px);}';

    this.element.classList.add("board");

    this.overlay = document.createElement('div');
    this.overlay.setAttribute('id', "overlay");
    this.overlay.setAttribute('oncontextmenu', 'return false');

    style.innerHTML += '.overlay-element {position: absolute; width: 100%; height: 100%; pointer-events: none; grid-template-columns: repeat(' + this.width.toString() + ', 40px); grid-template-rows: repeat(' + this.height.toString() + ', 40px);}';

    this.overlay.classList.add("overlay-element");

    target.appendChild(this.element);
    this.element.appendChild(this.overlay);
    this.load();
  }

  load() {
    this.squares = [];
    for (var y = 0; y < this.height; y++) {
      var tempList = [];
      for (var x = 0; x < this.width; x++) {
        tempList.push(new Square(this.element, "(" + x + "," + y + ")", x, y, this))
        if ((x + y) % 2 == 0) {
          tempList[x].element.classList.add("every-other");
        }
      }
      this.squares.push(tempList);
    }
    this.display = new Display(this.element, this);
    this.snake = new Snake(4, this);
    this.update(this.snake.pieces);
    this.randomFood();
    const interval = setInterval(() => {
      if(!this.paused) this.snake.move();
      if (!this.game.playing) {
        clearInterval(interval);
      }
    }, 100);   
  }

  update(pieces) {
    for (var row of this.squares) {
      for (var square of row) {
        square.element.classList.remove("snake");
      }
    }
    for (var piece of pieces) {
      this.squares[piece[1]][piece[0]].element.classList.add("snake");
    }

    var numSquares = this.height * this.width;
    if (numSquares % 2 == 0 && this.snake.length == numSquares) {
      this.game.win();
    }
    else if (this.snake.length == numSquares - 1) {
      this.game.win();
    }
    this.display.update(this.snake.length-this.snake.startLength);
    this.game.highScores[this.game.highScores.length - 1] = this.snake.length-this.snake.startLength;
  }
  randomFood() {
    var x = Math.floor(Math.random() * this.width);
    var y = Math.floor(Math.random() * this.height);
    if (this.squares[y][x].element.classList.contains("snake")) {
      this.randomFood();
    } else {
      this.squares[y][x].element.classList.add("food");
    }
  }


}


var style = document.createElement('style');
style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(style);
import { Board } from "./Board.js";
import { Reset } from "./Reset.js";

export class Game {
    constructor(target = document) {
        this.playing = true;
        this.element = document.createElement('div');
        this.element.setAttribute('id', "game");
        this.element.classList.add("game");
        target.appendChild(this.element);
        this.highScores = [];
        this.board = new Board(this, this.element, 15, 16);
    }
    lose(){
        this.playing = false;
        this.resetScreen = new Reset(this.element, this, this.reset, true);
    }
    win(){
        this.playing = false;
        this.resetScreen = new Reset(this.element, this, this.reset, false);
    }
    reset(game){
        game.resetScreen = null;
        game.element.innerHTML = null;
        game.board = new Board(game, game.element, 15, 17);
        game.playing = true;
    }
}
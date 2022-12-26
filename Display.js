export class Display {
    constructor(target, board) {
        this.board = board;
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'display');
        this.element.classList.add('display');
        target.appendChild(this.element);
    }
    update(score) {
        this.element.innerHTML = "<p style=\"width: 50%; text-align: center;\" >Score: " + score.toString() + "</p><p style=\"width: 50%; text-align: center;\">High Score: " + this.board.game.highScores.reduce((a, b) => Math.max(a, b)).toString()+ "</p>";
    }
}
export class Square {
  constructor(target, name, x, y) {
    this.place = [x, y];
    this.element = document.createElement('div');
    this.element.setAttribute('id', name);
    this.element.classList.add("square");
    this.isTurn = false;

    target.appendChild(this.element);
  }
}
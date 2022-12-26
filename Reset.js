export class Reset {
    constructor(target, game, reset, loss) {
      this.element = document.createElement('div');
      this.element.setAttribute('id', 'game-over-screen');
      this.child = document.createElement('button');
      this.child.setAttribute('id', 'reset');
      this.child.addEventListener("click", function(){
        target.innerHTML = null;
        reset(game)
      });
      this.text = document.createElement('div')
      this.text.setAttribute('id', 'game-text');
      this.text.innerHTML = loss? "You Lose." : "You Win";
      target.appendChild(this.element);
      this.element.appendChild(this.child);
      this.element.appendChild(this.text);
      this.child.innerHTML = "Reset";
    }
  }
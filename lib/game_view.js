import $ from 'jquery';
class GameView {
  constructor(game, ctx) {

    this.ctx = ctx;
    this.game = game;
    this.playCell = this.game.addPlayCell();
  }

  animate(time) {
    requestAnimationFrame(this.animate.bind(this));
    const timeDelta = time - this.prev;
    if (timeDelta > 30) {
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.prev = time;

    }

  }

  start() {
    this.bindKeyHandlers();
    this.bindClickHandlers();
    this.prev = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  bindClickHandlers() {
    $('#canvas').click(() => {
    });
  }

  bindKeyHandlers() {
    const playCell = this.playCell;

    let pressed = [];
    $(document).on('keydown', e => {
      if (Object.keys(GameView.MOVES).includes(e.key) && !pressed.includes(e.key)) {
        pressed.push(e.key);

        let impulse = [0, 0];

        pressed.forEach (k => {
          if (k=="w") {
            impulse[1] = -1;
          }
          if (k=="s") {
            impulse[1] = 1;
          }
          if (k=="a") {
            impulse[0] = -1;
          }
          if (k=="d") {
            impulse[0] = 1;
          }
        });
        playCell.power(impulse);
      } else {
        if (e.key == "e") {
          this.game.players[0].bonus();
        }
      }
    });

    $(document).on('keyup', e => {
        let idx = pressed.indexOf(e.key);
        pressed.splice(idx, 1);

        let impulse = [0, 0];

        pressed.forEach (k => {
          if (k=="w") {
            impulse[1] = -1;
          }
          if (k=="s") {
            impulse[1] = 1;
          }
          if (k=="a") {
            impulse[0] = -1;
          }
          if (k=="d") {
            impulse[0] = 1;
          }
        });
        playCell.power(impulse);
    });
  }

}

GameView.MOVES = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

export default GameView;

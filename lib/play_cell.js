import Cell from './cell';
import Util from './util';
import $ from 'jquery';

class PlayCell extends Cell {
  constructor(options) {
    if (!options.radius) {
      options.radius = 15;
    }
    options.vel = [0, 0];
    options.pos = options.pos || [400, 400];
    super(options);
    this.maxL = 100/options.radius;
  }

  power(impulse) {
    let first = impulse[0]*Math.PI;
    let second = impulse[1]*Math.PI;
    this.vel = Util.scale([first, second], (5/this.radius));
  }

  move(timeDelta) {
    let scale = timeDelta / 30;
    let offsetX = this.vel[0] * scale;
    let offsetY = this.vel[1] * scale;
    let newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (!this.game.isOutOfBounds(newPos, this.radius)) {
      this.pos = newPos;
    } else {

      this.vel = [0,0];

    }

  }

  divide(ctx) {
    this.radius = this.radius/2;
    let pos = [(this.pos[0]- 2* this.radius), (this.pos[1] - 2 * this.radius)];
    let sibling = new PlayCell({radius: this.radius, pos: pos, color: "black", game: this.game});
    this.game.add(sibling);
  }

  magnetisma() {
    this.game.allObjects().forEach (o => {
      if (o.radius < this.radius) {
        o.mag = true;
      }
    });
  }

  spore() {
    let that = this;
    this.sporing = true;
    setTimeout(this.unspore.bind(that), 10000);
    $(".notifications li").text("Sporing! You are temporarily uneatable");
  }

  unspore() {
    this.sporing = false;
  }

  removeFlagellum () {
    this.game.canFlagellum = false;
  }

  attack() {
    this.game.canFlagellum = true;
    let that = this;
    setTimeout(this.removeFlagellum.bind(that), 1000);
  }

  bonus() {
    if (this.game.canMagnetisma) {
      this.magnetisma();
      this.game.canMagnetisma = false;
    } else if (this.game.canDivide) {
      this.divide();
      this.game.canDivide = false;
    } else if (this.game.canSpore) {
      this.spore();
    } else if (this.game.canFlagellum){
      this.attack();
    }
  }
}
export default PlayCell;

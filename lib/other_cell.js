import Util from './util';
import Cell from './cell';
import PlayCell from './play_cell';

class OtherCell extends Cell {
  constructor(options = {}) {
    options.pos = options.game.randomPosition();
    options.radius = options.game.randomRadius();
    options.vel = Util.velocity(options.radius);
    super(options);
  }

  move(timeDelta) {
    let vec;
    if (this.mag) {
      vec = Util.scale(Util.changeVec(this, this.game.players[0]), 5/this.radius);
    }
    else {
      if (this.nearest()) {
        vec = Util.scale(Util.changeVec(this, this.nearest()), 5/this.radius);
      } else {
        vec = [0, 0];//Util.velocity(this.radius);
      }
    }

    let scale = timeDelta / 30;
    let offsetX = vec[0] * scale;
    let offsetY = vec[1] * scale;

    let newPos;


    if (this.mag) {
      newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    } else {
      if (this.nearest()) {
        if (this.radius > this.nearest().radius) {
          newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        } else {
          newPos = [this.pos[0] - offsetX, this.pos[1] - offsetY];
        }
      } else {
        newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
      }
    }

    if (!this.game.isOutOfBounds(newPos, this.radius)) {
      this.pos = newPos;
    } else {
      if (!this.game.isOutOfBounds([newPos[0], this.pos[1]], this.radius)) {
        this.pos = [newPos[0], this.pos[1]];
      } else if (!this.game.isOutOfBounds([this.pos[0], newPos[1]], this.radius)) {
        this.pos = [this.pos[0], newPos[1]];
      } else {
        //vec = [0, 0];

      }

    }

  }


}

export default OtherCell;

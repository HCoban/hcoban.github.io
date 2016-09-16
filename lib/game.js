import Util from './util';
import OtherCell from './other_cell';
import PlayCell from './play_cell';
import Cell from './cell';
import $ from 'jquery';

class Game {
  constructor() {
    this.otherCells = [];
    this.players = [];
    this.score = 0;
    this.addOtherCells();
    this.increaseScore = this.increaseScore.bind(this);
    this.paused = true;

  }

  increaseScore() {
    if(!this.paused) {
      if (this.score > 40) {
        this.canFlagellum = true;
        $(".notifications li").text("Flagellum! Press e to attack");
      } else if (this.score > 30) {
        this.canSpore = true;
        $(".notifications li").text("Sporing! You are temporarily immortal");
      } else if (this.score > 20) {
        this.canDivide = true;
        $(".notifications li").text("Mitosis! Press e to divide and speed-up");
      } else if (this.score > 5) {
        this.canMagnetisma= true;
        $(".notifications li").text("Magnetisma! Press e to attrack smaller cells");
      }
    }
  }


  randomRadius() {
    let RADII = {
      medium: Math.floor(Math.random() * 10 + 10),
      small: Math.floor(Math.random() * 10)
    };
    let choice = Math.random * 100;
    if (choice < 80) {
      return RADII.small;
    } else {
      return RADII.medium;
    }
  }

  add(object) {
    if (object instanceof OtherCell) {
      this.otherCells.push(object);
    } else if (object instanceof PlayCell) {
      this.players.push(object);
    } else {
      //add exception
    }
  }

  addOtherCells () {
    for (var i = 0; i < Game.NUM_CELLS; i++) {
      this.add(new OtherCell ({ game: this}));
    }
  }

  addPlayCell () {
    const playCell = new PlayCell({
      game: this
    });

    this.add(playCell);

    return playCell;
  }

  allObjects() {
    let allObjects = [];
    return allObjects.concat(this.players, this.otherCells);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++) {
      for (var j = 0; j < allObjects.length; j++) {
        let obj1 = allObjects[i];
        let obj2 = allObjects[j];

        if (obj1.isCollideWith(obj2) && obj1!==obj2) {
          let collision = obj1.collideWith(obj2);
          return;
        }
      }
    }
  }

  draw(ctx) {
    {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.allObjects().forEach(object => {
        object.draw(ctx);
      });

    }

  }

  isOutOfBounds(pos, rad) {
    if (pos[0] - rad <0 || pos[0] + rad > Game.DIM_X) {
      return true;
    } else if (pos[1] - rad <0 || pos[1] + rad > Game.DIM_Y) {
      return true;
    } else {
      return false;
    }
  }

  moveObjects(delta) {
    if (!this.paused) {
      this.allObjects().forEach(object => {
        object.move(delta);
      });
    }
  }

  remove(object) {
    if (object instanceof OtherCell) {
      this.otherCells.splice(this.otherCells.indexOf(object), 1);
    } else if (object instanceof PlayCell) {
      this.players.splice(this.players.indexOf(object), 1);
    } else {
      throw "object type not recognised";
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  randomSide (width) {
    return Math.round(Math.random()) * width;
  }

  randomPosition() {
    let width = Game.DIM_X;
    let available = (width/2) - 50;
    let pos = [
      Math.abs(this.randomSide(width) - this.randomloc(available)),
      Math.abs(this.randomSide(width) - this.randomloc(available))
    ];
    return pos;
  }

  randomloc (available) {
    let loc =  Math.round(Math.random()*available);
    if (loc < 50) {
      loc = 50;
    }

    return loc;
  }

}

Game.BG_COLOR = "#d3d3d3";
Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_CELLS = 10;

export default Game;

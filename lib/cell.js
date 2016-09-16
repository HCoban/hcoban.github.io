import Util from './util';
import OtherCell from './other_cell';
import $ from 'jquery';

class Cell {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color || randomColor();

  }

  collideWith(otherObject) {
    let small;
    let large;
    if (this.radius < otherObject.radius) {
      small = this;
      large = otherObject;
    } else {
      small = otherObject;
      large = this;
    }

    if (large.constructor.name == "PlayCell") {
      this.game.score += Math.floor(small.radius);
      this.game.increaseScore();
      $(".score").text(this.game.score);
    }
    if (small.constructor.name == 'PlayCell') {
      if (!small.sporing) {
        small.remove();
        large.radius = Math.pow(Math.pow(large.radius, 3) + Math.pow(small.radius, 3), (1/3));
      }
    } else {
      small.remove();
      large.grow(small.radius);
    }

    if (this.game.players.length == 0) {
      this.gameOver();
      $("#modal").show();
    }
    return true;
  }

  moveInside() {
    let [x, y] = this.game.checkCoordinates(this.pos[0], this.pos[1], this.radius);
    while (x) {
      if (this.pos[0] - this.radius < 0) {
        this.pos[0] = this.radius;
      } else {
        this.pos[0] -= 1;
      }
      x = this.game.checkCoordinates(this.pos[0], this.pos[1], this.radius)[0];
    }

    while (y) {
      if (this.pos[1] - this.radius < 0) {
        this.pos[1] = this.radius;
      } else {
        this.pos[1] -= 1;
      }
      y = this.game.checkCoordinates(this.pos[0], this.pos[1], this.radius)[1];
    }
  }

  grow(r) {
    this.radius = Math.pow(Math.pow(this.radius, 3) + Math.pow(r, 3), (1/3));
    if (this.game.isOutOfBounds(this.pos, this.radius)) {
      this.moveInside();
    }
  }



  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();
    if (this.constructor.name === "PlayCell") {
      ctx.fillStyle = "RED";
      ctx.fillText("ME", this.pos[0]-6, this.pos[1]+3);
      if (this.game.canFlagellum) {
        let pos = this.game.randomPosition();
        ctx.lineTo(pos[0], pos[1]);
        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
    }

  }


  isCollideWith(otherObject) {
    if (this === otherObject) {
      return false;
    }
    const centerDistance = Util.distance(this.pos, otherObject.pos);
    if (centerDistance < (this.radius + otherObject.radius)) {
      return true;
    } else {
      return false;
    }
  }

  gameOver () {
    if (!this.game.paused) {
      this.game.paused = true;

      $(".modal-content p").hide();
      $(".modal-content").append($("<p>").text("Game Over"));
      $(".start").hide();
    }
    return true;
  }

  nearest () {
    let nearest;
    let min = 500;
    for (var i = 0; i < this.game.allObjects().length; i++) {
      if (this.game.allObjects()[i] !== this) {
        if (Util.distance(this.game.allObjects()[i].pos, this.pos) < min) {
          min = Util.distance(this.game.allObjects()[i].pos, this.pos);
          nearest = this.game.allObjects()[i];
        }
      }
    }
    return nearest;
  }

  move(timeDelta) {

  }

  remove() {
    this.game.remove(this);
  }
}

const randomColor = () => {
  const hex = "0123456789ABCDEF";

  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random()*16)];
  }

  return color;
};


export default Cell;

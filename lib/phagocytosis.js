import Game from './game';
import GameView from './game_view';
import Header from './header';
import Modal from './modal';

document.addEventListener("DOMContentLoaded", () => {

  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();

  const header = document.getElementById("header");
  new Header(header, game);

  const modal = document.getElementById("modal");
  new Modal(modal, game);
});

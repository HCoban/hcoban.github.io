import $ from 'jquery';

class Header {
  constructor(element, game) {
    this.$el = $(element);
    this.game = game;
    this.setupColumns();

    this.pause = this.pause.bind(this);
    // this.render();
  }

  setupColumns() {
    this.$el.empty();
    this.$el.addClass("group");

    let $scoreBoard = $("<ul>");
    $scoreBoard.addClass("scoreboard");
    let $name = $("<li>");
    $name.text("Score");
    $scoreBoard.append($name);
    let score = this.game.score;
    let $score = $("<li>");
    $score.addClass("score");
    $score.text(score);
    $scoreBoard.append($score);

    let $buttons = $("<ul>");
    $buttons.addClass("buttons");
    let $pause = $('<input id="pause" type="button" value="pause" />');
    $pause.click((e) => {
      e.preventDefault();
      this.pause();
    });
    $buttons.append($pause);

    let $notifications = $("<ul>");
    $notifications.addClass("notifications");
    let $not = $('<li>No special feature available</li>');
    $notifications.append($not);

    this.$el.append($scoreBoard);
    this.$el.append($notifications);
    this.$el.append($buttons);

  }

  pause() {
    let $button = $(document.getElementById("pause"));
    if (this.game.paused) {
      $button.prop('value', "pause");
      this.game.paused = false;
    } else {
      $button.prop('value', "resume");
      this.game.paused = true;
    }

  }

}

export default Header;

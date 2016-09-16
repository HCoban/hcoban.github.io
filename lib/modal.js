import $ from 'jquery';

class Modal {
  constructor(element, game) {
    this.$el = $(element);
    this.game = game;
    this.render();
    this.removeModal = this.removeModal.bind(this);
  }

  removeModal() {
    this.$el.hide();
    this.game.paused = false;
  }

  render() {
    let $content = $("<div>");
    $content.addClass("modal-content");
    $content.append($("<p>").text("Welcome to Phagocytosis"));
    $content.append($("<p>").text("You are controlling a cell in a mixed culture. You must eat other cells to grow in size and get points. Only a larger cell can eat a smaller cell. Get away from larger cells they will chase you!"
  ));
    $content.append($("<p>").text("Check your score on the upper left corner. The larger cells you eat, the more points you will get."));
    $content.append($("<p>").text("Your cell will gain special features depending on your score. First feature comes after 10 points. Check for special features on top center."));

    $content.append($("<p>").text("Controls are easy! WASD to move and E for special features."));

    this.$el.append($content);

    let $button = $('<input type="button" value="Click here to play"></input>');
    $button.addClass("start");
    $button.click(e => {
      e.preventDefault();
      this.removeModal();
    });

    this.$el.append($button);
  }

}

export default Modal;

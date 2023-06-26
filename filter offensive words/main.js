const main = () => {
  let offensiveWords = [];

  const loadOffensiveWords = async () => {
    try {
      const response = await fetch('offenses.txt');
      const data = await response.text();
      offensiveWords = data.split('\n').map(word => word.trim());
    } catch (error) {
      console.error('Erro ao carregar palavras ofensivas:', error);
    }
  };

  const hasOffensiveWords = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    return offensiveWords.some(word => lowerCaseMessage.includes(word.toLowerCase()));
  };

  $("form").submit((event) => {
    event.preventDefault();
    const $input = $(event.target).find("input");
    const message = $input.val();

    if (hasOffensiveWords(message)) {
      const $alert = $("<div>").addClass("alert");
      const $alertClose = $("<span>").addClass("alert-close").text("X");
      const $alertContent = $("<p>").addClass("alert-content").text("A mensagem contém palavras ofensivas. Por favor, revise sua mensagem.");
      $alert.append($alertClose).append($alertContent);

      $alert.appendTo("body");

      $alertClose.on("click", () => {
        $alert.remove();
      });

      setTimeout(() => {
        $alert.fadeOut(500, () => {
          $alert.remove();
        });
      }, 3000);
    } else {
      if (message !== "") {
        $("<li>").text(message).appendTo("#message");
        $input.val("");
        $("#message")[0].scrollIntoView(false);
      }
      return false;
    }
  });

  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} às ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  $(".time").html(datetime);

  loadOffensiveWords(); 
};

$(document).ready(() => {
  main();
});
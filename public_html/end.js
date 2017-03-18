var End = function (game) {
    var game = game; // why is this even here?
};

End.prototype = {
    create: function () {
        var endMessage = "You hit " + pantsusHit + " pantsus out of " + ROWS * COLUMNS + " pantsus" +
                "\n\nYou had " + bounceUpsRemaining + " bouncies remaining";

        var style = {font: "20px Droid Sans", fill: "#de7fff", align: "center"};
        var text = this.add.text(this.world.centerX, this.world.centerY, endMessage, style);
        text.anchor.setTo(0.5, 0.5);

        var playAgainText = this.add.text(this.world.centerX, this.world.centerY + (this.world.centerY / 2), "PLAY AGAIN?",
                {font: "bold 40px Droid Sans", fill: "#009e1a", align: "center"});
        playAgainText.anchor.setTo(0.5, 0.5);

        playAgainText.inputEnabled = true;

        restart = function () {
            this.state.start("Menu");
        };

        playAgainText.events.onInputDown.add(restart, this);
    }
};
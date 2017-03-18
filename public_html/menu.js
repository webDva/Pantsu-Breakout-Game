var Menu = function (game) {
    var game = game;
};

Menu.prototype = {
    create: function () {
        var instructions = "How to play:\n\nUse either the onscreen arrows or " +
                "your keyboard's cursor keys to move the platform.\n\nYou have a " +
                "limited number of bouncies.\n\nYou lose one bouncy " +
                "each time the ball touches the bottom of the screen.";

        var style = {font: "20px Droid Sans", fill: "#de7fff", align: "center"};
        // instructions near the top
        var text = this.add.text(this.world.centerX, this.world.centerY / 2, instructions, style);
        text.anchor.setTo(0.5, 0.5);
        
        // start button near the bottom
        var startText = this.add.text(this.world.centerX, this.world.centerY + (this.world.centerY / 2), "TAP TO PLAY",
        {font: "bold 40px Droid Sans", fill: "#009e1a", align: "center"});
        startText.anchor.setTo(0.5, 0.5);
        
        startText.inputEnabled = true;

        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        startFullScreen = function () {
            this.scale.startFullScreen();
            this.state.start("Game");
        };

        startText.events.onInputDown.add(startFullScreen, this);

    }
};
var Menu = function (game) {
    var game = game;
};

Menu.prototype = {
    create: function () {
        var instructions = "How to play:\n\nUse either the onscreen arrows or " +
                "your keyboard's cursor keys to move the platform.\n\nYou have a " +
                "limited tries to hit all the pantsu.";

        var style = {font: "18px Droid Sans", fill: "#cd3aff", align: "center"};
        // instructions near the top
        var text = this.add.text(this.world.centerX, this.world.centerY / 2, instructions, style);
        text.anchor.setTo(0.5, 0.5);
        
        // start button near the bottom
        var startText = this.add.text(this.world.centerX, this.world.centerY + (this.world.centerY / 2), "START",
        {font: "bold 24px Verdana", fill: "#009e1a", align: "center"});
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
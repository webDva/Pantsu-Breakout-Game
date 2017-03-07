var Menu = function (game) {
    var game = game;
};

Menu.prototype = {
    create: function () {
        var style = {font: "65px Arial", fill: "#ffffff", align: "center"};
        var text = this.add.text(this.world.centerX, this.world.centerY, "Start", style);
        text.anchor.setTo(0.5, 0.5);

        // mobile doesn't really go fullscreen, but at least a menu and game state were added
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        startFullScreen = function () {
            this.scale.startFullScreen();
            this.state.start("Game");
        };

        this.input.onDown.add(startFullScreen, this);

    }
};
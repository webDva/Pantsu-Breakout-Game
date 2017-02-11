var Game = function (game) {
    this.game = game;
};

Game.prototype = {
    preload: function () {
        this.load.image('logo', 'assets/phaser.png');
    },

    create: function () {
        var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }
};
var Game = function (game) {
    var game = game;
    
    // All game variables will be binded to the Game object.
    var logo; // Okay, okay... This is how we're going to do it!--Honestly, I don't get it!
};

Game.prototype = {
    preload: function () {
        this.load.image('logo', 'assets/phaser.png');
    },

    create: function () {
        this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo'); // i think 'var logo;' binded it to Game
        this.logo.anchor.setTo(0.5, 0.5);
    }
};
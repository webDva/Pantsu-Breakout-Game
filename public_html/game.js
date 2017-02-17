var Game = function (game) {
    var game = game;
    
    // All game variables will be binded to the Game object.
    var pantsu;
};

Game.prototype = {
    preload: function () {
        this.load.image('pantsu', 'assets/pantsu.png');
    },

    create: function () {
        this.pantsu = this.add.sprite(this.world.centerX, this.world.centerY, 'pantsu');
        this.pantsu.anchor.setTo(0.5, 0.5);
        
        this.pantsu.scale.setTo(0.3, 0.3);
    }
};
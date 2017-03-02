var Game = function (game) {
    var game = game;
    
    // All game variables will be binded to the Game object.
    var pantsu;
    var pantsuGroup;
    var ROWS, COLUMNS;
};

Game.prototype = {
    preload: function () {
        this.load.image('pantsu', 'assets/pantsu.png');
    },

    create: function () {
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.pantsuGroup = this.add.group();
        
        this.pantsuGroup.enableBody = true;
        
        /* Create 2D array of pantsu */
        for (i = 0; i < this.ROWS; ++i) {
            for (j = 0; j < this.COLUMNS; ++j) {
                
            }
        }
        
        this.pantsu = this.add.sprite(this.world.centerX, this.world.centerY, 'pantsu');
        this.pantsu.anchor.setTo(0.5, 0.5);
        
        this.pantsu.scale.setTo(0.3, 0.3);
    }
};
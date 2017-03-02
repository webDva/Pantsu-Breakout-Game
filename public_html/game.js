var Game = function (game) {
    var game = game;
    
    // All game variables will be binded to the Game object.
    var pantsuGroup;
    
    ROWS = 6;
    COLUMNS = 8;
    
    SCALE = 64; // May not be responsive-friendly doing it like this
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
        for (i = 0; i < COLUMNS; i++) {
            for (j = 0; j < ROWS; j++) {
                this.pantsuGroup.create(i * SCALE, j * SCALE, 'pantsu');
            }
        }
        
        this.pantsuGroup.setAll('width', SCALE);
        this.pantsuGroup.setAll('height', SCALE);
    }
};
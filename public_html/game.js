var Game = function (game) {
    var game = game;
    
    // All game variables will be binded to the Game object.
    var pantsuGroup;
    
    ROWS = 6;
    COLUMNS = 8;
    
    SCALE = 48; // May not be responsive-friendly doing it like this
    
    var ball;
    var platform;
    RATIO_SCALE = 0.15;
    
    var cursorKeys;
    PLATFORM_MOVEMENT_SPEED = 4;
};

Game.prototype = {
    preload: function () {
        this.load.image('pantsu', 'assets/pantsu.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('platform', 'assets/platform.png');
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
        
        ball = this.add.sprite(this.world.centerX, 400, 'ball');
        ball.anchor.setTo(0.5, 0.5);
        ball.scale.setTo(RATIO_SCALE - 0.07, RATIO_SCALE - 0.07); // ball has to be smaller than platform's scale
        this.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.collideWorldBounds = true;
        
        platform = this.add.sprite(this.world.centerX, 500, 'platform');
        platform.anchor.setTo(0.5, 0.5);
        platform.scale.setTo(RATIO_SCALE, RATIO_SCALE);
        this.physics.enable(platform, Phaser.Physics.ARCADE);
        platform.body.collideWorldBounds = true;
        platform.inputEnabled = true;
        
        cursorKeys = this.input.keyboard.createCursorKeys();
    },
    
    update: function() {
        if (cursorKeys.left.isDown) {
            platform.x -= PLATFORM_MOVEMENT_SPEED;
        }
        else if (cursorKeys.right.isDown) {
            platform.x += PLATFORM_MOVEMENT_SPEED;
        }
    }
};
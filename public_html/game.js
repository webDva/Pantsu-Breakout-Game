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
    PLATFORM_MOVEMENT_SPEED = 225;
    
    var arcadeReference;
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
        ball.body.velocity.setTo(0, 200);
        ball.body.bounce.set(1);

        platform = this.add.sprite(this.world.centerX, 500, 'platform');
        platform.anchor.setTo(0.5, 0.5);
        platform.scale.setTo(RATIO_SCALE, RATIO_SCALE);
        this.physics.enable(platform, Phaser.Physics.ARCADE);
        platform.body.collideWorldBounds = true;
        platform.inputEnabled = true;
        platform.body.immovable = true;

        cursorKeys = this.input.keyboard.createCursorKeys();

        arcadeReference = this.physics.arcade; // got to, because i don't know how to javascript that well enough
        collisionCallback = function () {
            var v = arcadeReference.velocityFromAngle(Math.floor(Math.random() * (135 - 45 + 1)) + 45);
            ball.body.velocity.setTo(v.x, -200);
        };
    },

    update: function () {
        this.physics.arcade.collide(ball, platform, collisionCallback);

        if (cursorKeys.left.isDown) {
            platform.body.velocity.setTo(-PLATFORM_MOVEMENT_SPEED, 0);
        } else if (cursorKeys.right.isDown) {
            platform.body.velocity.setTo(PLATFORM_MOVEMENT_SPEED, 0);
        }
    }
};
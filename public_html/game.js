var Game = function (game) {
    var game = game;

    // All game variables will be binded to the Game object.
    var pantsuGroup;

    ROWS = 5;
    COLUMNS = 14;

    SCALE = 32; // May not be responsive-friendly doing it like this

    var ball;
    var platform;
    RATIO_SCALE = 0.11;

    var cursorKeys;
    PLATFORM_MOVEMENT_SPEED = 300;

    var arcadeReference, pantsuReference; // need this for referencing game's variables inside local functions

    BALL_SPEED = 200;

    // buttons
    var arrowLeft, arrowRight;

    var bounceUpsRemaining;
    var pantsusHit;

    var style;
    var scoreText;
};

Game.prototype = {
    preload: function () {
        this.load.image('pantsu', 'assets/pantsu.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('arrowLeft', 'assets/arrowLeft.png');
        this.load.image('arrowRight', 'assets/arrowRight.png');

        this.load.audio('zap', 'assets/zap2.wav');
    },

    create: function () {
        zapSound = this.add.audio('zap');

        this.stage.backgroundColor = "#0e1228";

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

        // setting the location of the group
        this.pantsuGroup.centerX = this.world.centerX;
        if (window.innerWidth > 800) { // for desktop versions
            this.pantsuGroup.centerY = this.world.centerY;
        }

        platform = this.add.sprite(this.world.centerX, window.innerHeight, 'platform');
        platform.anchor.setTo(0.5, 0.5);
        platform.scale.setTo(RATIO_SCALE, RATIO_SCALE);
        this.physics.enable(platform, Phaser.Physics.ARCADE);
        platform.body.collideWorldBounds = true;
        platform.inputEnabled = true;
        platform.body.immovable = true;

        ball = this.add.sprite(platform.x, platform.y - platform.body.height, 'ball');
        ball.anchor.setTo(0.5, 0.5);
        ball.scale.setTo(RATIO_SCALE - 0.07, RATIO_SCALE - 0.07); // ball has to be smaller than platform's scale
        this.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.collideWorldBounds = true;
        ball.body.velocity.setTo(0, 200);
        ball.body.bounce.set(1);

        cursorKeys = this.input.keyboard.createCursorKeys();

        bounceUpsRemaining = 10;
        pantsusHit = 0;

        style = {font: "22px Arial", fill: "#d6082a"};
        scoreText = this.add.text(0, 0, "Bouncies left: " + bounceUpsRemaining + "\nPantsus hit: " + pantsusHit, style);

        arcadeReference = this.physics.arcade; // got to, because i don't know how to javascript that well enough
        ballPlatformCollision = function () {
            // Only using this callback if the ball would get stuck in a loop.
            // It doesn't get stuck now, since the ball's initial position is inbetween the pantsus and platform.
            var v = arcadeReference.velocityFromAngle(Math.floor(Math.random() * (160 - 20 + 1)) + 20);
            ball.body.velocity.setTo(v.x, -v.y + -BALL_SPEED); // 200 so ball can bounce back up
        };

        pantsuReference = this.pantsuGroup;
        hitPantsuCallback = function (ball, pantsu) {
            zapSound.play();

            pantsusHit += 1;
            scoreText.text = "Bouncies left: " + bounceUpsRemaining + "\nPantsus hit: " + pantsusHit;

            pantsuReference.remove(pantsu);
            ball.body.velocity.setTo(Math.floor(Math.random() * (BALL_SPEED - (BALL_SPEED - 40) + 1)) + (BALL_SPEED - 40));
        };

        processHandler = function (ball, pantsu) {
            return true;
        };

        leftArrowCallback = function () {
            platform.body.velocity.setTo(-PLATFORM_MOVEMENT_SPEED, 0);
        };

        rightArrowCallback = function () {
            platform.body.velocity.setTo(PLATFORM_MOVEMENT_SPEED, 0);
        };

        arrowLeft = this.add.button(0, this.world.centerY * 2 - 106, 'arrowLeft', leftArrowCallback);
        arrowRight = this.add.button(this.world.centerX * 2 - 106, this.world.centerY * 2 - 106, 'arrowRight', rightArrowCallback); // well! hard-coding the size works!

        ball.body.onWorldBounds = new Phaser.Signal();
        ball.body.onWorldBounds.add(function (sprite, up, down, left, right) {
            if (down) {
                bounceUpsRemaining -= 1;
                scoreText.text = "Bouncies left: " + bounceUpsRemaining + "\nPantsus hit: " + pantsusHit;
            }
        });
    },

    update: function () {
        this.physics.arcade.collide(ball, platform);
        this.physics.arcade.collide(ball, this.pantsuGroup, hitPantsuCallback, processHandler);

        if (cursorKeys.left.isDown) {
            platform.body.velocity.setTo(-PLATFORM_MOVEMENT_SPEED, 0);
        } else if (cursorKeys.right.isDown) {
            platform.body.velocity.setTo(PLATFORM_MOVEMENT_SPEED, 0);
        }
    }
};
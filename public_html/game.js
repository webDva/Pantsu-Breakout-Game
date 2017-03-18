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
        this.load.audio('loss', 'assets/perfectLoss.wav');
        this.load.audio('platformHit', 'assets/platformHit.wav');
    },

    create: function () {
        // lol, this is wrong
        zapSound = this.add.audio('zap');
        lossSound = this.add.audio('loss');
        platformHit = this.add.audio('platformHit');

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

        // give the player free pantsu instead of deducting bouncies from them
        ball = this.add.sprite(platform.x, platform.y - (platform.body.height + 200), 'ball');
        ball.anchor.setTo(0.5, 0.5);
        ball.scale.setTo(RATIO_SCALE - 0.07, RATIO_SCALE - 0.07); // ball has to be smaller than platform's scale
        this.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.collideWorldBounds = true;
        ball.body.velocity.setTo(50, 200);
        ball.body.bounce.set(1);

        cursorKeys = this.input.keyboard.createCursorKeys();

        bounceUpsRemaining = 10;
        pantsusHit = 0;

        style = {font: "22px Arial", fill: "#d6082a"};
        scoreText = this.add.text(0, 0, "Bouncies left: " + bounceUpsRemaining + "\nPantsus hit: " + pantsusHit, style);

        arcadeReference = this.physics.arcade; // got to, because i don't know how to javascript that well enough
        ballPlatformCollision = function () {
            platformHit.play();
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
                lossSound.play();
                bounceUpsRemaining -= 1;
                scoreText.text = "Bouncies left: " + bounceUpsRemaining + "\nPantsus hit: " + pantsusHit;
            }
        });
    },

    update: function () {
        if (pantsusHit === ROWS * COLUMNS || bounceUpsRemaining === 0) {
            this.state.start("End");
        }

        this.physics.arcade.collide(ball, platform, ballPlatformCollision);
        this.physics.arcade.collide(ball, this.pantsuGroup, hitPantsuCallback, processHandler);

        if (cursorKeys.left.isDown) {
            platform.body.velocity.setTo(-PLATFORM_MOVEMENT_SPEED, 0);
        } else if (cursorKeys.right.isDown) {
            platform.body.velocity.setTo(PLATFORM_MOVEMENT_SPEED, 0);
        }
    }
};
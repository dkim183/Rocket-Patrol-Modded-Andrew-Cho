class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('p1Fist', './assets/p1Fist.png');
        this.load.image('p2Fist', './assets/p2Fist.png');
        this.load.image('spaceship', './assets/headvoices.png');
        this.load.image('starfield', './assets/colorful.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/headexplode.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_back_music', './assets/backmusic.wav') //Copy-right Free Music: Fluffing a Duck by Kevin MacLeod
        this.load.audio('sfx_explosion1', './assets/heavyOuch.wav') // Voice made within https://15.ai
        this.load.audio('sfx_explosion2', './assets/ouch.wav')     //Home made with audacity
        this.load.audio('sfx_explosion3', './assets/whomadethisgame.wav')  //Home made with audacity
        this.load.audio('sfx_explosion4', './assets/breh.wav')    // Home made with audacity
        this.load.audio('sfx_explosion5', './assets/spyMad.wav') // Voice made within https://15.ai
        this.load.audio('sfx_explosion6', './assets/soldierDying.wav') // Voice made within https://15.ai
        this.load.audio('sfx_explosion7', './assets/reverb.wav') // Home made with audacity
        this.load.audio('sfx_explosion8', './assets/damn.wav') // Home made with audacity
    } 

    create() {

        // play Music to change the mood of the game

        this.playMusic = this.sound.add('sfx_back_music');

        this.playMusic.setLoop(true); // Loops the Music
        this.playMusic.play(); // play the music


        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // define keys
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);


        // // green UI background
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x007100).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xf88485).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xf88485).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xf88485).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xf88485).setOrigin(0 ,0);

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2+40, game.config.height - borderUISize - borderPadding, 'p1Fist', 0, keyLEFT, keyRIGHT, keyL).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2-40, game.config.height - borderUISize - borderPadding, 'p2Fist', 0, keyA, keyD, keyG).setOrigin(0.5, 0);

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);



        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display p1 score
        let score1Config = {
            fontFamily: 'Arial',
            fontSize: '30px',
            backgroundColor: '#61cfe8',
            color: '#141a15',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, score1Config);

        // display p2 score
        let score2Config = {
            fontFamily: 'Arial',
            fontSize: '30px',
            backgroundColor: '#61cfe8',
            color: '#141a15',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreRight = this.add.text((borderUISize + borderPadding)*11.7, borderUISize + borderPadding*2, this.p2Score, score2Config);        

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        score1Config.fixedWidth = 0;
        // score2Config.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', score1Config).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', score1Config).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.playMusic.stop(); // stops the music so it doesn't overlap!
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.playMusic.stop(); // stops the music
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 0.05;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.p2Rocket.update();             // update p2
             this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, true);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, true);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, true);

        }

        // check collisions p2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, false);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, false);          
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, false);     
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, isPlayer1) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        
        if (isPlayer1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }

        else {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }

        var array = ['sfx_explosion1', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4', 'sfx_explosion5', 'sfx_explosion6', 'sfx_explosion7', 'sfx_explosion8']
        //var randomfunction * how many there are
        let randomElement = array[Math.floor(Math.random() * array.length)];

        this.sound.play(randomElement);

        // code source: https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array

      }
}
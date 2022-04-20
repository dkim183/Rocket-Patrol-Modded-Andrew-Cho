class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('menuscreen', './assets/starfield.png'); // Home-made Original background
        this.load.audio('sfx_select', './assets/sorry.wav');  // Voice made within https://15.ai
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/p1Shoot.wav');  // Home made with audacity
        this.load.audio('sfx_menu_music', './assets/menu_music.wav') //Copy-right Free Music: Epic Cinematic Gaming Cyberpunk | RESET by Alex-Productions
    }

    create() {

        // place menu background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'menuscreen').setOrigin(0, 0);


        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '20px',
            backgroundColor: '#ff0000',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        

        // show menu text

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*4, 'The Most Extreme Multiplayer Experience!!?', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#03ffff';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 'P1: Use ←→ arrows to move & (L) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*4, 'P2: Use A + D to move & (G) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*5 + borderPadding*5, 'Press ← for Easy or → for HARD', menuConfig).setOrigin(0.5);

        // menu Music = stops the music once a left or right button is pressed.
        this.menuMusic = this.sound.add('sfx_menu_music');

        this.menuMusic.setLoop(true); // Loops the Music
        this.menuMusic.play(); // play the music

        //code source: https://stackoverflow.com/questions/34210393/looping-audio-in-phaser
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Player 1 Only Mode
          this.menuMusic.stop(); // stops the music
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000

          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Player 2 Only Mode
          this.menuMusic.stop(); // stops the music
          game.settings = {
            spaceshipSpeed: 5,
            gameTimer: 60000
 
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}
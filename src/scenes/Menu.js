class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_menu_music', './assets/menu_music.wav') //Copy-right Free Music: Epic Cinematic Gaming Cyberpunk | RESET by Alex-Productions
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Single or → for Co-Op', menuConfig).setOrigin(0.5);

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
            //multiplayer: false  // True if multiplayer
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Player 2 Only Mode
          this.menuMusic.stop(); // stops the music
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000
            //multiplayer: true // True if multiplayer   
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}
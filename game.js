var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {

           game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('platforms' , 'assets/platform2.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('trou', 'assets/trou.png');

}


var player;
var facing = 'right';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var ground;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.desiredFps = 30;
    game.physics.arcade.gravity.y = 250;

    // création du fond 
    this.background = this.game.add.sprite(0, 0, 'sky');

    // création du sol
    ground = this.game.add.tileSprite(0, 487, 800, 112, 'ground');
    ground.autoScroll(-200, 0);

    //création du trou
    this.trou = this.game.add.sprite(600, 487, 'trou');

    // création duperso /player
    player = game.add.sprite(32, 32, 'dude');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 144, 5, 16);
    player.body.gravity.y = 1000;    

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


}

function update() {

    game.physics.arcade.collide(player, ground);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -500;
        jumpTimer = game.time.now + 750;
    }

    
}

function render () {


}
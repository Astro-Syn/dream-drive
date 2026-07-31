import './App.css'
import { useEffect } from 'react';
import Phaser from 'phaser';


function App() {


 
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        render: {
          pixelArt: true,
          antialias: false,
        },
        physics: {
            default: 'arcade',
            arcade: {
              gravity: {
                x: 0,
                y: 700
              },
              debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        
    };

      useEffect(() => {
     const game = new Phaser.Game(config);

     return () => {
      game.destroy(true);
     }
  }, []);

  

    function preload (this: Phaser.Scene)
    {
      this.load.image('sky', '/Images/game-background.png');
      this.load.image('bg1', '/Images/dream-drive-bg1.png');
      this.load.image('bg2', '/Images/dream-drive-bg2.png');
      this.load.image('bg3', '/Images/dream-drive-bg3.png');
      this.load.image('ground', '/Images/game-sprite-platform.png');
       this.load.image('disc', '/Images/game-cd.png');
      this.load.image('virus', '/Images/game-virus.png');
      this.load.spritesheet('girl', '/Images/game-sprite-f.png', { frameWidth: 20, frameHeight: 27});
      this.load.image('asset1', '/Images/game-bg-asset1.png');
      this.load.image('asset2', '/Images/game-bg-asset2.png');
      this.load.image('cliff1', '/Images/dream-drive-platform1.png');
      this.load.image('sodamachine', '/Images/dream-drive-sodamachine-asset.png');
      this.load.image('platform2', '/Images/game-platform2.png');
      this.load.image('vines-grass', '/Images/dream-drive-grass-vines.png');
      this.load.image('cliff-bottom', '/Images/dream-drive-cliff-bottom.png');
      this.load.image('palm-tree', '/Images/dream-drive-palm-tree.png');
      this.load.image('bush', '/Images/dream-drive-bush.png');
      this.load.image('plant', '/Images/dream-drive-plant1.png');
      this.load.image('cliff-grass', '/Images/cliff-grass.png');
      this.load.image('cliff-green-top', '/Images/cliff-green-top.png');
      this.load.image('cliff2', '/Images/cliff1.png');
      this.load.spritesheet('waterfall-sprite', '/Images/waterfall-sprite.png', { frameWidth: 55, frameHeight: 190});
      
    }

let platforms: any;
let viruses: any;
let player!: any;
let cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
let discs!: any;
let score = 0;
let scoreText!: any;
let gameOver = false;
let gameResetText!: any;
let restartKey!: Phaser.Input.Keyboard.Key;

function create(this: Phaser.Scene)
{

  this.physics.world.setBounds(0, 0, 800, 16000);

  score = 0;
  gameOver = false;


  this.add.image(400, 300, 'sky');
this.add.image(400, 900, 'sky');
this.add.image(400, 1500, 'sky');
this.add.image(400, 2100, 'sky');
this.add.image(400, 2700, 'sky');
this.add.image(400, 3300, 'sky');
this.add.image(400, 3900, 'sky');
this.add.image(400, 4500, 'sky');
this.add.image(400, 5100, 'sky');
this.add.image(400, 5700, 'sky');
this.add.image(400, 6300, 'sky');
this.add.image(400, 6900, 'sky');
this.add.image(400, 7500, 'sky');
this.add.image(400, 8100, 'sky');
this.add.image(400, 8700, 'sky');
this.add.image(400, 9300, 'sky');
this.add.image(400, 9900, 'sky');
this.add.image(400, 10500, 'sky');
this.add.image(400, 11100, 'sky');
this.add.image(400, 11700, 'sky');
this.add.image(400, 12300, 'sky');
this.add.image(400, 12900, 'sky');
this.add.image(400, 13500, 'sky');
this.add.image(400, 13900, 'bg3');
this.add.image(400, 14700, 'bg2');
this.add.image(400, 15500, 'bg1');
  this.add.image(600, 380, 'asset1').setScale(4);
  this.add.image(100, 435, 'asset2').setScale(2);


  platforms = this.physics.add.staticGroup();
   

  this.add.image(600, 15544, 'cliff-bottom').setScale(2);

  const cliff = platforms.create(20, 15550, 'cliff1').setScale(2).refreshBody();

  cliff.body.setSize(478, 30);
  cliff.body.setOffset(0, 0);
 
  
 this.add.image(680, 15650, 'palm-tree').setScale(2);
platforms.create(400, 15950, 'ground').setScale(6).refreshBody();
platforms.create(420, 15750, 'ground').setScale(2).refreshBody();
platforms.create(420, 15600, 'platform2').setScale(2).refreshBody();
platforms.create(300, 15360, 'platform2').setScale(2).refreshBody();
 this.add.image(50, 15797, 'sodamachine').setScale(2);


const cliff2 = platforms.create(600, 15300, 'cliff1').setScale(2).refreshBody().setFlipX(true); 

cliff2.body.setSize(478, 30);
cliff2.body.setOffset(0, 0);

const cliff3 = platforms.create(80, 15000, 'cliff1').setScale(2).refreshBody()
cliff3.body.setSize(478, 30);
cliff3.body.setOffset(0, 0);


this.add.image(330, 14835, 'palm-tree').setFlipX(true);

platforms.create(300, 15080, 'platform2').setScale(2).refreshBody();
platforms.create(385, 15080, 'platform2').setScale(2)
platforms.create(625, 14865, 'ground').setScale(2).refreshBody();
platforms.create(650, 14865, 'ground').setScale(2).refreshBody();
this.add.image(655, 14755, 'asset1').setScale(2);
platforms.create(380, 14710, 'platform2').setScale(2).refreshBody();
platforms.create(60, 14700, 'ground').setScale(2).refreshBody();

this.add.image(80, 14685, 'plant').setScale(2);
this.add.image(650, 14390, 'cliff2').setScale(2);
platforms.create(650, 14250, 'cliff-green-top').setScale(2).refreshBody();

//player sprite goes here 
player = this.physics.add.sprite(250, 15800, 'girl').setScale(3);

  player.body.setSize(14, 18);
  player.body.setOffset(2, 3);

  player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.add.image(650, 14200, 'cliff-grass').setScale(2);
  this.add.image(30, 14695, 'plant').setScale(2);
   this.add.image(20, 15562, 'vines-grass').setScale(2);
   this.add.image(600, 15310, 'vines-grass').setScale(2).setFlipX(true);

   platforms.create(25, 15250, 'ground').setScale(2).refreshBody();
  platforms.create(650, 15150, 'ground').setScale(2).refreshBody();
     this.add.image(73, 15017, 'vines-grass').setScale(2);
this.add.image(50, 14900, 'palm-tree').setScale(2).setFlipX(true);
this.add.image(740, 15820, 'bush').setScale(4);
this.add.image(685, 15820, 'bush').setScale(2);
this.add.image(705, 15830, 'bush').setScale(3);
this.add.image(665, 15820, 'bush').setScale(2);
this.add.image(720, 15825, 'bush').setScale(3);
platforms.create(350, 14570, 'platform2').setScale(2).refreshBody();
platforms.create(650, 14595, 'ground').setScale(2).refreshBody();



  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'girl', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('girl', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
this.cameras.main.startFollow(player, true, 0.08, 0.08);
  this.cameras.main.setBounds(0, 0, 800, 16000);


  const keyboard = this.input.keyboard;

  if (!keyboard) {
    throw new Error("Keyboard plugin is not available.");
  }

  cursors = keyboard.createCursorKeys();
  restartKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

  discs = this.physics.add.group({
    key: 'disc',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  discs.children.iterate((child: any) => {
    if (!child) return;

    child.setScale(2);
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    child.postFX.addShine(
      1,
      0.5,
      3,
      false
    )
  });

  viruses = this.physics.add.group();

  for (let i = 0; i < 1; i++) {
    const virus = viruses.create(
      Phaser.Math.Between(50, 750),
      Phaser.Math.Between(0, 200),
      'virus'
    );

    virus.setScale(1.5);
    virus.setBounce(0.2);
    virus.setCollideWorldBounds(true);
    virus.setVelocity(
      Phaser.Math.Between(-150, 150),
      Phaser.Math.Between(-40, 40)
    );
  }

  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    color: '#FFF'
  });

 gameResetText = this.add.text(
    400,
    300,
    "GAME OVER\n\nPress R to Restart",
    {
        fontSize: "42px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10
        },
        align: "center"
    }
);

  gameResetText.setOrigin(0.5);
  gameResetText.setVisible(false);

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(discs, platforms);
  this.physics.add.collider(viruses, platforms);
  this.physics.add.collider(viruses, viruses);

  this.physics.add.overlap(player, discs, collectDisc, undefined, this);
  this.physics.add.overlap(player, viruses, hitVirus, undefined, this);
}

function update(this: Phaser.Scene)
{
  if (gameOver) {
    if (Phaser.Input.Keyboard.JustDown(restartKey)){
      this.scene.restart();
    }
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-475);
  }
}

function collectDisc(player: any, disc: any)
{
  disc.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);
}

function hitVirus(player: any, virus: any)
{
  player.scene.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');

  gameResetText.setVisible(true)
  gameOver = true;
  


}


return (
    <div id='game'>

    </div>
  )
}
export default App

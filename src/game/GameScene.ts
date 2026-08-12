import Phaser from "phaser";
import { preloadAssets } from "./preloadAssets";
import { createNPC1, updateNPC1 } from "./npcs/npc1";
import { createBackgrounds } from "./backgrounds";
import { createPlatforms } from "./platforms";




const WATERFALL_Y = 14387;
const WORLD_WIDTH = 5000;

export default class GameScene extends Phaser.Scene {

    // =========================
    // GAME OBJECTS / VARIABLES
    // =========================

    ladders!: Phaser.Physics.Arcade.StaticGroup;
    platforms!: Phaser.Physics.Arcade.StaticGroup;
    viruses!: Phaser.Physics.Arcade.Group;
    discs!: Phaser.Physics.Arcade.Group;
    player!: Phaser.Physics.Arcade.Sprite;

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    restartKey!: Phaser.Input.Keyboard.Key;

    npc1!: Phaser.Physics.Arcade.Sprite;

    score = 0;
    scoreText!: Phaser.GameObjects.Text;

    gameOver = false;
    gameResetText!: Phaser.GameObjects.Text;

    onLadder = false;


   
    // CONSTRUCTOR
    // 

    constructor() {
        super("GameScene");
    }

    // PRELOAD
    

    preload() {
        preloadAssets(this);
       
    }


    // CREATE area

    create() {

        this.physics.world.setBounds(
            0,
            0,
            WORLD_WIDTH,
            16000
        );

        this.score = 0;
        this.gameOver = false;


        // BACKGROUNDS
        
        createBackgrounds(this);
       
        // LADDERS

        this.ladders = this.physics.add.staticGroup();

        // NEFI VILLAGE ANIMATIONS
        // =========================

        this.anims.create({
            key: "lg-sign",
            frames: this.anims.generateFrameNumbers(
                "nefi-village-large-sign-sprite",
                {
                    start: 0,
                    end: 29
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "flash-sign2",
            frames: this.anims.generateFrameNumbers(
                "nefi-village-screen2",
                {
                    start: 0,
                    end: 14
                }
            ),
            frameRate: 8,
            repeat: -1
        });


    
        //Behind the bridge

          this.add.image(2800, 14300, "nefi-bg-tree").setScale(2);

           this.add.image(3200, 14900, "nefi-bg-tree").setScale(2);

           this.add.image(2000, 14700, "nefi-bg-tree").setScale(1.5);

           this.add.image(2500, 14200, "nefi-bg-tree").setScale(2);
        
           this.add.image(1800, 14100, "nefi-bg-tree").setScale(2);

           this.add.image(1900, 14200, "nefi-bg-tree").setScale(3);

           this.add.image(3100, 14800, "nefi-bg-tree").setScale(1.5);

           this.add.image(3000, 14600, "nefi-bg-tree").setScale(3);

            this.add.image(3050, 14900, "nefi-bg-tree").setScale(1.4);

            this.add.image(1600, 14300, "nefi-bg-tree").setScale(2);

            this.add.image(2300, 14450, "nefi-bg-tree").setScale(1.3);

               this.add
            .image(1050, 14150, "diving-tree")
            .setScale(3);
        // BRIDGE
      
          createPlatforms(this);

        // =========================
        // NEFI VILLAGE
        // =========================

        this.add
            .image(3730, 14410, "nefi-walls")
            .setScale(2);


        this.add
            .image(3780, 14150, "wall-pipes")
            .setScale(2);

        const nefiSignLg = this.add.sprite(
            3730,
            13810,
            "nefi-village-large-sign-sprite"
        );

        nefiSignLg
            .setScale(2)
            .play("lg-sign");

        
        // NEON LIGHTING
       

        const topGlow = this.add.rectangle(
            3700,
            13960,
            600,
            200,
            0xff00ff,
            0.18
        ).setOrigin(0.5, 0);

        this.tweens.add({
            targets: topGlow,
            alpha: 0.25,
            duration: 2500,
            yoyo: true,
            repeat: -1
        });

        const bottomGlow = this.add.rectangle(
            3750,
            14430,
            600,
            250,
            0xff33cc,
            0.15
        ).setOrigin(0.5, 1);

        this.tweens.add({
            targets: bottomGlow,
            alpha: 0.25,
            duration: 2500,
            yoyo: true,
            repeat: -1
        });


        // =========================
        // NEFI VILLAGE DECORATIONS
        // =========================

        this.add
            .image(3730, 13900, "pipe")
            .setScale(2);

        this.add
            .image(3450, 14080, "house1")
            .setScale(2)
            .setTint(0x00ff88);

        this.add
            .image(3900, 14080, "house2")
            .setScale(2);

        const nefiSign2 = this.add.sprite(
            3690,
            14130,
            "nefi-village-screen2"
        );

        nefiSign2
            .setScale(2)
            .play("flash-sign2");

        this.add
            .image(3160, 13520, "palm-tree")
            .setScale(1.5);

        this.add
        .image(3940, 13730, 
            'nefi-vine1'
        ).setScale(2);

        this.add
        .image(3300, 13730,
            'nefi-vine2'
        ).setScale(2);

        this.add.image(3330, 13728,
            'nefi-vine2'
        ).setScale(1.9);

        this.add.image(3260, 13650, 
            'nefi-mailbox'
        ).setScale(2);


       
        // =========================
        // LADDER
        // =========================

        this.ladders
            .create(4070, 13935, "nefi-ladder")
            .setScale(2)
            .refreshBody();

            this.ladders.create(3970, 13530, 
                "nefi-ladder2"
            ).setScale(2).refreshBody();

       
        // PLAYER

        this.player = this.physics.add
            .sprite(3500, 13650, "girl")
            .setScale(3).refreshBody();

        this.player.body.setSize(12, 14);
        this.player.body.setOffset(2, 2);

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

         
       this.npc1 = createNPC1(this);
        
        // MORE DECORATIONS
     
        this.add
            .image(650, 14182, "cliff-grass")
            .setScale(2);

        this.add
            .image(30, 14680, "plant")
            .setScale(2);

        this.add
            .image(20, 15562, "vines-grass")
            .setScale(2);

        this.add
            .image(600, 15310, "vines-grass")
            .setScale(2)
            .setFlipX(true);

        this.add
            .image(73, 15017, "vines-grass")
            .setScale(2);

        this.add
            .image(50, 14900, "palm-tree")
            .setScale(2)
            .setFlipX(true);

        this.add
            .image(740, 15820, "bush")
            .setScale(4);

        this.add
            .image(685, 15820, "bush")
            .setScale(2);

        this.add
            .image(705, 15830, "bush")
            .setScale(3);

        this.add
            .image(665, 15820, "bush")
            .setScale(2);

        this.add
            .image(720, 15825, "bush")
            .setScale(3);

      
        this.add
            .image(800, 14190, "plant")
            .setScale(2);


        // WATERFALL ANIMATION

        this.anims.create({
            key: "waterfall",
            frames: this.anims.generateFrameNumbers(
                "waterfall-sprite",
                {
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        const waterfall2 = this.add.sprite(
            600,
            14020,
            "waterfall-sprite"
        );

        waterfall2
            .setScale(2)
            .play("waterfall");

        const waterfall = this.add.sprite(
            550,
            14387,
            "waterfall-sprite"
        );

        waterfall
            .setScale(2)
            .play("waterfall");

        this.add
            .image(560, 14550, "plant")
            .setScale(2);


     
        // PLAYER ANIMATIONS
        // =========================
        //girl Main character


        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers(
                "girl",
                {
                    start: 0,
                    end: 3
                }
            ),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "turn",
            frames: [
                {
                    key: "girl",
                    frame: 4
                }
            ],
            frameRate: 20
        });

        
        this.anims.create({
            key: "back",
            frames: [
                {
                    key: "girl",
                    frame: 5
                }
            ],
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers(
                "girl",
                {
                    start: 6,
                    end: 9
                }
            ),
            frameRate: 10,
            repeat: -1
        });

   
      


        // =========================
        // CAMERA
        // =========================

        this.cameras.main.setBounds(
            0,
            0,
            WORLD_WIDTH,
            16000
        );


        // =========================
        // KEYBOARD
        // =========================

        const keyboard = this.input.keyboard;

        if (!keyboard) {
            throw new Error(
                "Keyboard plugin is not available."
            );
        }

        this.cursors = keyboard.createCursorKeys();

        this.restartKey = keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.R
        );


        // =========================
        // DISCS
        // =========================

        this.discs = this.physics.add.group({
            key: "disc",
            repeat: 11,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70
            }
        });

        this.discs.children.iterate((child) => {

            if (!child) return;

            const disc = child as Phaser.Physics.Arcade.Sprite;

            disc.setScale(2);

            disc.setBounceY(
                Phaser.Math.FloatBetween(0.4, 0.8)
            );

            disc.postFX.addShine(
                1,
                0.5,
                3,
                false
            );
        });


        // =========================
        // VIRUS ENEMIES
        // =========================

        this.viruses = this.physics.add.group();

        for (let i = 0; i < 1; i++) {

            const virus = this.viruses.create(
                Phaser.Math.Between(50, 750),
                Phaser.Math.Between(0, 200),
                "virus"
            );

            virus.setScale(1.5);

            virus.setBounce(0.2);

            virus.setCollideWorldBounds(true);

            virus.setVelocity(
                Phaser.Math.Between(-150, 150),
                Phaser.Math.Between(-40, 40)
            );
        }

        // =========================
        // SCORE
        // =========================

        this.scoreText = this.add.text(
            16,
            16,
            "Score: 0",
            {
                fontSize: "32px",
                color: "#FFF"
            }
        );

        this.scoreText.setScrollFactor(0);


        // =========================
        // GAME OVER TEXT
        // =========================

        this.gameResetText = this.add.text(
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

        this.gameResetText.setOrigin(0.5);

        this.gameResetText.setVisible(false);

        this.gameResetText.setScrollFactor(0);


        // =========================
        // COLLIDERS
        // =========================

        this.physics.add.collider(
            this.player,
            this.platforms
        );

        this.physics.add.collider(
            this.discs,
            this.platforms
        );

        this.physics.add.collider(
            this.viruses,
            this.platforms
        );

        this.physics.add.collider(
            this.viruses,
            this.viruses
        );

        this.physics.add.collider(
            this.npc1,
            this.platforms
        )


        // =========================
        // OVERLAPS
        // =========================

        this.physics.add.overlap(
            this.player,
            this.discs,
            this.collectDisc,
            undefined,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.viruses,
            this.hitVirus,
            undefined,
            this
        );
    }


    // =========================
    // UPDATE
    // =========================

    update() {
 // =========================
// OLD MAN NPC MOVEMENT
// =========================
 updateNPC1(this.npc1);



        // =========================
        // LADDER DETECTION
        // =========================

        this.onLadder = false;

        this.physics.overlap(
            this.player,
            this.ladders,
            () => {
                this.onLadder = true;
            }
        );


           // =========================
        // CAMERA
        // =========================

        const cam = this.cameras.main;


        cam.scrollY = Phaser.Math.Linear(
            cam.scrollY,
            this.player.y - cam.height / 2,
            0.08
        );

// =========================
// LADDER MOVEMENT
// =========================

if (this.onLadder) {

    this.player.body.allowGravity = false;

    this.player.setVelocityX(0);

    this.player.anims.play("back", true);


    // =========================
    // JUMP OFF LADDER
    // =========================

    if (this.cursors.left.isDown) {

        this.onLadder = false;

        this.player.body.allowGravity = true;

        this.player.setVelocityX(-160);
        this.player.setVelocityY(-100);

        this.player.anims.play("left", true);

        return;
    }

    if (this.cursors.right.isDown) {

        this.onLadder = false;

        this.player.body.allowGravity = true;

        this.player.setVelocityX(160);
        this.player.setVelocityY(-100);

        this.player.anims.play("right", true);

        return;
    }


    // =========================
    // CLIMB UP / DOWN
    // =========================

    if (this.cursors.up.isDown) {

        this.player.setVelocityY(-140);

    }
    else if (this.cursors.down.isDown) {

        this.player.setVelocityY(140);

    }
    else {

        this.player.setVelocityY(0);
    }

    return;

}
else {

    this.player.body.allowGravity = true;
}

        // =========================
        // GAME OVER
        // =========================

        if (this.gameOver) {

            if (
                Phaser.Input.Keyboard.JustDown(
                    this.restartKey
                )
            ) {

                this.scene.restart();
            }

            return;
        }


        // =========================
        // LEFT / RIGHT MOVEMENT
        // =========================

        if (this.cursors.left.isDown) {

            this.player.setVelocityX(-160);

            this.player.anims.play(
                "left",
                true
            );
        }

        else if (this.cursors.right.isDown) {

            this.player.setVelocityX(160);

            this.player.anims.play(
                "right",
                true
            );
        }

        else {

            this.player.setVelocityX(0);

            this.player.anims.play(
                "turn"
            );
        }


        // =========================
        // JUMP
        // =========================

        // !this.onLadder prevents the normal
        // jump from triggering while climbing.

        if (
            this.cursors.up.isDown &&
            this.player.body.touching.down &&
            !this.onLadder
        ) {

            this.player.setVelocityY(-475);
        }



        if (this.player.y > WATERFALL_Y) {

            // Below waterfall:
            // Keep camera centered on original
            // 800px-wide corridor.

            cam.scrollX = Phaser.Math.Linear(
                cam.scrollX,
                400 - cam.width / 2,
                0.08
            );

        }
        else {

            // Past waterfall:
            // Follow player horizontally.

            cam.scrollX = Phaser.Math.Linear(
                cam.scrollX,
                this.player.x - cam.width / 2,
                0.08
            );
        }
    }


    // =========================
    // COLLECT DISC
    // =========================

    collectDisc(
        player: Phaser.Physics.Arcade.Sprite,
        disc: Phaser.Physics.Arcade.Sprite
    ) {

        disc.disableBody(true, true);

        this.score += 10;

        this.scoreText.setText(
            "Score: " + this.score
        );
    }


    // =========================
    // HIT VIRUS
    // =========================

    hitVirus(
        player: Phaser.Physics.Arcade.Sprite,
        virus: Phaser.Physics.Arcade.Sprite
    ) {

        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play("turn");

        this.gameResetText.setVisible(true);

        this.gameOver = true;
    }
}
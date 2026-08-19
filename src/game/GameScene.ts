import Phaser from "phaser";
import { preloadAssets } from "./preloadAssets";
import { createNPC1, updateNPC1 } from "./npcs/npc1";
import { createNPC2, updateNPC2 } from "./npcs/npc2";
import { createBackgrounds } from "./backgrounds";
import { createPlatforms } from "./platforms";
import { createBehindBridgeTrees } from "./behindBridgeTrees";
import { createDecorations } from "./decorations";
import { createWaterFallAnimation } from "./animations/waterfallAnimation";
import { createNefiSignAnimations } from "./animations/nefiSignAnimations";
import { createNefiShopkeeper, updateNefiShopkeeper } from "./npcs/nefi-shopkeeper";
import { createViruses } from "../enemies/viruses";
import { createDiscs } from "../collectibles/discs";



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
    npc2!: Phaser.Physics.Arcade.Sprite;
    shopKeeper!: Phaser.GameObjects.Sprite;

    score = 0;
    scoreText!: Phaser.GameObjects.Text;

    gameOver = false;
    gameResetText!: Phaser.GameObjects.Text;
    positionKey!: Phaser.Input.Keyboard.Key;

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
        createNefiSignAnimations(this);


    
        //Behind the bridge trees go here below
        createBehindBridgeTrees(this);
         
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


        this.add.image(3790, 13280, "cyber-farm-house").setScale(2);


        const storeSign = this.add.sprite(3790, 13295, 
            "store-sprite"
        );

        storeSign.setScale(2.2).play("store-sprite");

        const storeSign2 = this.add.sprite(3645, 13300, 
            "store-sprite2"
        );

        storeSign2.setScale(2).play("store-sprite2");
        
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
            .image(3160, 13510, "palm-tree")
            .setScale(1.5);

        this.add
        .image(3910, 13730, 
            'nefi-vine1'
        ).setScale(2);

        this.add
        .image(3270, 13735,
            'nefi-vine2'
        ).setScale(2);

        this.add.image(3230, 13728,
            'nefi-vine2'
        ).setScale(1.9);

        this.add.image(3360, 13650, 
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
            .sprite(100, 15550, "girl")
            .setScale(3).refreshBody();

            console.log(
    `Player X: ${Math.round(this.player.x)}, Y: ${Math.round(this.player.y)}`
);

        this.player.body.setSize(12, 14);
        this.player.body.setOffset(2, 2);

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

         
       this.npc1 = createNPC1(this);

       this.npc2 = createNPC2(this)
        
       this.shopKeeper = createNefiShopkeeper(this);
        // MORE DECORATIONS go right here
     createDecorations(this)

        // WATERFALL ANIMATION

       createWaterFallAnimation(this);
     
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

        this.positionKey = keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.P
);


        // =========================
        // DISCS
        // =========================
        createDiscs(this);

        // =========================
        // VIRUS ENEMIES
        // ========================
        
        createViruses(this)

        
        // SCORE
       

        this.scoreText = this.add.text(
            16,
            16,
            "Drive Score: 0",
            {
                 fontFamily: "monospace",
        fontSize: "26px",
        color: "#00FF9F",          
        stroke: "#BD00FF",         
        strokeThickness: 3
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

        this.physics.add.collider(
            this.npc2,
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
//NPC MOVEMENT
// =========================
 updateNPC1(this.npc1);
 updateNPC2(this.npc2);
 updateNefiShopkeeper(this.shopKeeper);


 if (
    Phaser.Input.Keyboard.JustDown(
        this.positionKey
    )
) {
    console.log(
        `Player X: ${Math.round(this.player.x)}, Y: ${Math.round(this.player.y)}`
    );
}


// =========================
// LADDER DETECTION
// =========================

let touchingLadder = false;

this.physics.overlap(
    this.player,
    this.ladders,
    () => {
        touchingLadder = true;
    }
);

if (
    touchingLadder &&
    (this.cursors.up.isDown || this.cursors.down.isDown) &&
    !this.onLadder
) {
    this.onLadder = true;
}

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
            "Drive Score: " + this.score
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
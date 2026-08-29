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
import { createViruses } from "../enemies/viruses";
import { createDiscs } from "../collectibles/discs";
import { createNefiDecos } from "./decorations/nefiDecos";
import { createAlienNpc, updateAlienNpc } from "./npcs/alienNpc";
import { createAlienNpc2, updateAlienNpc2 } from "./npcs/alienNpc2";
import { showAreaName } from "./area_names/showAreaName";
import {
    createNefiShopkeeper,
    updateNefiShopkeeper
} from "./npcs/nefi-shopkeeper";

import {
    createShopkeeperDialogue
} from "./npcs/dialogue/shopkeeperDialogue";

const WATERFALL_Y = 14387;
const WORLD_WIDTH = 5000;

export default class GameScene extends Phaser.Scene {

    // GAME OBJECTS / VARIABLES
   
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
    shopkeeperDialogue!: ReturnType<typeof createShopkeeperDialogue>;
    alienNpc!: Phaser.Physics.Arcade.Sprite;
    alienNpc2!: Phaser.Physics.Arcade.Sprite;
    score = 0;
    scoreText!: Phaser.GameObjects.Text;
    gameOver = false;
    gameResetText!: Phaser.GameObjects.Text;
    positionKey!: Phaser.Input.Keyboard.Key;
    onLadder = false;
    private nefiVillageShown = false;
    interactionKey!: Phaser.Input.Keyboard.Key;
   

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
            this.add
        .image(480, 14168,
            "nefi-village-arrow"
        ).setScale(2);
          
         
        // BRIDGE
      
          createPlatforms(this);

       
        // NEFI VILLAGE
    createNefiDecos(this);
        // LADDER
        
        this.ladders
            .create(4065, 13935, "nefi-ladder")
            .setScale(2)
            .refreshBody();

            this.ladders.create(3970, 13530, 
                "nefi-ladder2"
            ).setScale(2).refreshBody();

       
        // PLAYER
        this.player = this.physics.add
            .sprite(313, 13532, "girl")
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

       
this.shopkeeperDialogue = createShopkeeperDialogue(
    this,
    this.shopKeeper
);


       this.alienNpc = createAlienNpc(this);

       this.alienNpc2 = createAlienNpc2(this);


        // MORE DECORATIONS go right here
     createDecorations(this)

        // WATERFALL ANIMATION

       createWaterFallAnimation(this);
     
        // PLAYER ANIMATIONS
    
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

        //CLIMBING ANIMATIONS

        this.anims.create({
    key: "ladder-climb-animation",
    frames: this.anims.generateFrameNumbers(
        "ladder-climb-animation",
        {
            start: 0,
            end: 2
        }
    ),
    frameRate: 8,
    repeat: -1
});

        // CAMERA
        

        this.cameras.main.setBounds(
            0,
            0,
            WORLD_WIDTH,
            16000
        );


        // KEYBOARD

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

    this.interactionKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // DISCS
        
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

        this.physics.add.collider(
            this.alienNpc,
            this.platforms
        )

        this.physics.add.collider(
            this.alienNpc2,
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


    
    // UPDATE
  

    update() {

 // =========================
//NPC MOVEMENT
// =========================
 updateNPC1(this.npc1);
 updateNPC2(this.npc2);
 updateNefiShopkeeper(this.shopKeeper);
 updateAlienNpc(this.alienNpc);
 updateAlienNpc2(this.alienNpc2);


 if (
    Phaser.Input.Keyboard.JustDown(
        this.positionKey
    )
) {
    console.log(
        `Player X: ${Math.round(this.player.x)}, Y: ${Math.round(this.player.y)}`
    );
}


const insideNefiVillage =
    this.player.x >= 3000 &&
    this.player.y >= 13800 &&
    this.player.y <= 14500;

// Player ENTERS Nefi Village
if (insideNefiVillage && !this.nefiVillageShown) {

    console.log("NEFI VILLAGE TRIGGERED!");

    this.nefiVillageShown = true;

    showAreaName(
        this,
        "Nefi Village"
    );
}


if (!insideNefiVillage && this.nefiVillageShown) {

    console.log("LEFT NEFI VILLAGE");

    this.nefiVillageShown = false;
}



// =========================
// SHOPKEEPER DIALOGUE
// =========================

// Keep speech bubble attached to shopkeeper
this.shopkeeperDialogue.updateBubble();

const shopkeeperDistance =
    Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.shopKeeper.x,
        this.shopKeeper.y
    );

if (
    shopkeeperDistance < 100 &&
    Phaser.Input.Keyboard.JustDown(this.interactionKey) &&
    !this.registry.get("shopkeeperTalking")
) {

    this.shopkeeperDialogue.startDialogue(
        this.player,

        () => this.score,

        (amount: number) => {

            this.score -= amount;

            this.scoreText.setText(
                "Drive Score: " + this.score
            );
        }
    );
}


if (this.registry.get("shopkeeperTalking")) {

    this.player.setVelocity(0, 0);

    return;
}



// =========================
// SHOPKEEPER INTERACTION
// =========================



if (
    shopkeeperDistance < 100 &&
    Phaser.Input.Keyboard.JustDown(this.interactionKey) &&
    !this.registry.get("shopkeeperTalking")
) {

    startShopkeeperDialogue(this);
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

// Start climbing when touching a ladder
if (
    touchingLadder &&
    (this.cursors.up.isDown || this.cursors.down.isDown) &&
    !this.onLadder
) {
    this.onLadder = true;
}

// Stop climbing when no longer touching the ladder
if (
    this.onLadder &&
    !touchingLadder
) {
    this.onLadder = false;
    this.player.body.allowGravity = true;
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


    // =========================
    // CLIMBING ANIMATION
    // =========================

    if (
        this.cursors.up.isDown ||
        this.cursors.down.isDown
    ) {

        this.player.anims.play("ladder-climb-animation", true);

    }
    else {

        // No climbing input
        this.player.anims.stop();

        // Show the first climbing frame
        this.player.setTexture("ladder-climb-animation", 0);
    }


    // =========================
    // JUMP OFF LADDER
    // =========================
if (this.cursors.left.isDown) {

    this.onLadder = false;

    this.player.body.allowGravity = true;

    this.player.setTexture("girl");

    this.player.setVelocityX(-160);
    this.player.setVelocityY(-100);

    this.player.anims.play("left", true);

    return;
}


    if (this.cursors.right.isDown) {

    this.onLadder = false;

    this.player.body.allowGravity = true;

    this.player.setTexture("girl");

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


        // =========================
        // VIRUS ANIMATION
        // =========================

        this.viruses.children.iterate((child) => {

            const virus = child as Phaser.Physics.Arcade.Sprite;

            if (virus.body.velocity.x < 0) {

                virus.anims.play(
                    "virus-walk-left",
                    true
                );

            }
            else if (virus.body.velocity.x > 0) {

                virus.anims.play(
                    "virus-walk-right",
                    true
                );

            }
            else {

                virus.anims.stop();

            }

            return true;
        });

    } // <-- THIS closes update()


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
        ).setDepth(30);
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
import Phaser from "phaser";
import { createJhNpc, updateJhNpc } from "../npcs/jhNpc";

export default class JungleHouseScene extends Phaser.Scene {

    // =========================
    // GAME OBJECTS
    // =========================

    player!: Phaser.Physics.Arcade.Sprite;
    discs!: Phaser.Physics.Arcade.Group;
    platforms!: Phaser.Physics.Arcade.StaticGroup;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    chest!: Phaser.Physics.Arcade.Sprite;
    interactionKey!: Phaser.Input.Keyboard.Key;
    exitDoor!: Phaser.GameObjects.Zone;
    scoreText!: Phaser.GameObjects.Text;
    jhNpc!: Phaser.Physics.Arcade.Sprite;
    private isTransitioning = false;
    private chestOpened = false;
    private canExit = false;


    // =========================
    // SCENE VARIABLES
    // =========================

    private isTransitioning = false;

    private canExit = false;


    // =========================
    // CONSTRUCTOR
    // =========================

    constructor() {
        super("JungleHouseScene");
    }


    // =========================
    // CREATE
    // =========================

    create(data: {
        outsideSpawnX?: number;
        outsideSpawnY?: number;
    }) {

        // =========================
        // RESET SCENE VARIABLES
        // =========================

        this.isTransitioning = false;
        this.canExit = false;


        // =========================
        // WORLD BOUNDS
        // =========================

        this.physics.world.setBounds(
            0,
            0,
            800,
            600
        );

        this.physics.world.setBoundsCollision(
            true,   // left
            true,   // right
            false,  // top
            false   // bottom
        );


        // =========================
        // STORE OUTSIDE SPAWN POINT
        // =========================

        const outsideSpawnX =
            data.outsideSpawnX ?? 200;

        const outsideSpawnY =
            data.outsideSpawnY ?? 13000;


            // =========================
// CHEST ANIMATION
// =========================

if (!this.anims.exists("jungle-heights-chest-open")) {

    this.anims.create({

        key: "jungle-heights-chest-open",

        frames:

            this.anims.generateFrameNumbers(

                "jungle-heights-chest",

                {

                    start: 0,

                    end: 1

                }

            ),

        frameRate: 4,

        repeat: 0

    });

}


// =========================
// CHEST
// =========================

this.chest = this.physics.add.sprite(

    650,

    470,

    "jungle-heights-chest",

    0

);

this.chest.setScale(3);

this.chest.setDepth(50);

this.chest.body.setAllowGravity(false);

this.chest.setImmovable(true);





        // =========================
        // TREEHOUSE BACKGROUND
        // =========================

        this.add
            .image(
                400,
                300,
                "jungle-heights-wood-bg"
            )
            .setScale(2);


        // =========================
        // FOLIAGE
        // =========================

        const foliage =
            this.add.image(
                400,
                300,
                "bush-border"
            );

        foliage.setScale(1);
        foliage.setDepth(100);



        // =========================
        // PLATFORMS
        // =========================

        this.platforms =
            this.physics.add.staticGroup();


        
        this.platforms
            .create(
                200,
                500,
                "platform2"
            )
            .setScale(2)
            .refreshBody();


        
        this.platforms
            .create(
                400,
                520,
                "platform2"
            )
            .setScale(2)
            .refreshBody();


        
        this.platforms
            .create(
                600,
                530,
                "platform2"
            )
            .setScale(2)
            .refreshBody();


        
        this.platforms
            .create(
                400,
                610,
                "nefi-platform1"
            )
            .setScale(2)
            .refreshBody();


        
        this.platforms
            .create(
                10,
                370,
                "jungle-heights-platform2"
            )
            .setScale(2)
            .refreshBody();


        
        this.platforms
            .create(
                500,
                300,
                "jungle-heights-platform2"
            )
            .setScale(2)
            .refreshBody();


        
        this.platforms
            .create(
                120,
                150,
                "jungle-heights-platform"
            )
            .setScale(2)
            .refreshBody();


        // =========================
        // DISCS
        // =========================

        this.discs =
            this.physics.add.group();


        
        this.discs
            .create(
                200,
                465,
                "disc"
            )
            .setScale(2);


        
        this.discs
            .create(
                250,
                465,
                "disc"
            )
            .setScale(2);


        
        this.discs
            .create(
                370,
                485,
                "disc"
            )
            .setScale(2);


    
        this.discs
            .create(
                430,
                485,
                "disc"
            )
            .setScale(2);


        
        this.discs
            .create(
                570,
                495,
                "disc"
            )
            .setScale(2);


        
        this.discs
            .create(
                10,
                335,
                "disc"
            )
            .setScale(2);


        
        this.discs
            .create(
                500,
                245,
                "disc"
            )
            .setScale(2);


    
        this.discs
            .create(
                120,
                115,
                "disc"
            )
            .setScale(2);


        
        this.discs.children.iterate(
            (child) => {

                const disc =
                    child as Phaser.Physics.Arcade.Sprite;

                disc.body.setAllowGravity(false);

                return true;
            }
        );


        //npc walking around

        this.jhNpc = createJhNpc(this);


        // =========================
        // EXIT LADDER
        // =========================

        this.add
            .image(
                400,
                540,
                "jungle-heights-ladder"
            )
            .setScale(2);


        // =========================
        // PLAYER
        // =========================

        this.player =
            this.physics.add
                .sprite(
                    400,
                    480,
                    "girl"
                )
                .setScale(3)
                .refreshBody();


        // Player hitbox
        this.player.body.setSize(
            12,
            14
        );

        this.player.body.setOffset(
            2,
            2
        );


        // =========================
        // PLAYER COLLIDER
        // =========================

        this.physics.add.collider(
            this.player,
            this.platforms
        );


        // Discs collide with platforms
        this.physics.add.collider(
            this.discs,
            this.platforms
        );

        //npc collider

        this.physics.add.collider(
            this.jhNpc,
            this.platforms
        )

        // Player respects left/right bounds
        this.player.setCollideWorldBounds(
            true
        );


        // =========================
        // PLAYER ANIMATIONS
        // =========================

        // LEFT
        if (!this.anims.exists("left")) {

            this.anims.create({
                key: "left",

                frames:
                    this.anims.generateFrameNumbers(
                        "girl",
                        {
                            start: 0,
                            end: 3
                        }
                    ),

                frameRate: 10,

                repeat: -1
            });
        }


        // IDLE / TURN
        if (!this.anims.exists("turn")) {

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
        }


        // RIGHT
        if (!this.anims.exists("right")) {

            this.anims.create({
                key: "right",

                frames:
                    this.anims.generateFrameNumbers(
                        "girl",
                        {
                            start: 6,
                            end: 9
                        }
                    ),

                frameRate: 10,

                repeat: -1
            });
        }


        // =========================
        // KEYBOARD
        // =========================

        const keyboard =
            this.input.keyboard;

        if (!keyboard) {

            throw new Error(
                "Keyboard plugin is not available."
            );
        }

        this.cursors =
            keyboard.createCursorKeys();

        this.interactionKey = keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.E
        )

        // =========================
        // SCORE
        // =========================

        // Get the shared score
        const currentScore =
            this.registry.get("score") ?? 0;


        // Make sure the registry has it
        this.registry.set(
            "score",
            currentScore
        );


        // Display the shared score
        this.scoreText =
            this.add.text(
                16,
                16,
                `Drive Score: ${currentScore}`,
                {
                    fontFamily: "monospace",
                    fontSize: "26px",
                    color: "#00FF9F",
                    stroke: "#BD00FF",
                    strokeThickness: 3
                }
            );


        // Keep score fixed to screen
        this.scoreText.setScrollFactor(0);

        this.scoreText.setDepth(200);


        // =========================
        // EXIT TRIGGER
        // =========================

        this.exitDoor =
            this.add.zone(
                400,
                550,
                60,
                40
            );


        // Give the zone a static physics body
        this.physics.add.existing(
            this.exitDoor,
            true
        );


        // =========================
        // AUTOMATIC EXIT
        // =========================

        this.physics.add.overlap(
            this.player,
            this.exitDoor,
            () => {

                // Don't exit immediately
                // after entering the treehouse
                if (!this.canExit) {
                    return;
                }


                // Prevent duplicate transitions
                if (this.isTransitioning) {
                    return;
                }


                this.exitTreehouse(
                    outsideSpawnX,
                    outsideSpawnY
                );
            }
        );


        // =========================
        // DISC COLLECTION
        // =========================

        this.physics.add.overlap(
            this.player,
            this.discs,
            this.collectDisc,
            undefined,
            this
        );


        // =========================
        // ENABLE EXIT AFTER DELAY
        // =========================

        this.time.delayedCall(
            800,
            () => {
                this.canExit = true;
            }
        );


        // =========================
        // FADE IN
        // =========================

        this.cameras.main.fadeIn(
            400,
            0,
            0,
            0
        );
    }


    // =========================
    // UPDATE
    // =========================

    update() {

        // =========================
// CHEST INTERACTION
// =========================

const chestDistance =

    Phaser.Math.Distance.Between(

        this.player.x,

        this.player.y,

        this.chest.x,

        this.chest.y

    );


if (

    chestDistance < 70 &&

    Phaser.Input.Keyboard.JustDown(

        this.interactionKey

    ) &&

    !this.chestOpened

) {

    this.openChest();

}

        //npc movement
        updateJhNpc(this.jhNpc);

        // =========================
        // TRANSITION CHECK
        // =========================

        if (this.isTransitioning) {

            this.player.setVelocityX(0);

            return;
        }


        // =========================
        // LEFT
        // =========================

        if (this.cursors.left.isDown) {

            this.player.setVelocityX(
                -160
            );

            this.player.anims.play(
                "left",
                true
            );
        }


        // =========================
        // RIGHT
        // =========================

        else if (
            this.cursors.right.isDown
        ) {

            this.player.setVelocityX(
                160
            );

            this.player.anims.play(
                "right",
                true
            );
        }


        // =========================
        // IDLE
        // =========================

        else {

            this.player.setVelocityX(0);

            this.player.anims.play(
                "turn"
            );
        }


        // =========================
        // JUMP
        // =========================

        if (
            this.cursors.up.isDown &&
            this.player.body.touching.down
        ) {

            this.player.setVelocityY(
                -475
            );
        }


        // =========================
        // UPDATE SCORE DISPLAY
        // =========================

        const currentScore =
            this.registry.get("score") ?? 0;

        this.scoreText.setText(
            `Drive Score: ${currentScore}`
        );
    }


    // =========================
    // COLLECT DISC
    // =========================

    collectDisc(
        player: Phaser.Physics.Arcade.Sprite,
        disc: Phaser.Physics.Arcade.Sprite
    ) {

        // Remove disc
        disc.disableBody(
            true,
            true
        );


        // Get current shared score
        const currentScore =
            this.registry.get("score") ?? 0;


        // Add 10 points
        const newScore =
            currentScore + 10;


        // Save new score
        this.registry.set(
            "score",
            newScore
        );


        // Update score display
        this.scoreText.setText(
            `Drive Score: ${newScore}`
        );
    }


// =========================
// EXIT TREEHOUSE
// =========================

exitTreehouse(
    outsideSpawnX: number,
    outsideSpawnY: number
) {

    // Prevent duplicate transitions
    if (this.isTransitioning) {
        return;
    }

    this.isTransitioning = true;

    // Stop player movement
    this.player.setVelocity(
        0,
        0
    );

    // Save current score
    const currentScore =
        this.registry.get("score") ?? 0;

    this.registry.set(
        "score",
        currentScore
    );

    // Fade out
    this.cameras.main.fadeOut(
        400,
        0,
        0,
        0
    );

    // Wait for fade before returning outside
    this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events
            .FADE_OUT_COMPLETE,

        () => {

            this.scene.start(
                "GameScene",
                {
                    spawnX: outsideSpawnX,
                    spawnY: outsideSpawnY
                }
            );

        }
    );

}


// =========================
// OPEN CHEST
// =========================

openChest() {

    // Prevent opening twice
    if (this.chestOpened) {
        return;
    }

    this.chestOpened = true;

    // Play opening animation
    this.chest.play(
        "jungle-heights-chest-open"
    );

    // Get current shared score
    const currentScore =
        this.registry.get("score") ?? 0;

    // Add 100 discs
    const newScore =
        currentScore + 100;

    // Save shared score
    this.registry.set(
        "score",
        newScore
    );

    // Update score display
    this.scoreText.setText(
        "Drive Score: " + newScore
    );

    console.log(
        "CHEST OPENED! +100 DRIVE SCORE"
    );

}

}
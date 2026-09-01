import Phaser from "phaser";

export default class JungleHouseScene extends Phaser.Scene {

    player!: Phaser.Physics.Arcade.Sprite;

    platforms!: Phaser.Physics.Arcade.StaticGroup;

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    exitDoor!: Phaser.GameObjects.Zone;

    // Prevent multiple scene transitions
    private isTransitioning = false;

    // Prevent immediate exit when entering the treehouse
    private canExit = false;


    constructor() {

        super("JungleHouseScene");

    }


    create(data: {

        outsideSpawnX?: number;

        outsideSpawnY?: number;

    }) {

       

        this.isTransitioning = false;

        this.canExit = false;

        this.physics.world.setBounds(
    0,
    0,
    800,
    600
);


this.physics.world.setBoundsCollision(

    true,  // left
    true,  // right
    false, // top
    false  // bottom

);


        // =========================
        // STORE OUTSIDE SPAWN POINT
        // =========================

        const outsideSpawnX =
            data.outsideSpawnX ?? 200;

        const outsideSpawnY =
            data.outsideSpawnY ?? 13000;


        // =========================
        // TREEHOUSE ROOM
        // =========================

        // Background

        this.add.image(
            400,
            300,
            "jungle-heights-wood-bg"
        )
        .setScale(2);


        // Foliage

        const foliage = this.add.image(
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

            this.platforms.create(
                400,
                610,
                "nefi-platform1").setScale(2).refreshBody()

        this.platforms.create(
                10,
                370,
                "jungle-heights-platform2").setScale(2).refreshBody()

         this.platforms.create(
                500,
                300,
                "jungle-heights-platform2").setScale(2).refreshBody()

        this.platforms.create(
                120,
                150,
                "jungle-heights-platform").setScale(2).refreshBody()

        // =========================
        // EXIT LADDER
        // =========================

        this.add.image(
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

                    // Spawn safely above the ladder
                    // and exit trigger.
                    480,

                    "girl"
                )
                .setScale(3)
                .refreshBody();


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

        this.player.setCollideWorldBounds(true);


        // =========================
        // PLAYER ANIMATIONS
        // =========================

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

                // Do nothing if the player has just
                // entered the treehouse.

                if (!this.canExit) {

                    return;

                }


                // Prevent transition from firing twice.

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
        // ENABLE EXIT AFTER DELAY
        // =========================

        // This prevents the player from spawning,
        // immediately overlapping the exit zone,
        // and getting stuck in a transition loop.

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


    update() {

        // Don't allow movement during a transition.

        if (this.isTransitioning) {

            this.player.setVelocityX(0);

            return;

        }


        // =========================
        // LEFT / RIGHT
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

        if (

            this.cursors.up.isDown &&

            this.player.body.touching.down

        ) {

            this.player.setVelocityY(-475);

        }

    }


    // =========================
    // EXIT TREEHOUSE
    // =========================

    exitTreehouse(

        outsideSpawnX: number,

        outsideSpawnY: number

    ) {

        // Prevent this function from running twice.

        if (this.isTransitioning) {

            return;

        }


        this.isTransitioning = true;


        // Stop the player immediately.

        this.player.setVelocity(

            0,

            0

        );


        // Fade out.

        this.cameras.main.fadeOut(

            400,

            0,

            0,

            0

        );


        // Wait for fade to finish.

        this.cameras.main.once(

            Phaser.Cameras.Scene2D.Events
                .FADE_OUT_COMPLETE,

            () => {

                this.scene.start(

                    "GameScene",

                    {

                        spawnX:
                            outsideSpawnX,

                        spawnY:
                            outsideSpawnY

                    }

                );

            }

        );

    }

}
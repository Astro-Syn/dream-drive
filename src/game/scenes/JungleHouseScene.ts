import Phaser from "phaser";

export default class JungleHouseScene extends Phaser.Scene {

    // =========================
    // GAME OBJECTS
    // =========================

    player!: Phaser.Physics.Arcade.Sprite;

    platforms!: Phaser.Physics.Arcade.StaticGroup;

    ladders!: Phaser.Physics.Arcade.StaticGroup;

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;


    // =========================
    // LADDER VARIABLES
    // =========================

    onLadder = false;

    private exitingTreehouse = false;


    constructor() {

        super("JungleHouseScene");

    }


    create(data: {

        outsideSpawnX?: number;

        outsideSpawnY?: number;

    }) {

        // =========================
        // STORE OUTSIDE SPAWN POINT
        // =========================

        const outsideSpawnX =
            data.outsideSpawnX ?? 200;

        const outsideSpawnY =
            data.outsideSpawnY ?? 13000;


        // =========================
        // TREEHOUSE BACKGROUND
        // =========================

        this.add.image(
            400,
            300,
            "jungle-heights-wood-bg"
        )
        .setScale(2);


        // =========================
        // FOLIAGE
        // =========================

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


        // LEFT FLOOR
        this.platforms
            .create(
                300,
                600,
                "platform2"
            )
            .setScale(2)
            .refreshBody();


        // RIGHT FLOOR
        this.platforms
            .create(
                620,
                600,
                "platform2"
            )
            .setScale(2)
            .refreshBody();


        // =========================
        // EXIT LADDER
        // =========================

        this.ladders =
            this.physics.add.staticGroup();


        this.ladders
            .create(
                400,
                540,
                "jungle-heights-ladder"
            )
            .setScale(2)
            .refreshBody();


        // =========================
        // PLAYER
        // =========================

        this.player =
            this.physics.add
                .sprite(
                    300,
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
        // PLAYER COLLIDES WITH FLOOR
        // =========================

        this.physics.add.collider(
            this.player,
            this.platforms
        );


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
        // LADDER CLIMB ANIMATION
        // =========================

        if (
            !this.anims.exists(
                "ladder-climb-animation"
            )
        ) {

            this.anims.create({

                key:
                    "ladder-climb-animation",

                frames:
                    this.anims.generateFrameNumbers(
                        "ladder-climb-animation",
                        {
                            start: 0,
                            end: 2
                        }
                    ),

                frameRate: 8,

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
        // FADE IN
        // =========================

        this.cameras.main.fadeIn(
            400,
            0,
            0,
            0
        );


        // =========================
        // STORE EXIT DATA
        // =========================

        this.registry.set(
            "outsideSpawnX",
            outsideSpawnX
        );

        this.registry.set(
            "outsideSpawnY",
            outsideSpawnY
        );

    }


    update() {

        // Prevent anything from happening
        // while the scene is transitioning.

        if (this.exitingTreehouse) {

            return;

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


        // =========================
        // START CLIMBING
        // =========================

        if (

            touchingLadder &&

            (
                this.cursors.up.isDown ||

                this.cursors.down.isDown
            )

        ) {

            this.onLadder = true;

        }


        // =========================
        // STOP CLIMBING
        // =========================

        if (

            this.onLadder &&

            !touchingLadder

        ) {

            this.onLadder = false;

            this.player.body.allowGravity =
                true;

        }


        // =========================
        // LADDER MOVEMENT
        // =========================

        if (this.onLadder) {

            // Disable gravity ONLY
            // while climbing.

            this.player.body.allowGravity =
                false;


            // Stop horizontal movement.

            this.player.setVelocityX(0);


            // =========================
            // CLIMB UP
            // =========================

            if (
                this.cursors.up.isDown
            ) {

                this.player.setVelocityY(
                    -140
                );

                this.player.anims.play(
                    "ladder-climb-animation",
                    true
                );

            }


            // =========================
            // CLIMB DOWN
            // =========================

            else if (
                this.cursors.down.isDown
            ) {

                this.player.setVelocityY(
                    140
                );

                this.player.anims.play(
                    "ladder-climb-animation",
                    true
                );

            }


            // =========================
            // STOP ON LADDER
            // =========================

            else {

                this.player.setVelocityY(0);

                this.player.anims.stop();

                this.player.setTexture(
                    "ladder-climb-animation",
                    0
                );

            }


            // =========================
            // EXIT TREEHOUSE
            // =========================

            // Once the player climbs below
            // the bottom of the treehouse,
            // automatically exit.

            if (
                this.player.y > 620
            ) {

                const outsideSpawnX =
                    this.registry.get(
                        "outsideSpawnX"
                    );

                const outsideSpawnY =
                    this.registry.get(
                        "outsideSpawnY"
                    );


                this.exitTreehouse(

                    outsideSpawnX,

                    outsideSpawnY

                );

            }


            return;

        }


        // =========================
        // NORMAL GRAVITY
        // =========================

        this.player.body.allowGravity =
            true;


        // =========================
        // LEFT MOVEMENT
        // =========================

        if (
            this.cursors.left.isDown
        ) {

            this.player.setVelocityX(
                -160
            );

            this.player.anims.play(
                "left",
                true
            );

        }


        // =========================
        // RIGHT MOVEMENT
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

    }


    // =========================
    // EXIT TREEHOUSE
    // =========================

    exitTreehouse(

        outsideSpawnX: number,

        outsideSpawnY: number

    ) {

        // Prevent this from firing
        // multiple times.

        if (this.exitingTreehouse) {

            return;

        }


        this.exitingTreehouse = true;


        this.player.setVelocity(
            0,
            0
        );


        this.cameras.main.fadeOut(

            400,

            0,

            0,

            0

        );


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
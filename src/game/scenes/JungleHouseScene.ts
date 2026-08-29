import Phaser from "phaser";

export default class JungleHouseScene extends Phaser.Scene {

    player!: Phaser.Physics.Arcade.Sprite;

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    exitDoor!: Phaser.GameObjects.Zone;


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
        // TEMPORARY TREEHOUSE ROOM
        // =========================

        this.add.rectangle(
            400,
            300,
            800,
            600,
            0x2b1b12
        );


        // =========================
        // TEMPORARY EXIT DOOR
        // =========================

        this.add.rectangle(
            400,
            550,
            60,
            80,
            0x5c3824
        );


        // =========================
        // PLAYER
        // =========================

        this.player = this.physics.add
            .sprite(
                400,
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
        // PLAYER ANIMATIONS
        // =========================

        // We need these animations in this
        // scene as well.

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
        // EXIT DOOR TRIGGER
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

                this.exitTreehouse(
                    outsideSpawnX,
                    outsideSpawnY
                );

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

    }


    // =========================
    // EXIT TREEHOUSE
    // =========================

    exitTreehouse(
        outsideSpawnX: number,
        outsideSpawnY: number
    ) {

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
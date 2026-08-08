import Phaser from "phaser";

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

    score = 0;
    scoreText!: Phaser.GameObjects.Text;

    gameOver = false;
    gameResetText!: Phaser.GameObjects.Text;

    onLadder = false;


    // =========================
    // CONSTRUCTOR
    // =========================

    constructor() {
        super("GameScene");
    }


    // =========================
    // PRELOAD
    // =========================

    preload() {

        this.load.image(
            "sky",
            "/Images/game-background.png"
        );

        this.load.image(
            "bg1",
            "/Images/dream-drive-bg1.png"
        );

        this.load.image(
            "bg2",
            "/Images/dream-drive-bg2.png"
        );

        this.load.image(
            "bg3",
            "/Images/dream-drive-bg3.png"
        );

        this.load.image(
            "bg4",
            "/Images/dream-drive-bg4.png"
        );

        this.load.image(
            "ground",
            "/Images/game-sprite-platform.png"
        );

        this.load.image(
            "disc",
            "/Images/game-cd.png"
        );

        this.load.image(
            "virus",
            "/Images/game-virus.png"
        );

        this.load.spritesheet(
            "girl",
            "/Images/game-sprite-f.png",
            {
                frameWidth: 20,
                frameHeight: 27
            }
        );

        this.load.image(
            "asset1",
            "/Images/game-bg-asset1.png"
        );

        this.load.image(
            "asset2",
            "/Images/game-bg-asset2.png"
        );

        this.load.image(
            "cliff1",
            "/Images/dream-drive-platform1.png"
        );

        this.load.image(
            "sodamachine",
            "/Images/dream-drive-sodamachine-asset.png"
        );

        this.load.image(
            "platform2",
            "/Images/game-platform2.png"
        );

        this.load.image(
            "vines-grass",
            "/Images/dream-drive-grass-vines.png"
        );

        this.load.image(
            "cliff-bottom",
            "/Images/dream-drive-cliff-bottom.png"
        );

        this.load.image(
            "palm-tree",
            "/Images/dream-drive-palm-tree.png"
        );

        this.load.image(
            "bush",
            "/Images/dream-drive-bush.png"
        );

        this.load.image(
            "plant",
            "/Images/dream-drive-plant1.png"
        );

        this.load.image(
            "cliff-grass",
            "/Images/cliff-grass.png"
        );

        this.load.image(
            "cliff-green-top",
            "/Images/cliff-green-top.png"
        );

        this.load.image(
            "cliff2",
            "/Images/cliff1.png"
        );

        this.load.spritesheet(
            "waterfall-sprite",
            "/Images/waterfall-sprite.png",
            {
                frameWidth: 43,
                frameHeight: 168
            }
        );

        this.load.image(
            "bridge",
            "/Images/dream-drive-bridge.png"
        );

      

        this.load.image(
            "diving-tree",
            "/Images/dividing-tree.png"
        );

        this.load.image(
            "wall-pipes",
            "/Images/asset-nefi-village-wall-pipes.png"
        );

        this.load.image(
            "nefi-walls",
            "/Images/asset-nefi-village-walls.png"
        );

        this.load.image(
            "pipe",
            "/Images/asset-pipe.png"
        );

        this.load.image(
            "nefi-platform1",
            "/Images/nefi-platform1.png"
        );

        this.load.spritesheet(
            "nefi-village-large-sign-sprite",
            "/Images/nefi-village-big-screen-sprite.png",
            {
                frameWidth: 242,
                frameHeight: 82
            }
        );

        this.load.spritesheet(
            "nefi-village-screen2",
            "/Images/nefi-village-screen2.png",
            {
                frameWidth: 82,
                frameHeight: 64
            }
        );

        this.load.image(
            "house1",
            "/Images/nefi-village-house1.png"
        );

        this.load.image(
            "nefi-ladder",
            "/Images/nefi-ladder.png"
        );

        this.load.image(
            "house2",
            "/Images/nefi-village-house2.png"
        );

        this.load.image(
            "nefi-mailbox",
            '/Images/nefi-mailbox.png'
        );

        this.load.image(
            "nefi-vine1",
            "/Images/nefi-vine1.png"
        );

        this.load.image(
            "nefi-vine2",
            "/Images/nefi-vine2.png"
        );

        this.load.image(
            'bg5',
            '/Images/dream-drive-bg5.png'
        );
        this.load.image(
            'bg6',
            '/Images/dream-drive-bg6.png'
        );
        this.load.image(
            'bg7',
            '/Images/dream-drive-bg7.png'
        );
        this.load.image(
            'nefi-bg-tree',
            '/Images/nefi-bg-tree.png'
        );
        this.load.image(
            "bg8",
            "/Images/dream-drive-bg8.png"
        )
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
        

        this.add.image(400, 300, "sky");
        this.add.image(400, 900, "sky");
        this.add.image(400, 1500, "sky");
        this.add.image(400, 2100, "sky");
        this.add.image(400, 2700, "sky");
        this.add.image(400, 3300, "sky");
        this.add.image(400, 3900, "sky");
        this.add.image(400, 4500, "sky");
        this.add.image(400, 5100, "sky");
        this.add.image(400, 5700, "sky");
        this.add.image(400, 6300, "sky");
        this.add.image(400, 6900, "sky");
        this.add.image(400, 7500, "sky");
        this.add.image(400, 8100, "sky");
        this.add.image(400, 8700, "sky");
        this.add.image(400, 9300, "sky");
        this.add.image(400, 9900, "sky");
        this.add.image(400, 10500, "sky");
        this.add.image(400, 11100, "sky");
        this.add.image(400, 11700, "sky");
        this.add.image(400, 12300, "sky");
        this.add.image(400, 12900, "sky");
        this.add.image(400, 13500, "sky");
        this.add.image(400, 13900, "bg3");
        this.add.image(400, 14700, "bg2");
        this.add.image(400, 15500, "bg1");

        this.add
            .image(600, 380, "asset1")
            .setScale(4);

        this.add
            .image(100, 435, "asset2")
            .setScale(2);


        
        // HORIZONTAL SECTION BACKGROUNDS
        

        this.add.image(1200, 13900, "bg3");
        this.add.image(1200, 14700, "bg2");

        this.add.image(2000, 13900, "bg3");
        this.add.image(2000, 14700, "bg2");

        this.add.image(2800, 14700, "bg8");
        this.add.image(2800, 13900, "bg4");

        this.add.image(2800, 13100, "bg6");

        this.add.image(3600, 13100, "bg7");
        this.add.image(3600, 13900, "bg5");
        this.add.image(3600, 14700, "bg7");
       

       
       


        
        // PLATFORMS
        

        this.platforms = this.physics.add.staticGroup();

        this.add
            .image(600, 15544, "cliff-bottom")
            .setScale(2);

        const cliff = this.platforms
            .create(20, 15550, "cliff1")
            .setScale(2)
            .refreshBody();

        cliff.body.setSize(478, 30);
        cliff.body.setOffset(0, 0);

        this.add
            .image(680, 15650, "palm-tree")
            .setScale(2);

        this.platforms
            .create(400, 15950, "ground")
            .setScale(6)
            .refreshBody();

        this.platforms
            .create(420, 15750, "ground")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(420, 15600, "platform2")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(300, 15360, "platform2")
            .setScale(2)
            .refreshBody();

        this.add
            .image(50, 15797, "sodamachine")
            .setScale(2);

        const cliff2 = this.platforms
            .create(600, 15300, "cliff1")
            .setScale(2)
            .refreshBody()
            .setFlipX(true);

        cliff2.body.setSize(478, 30);
        cliff2.body.setOffset(0, 0);

        const cliff3 = this.platforms
            .create(80, 15000, "cliff1")
            .setScale(2)
            .refreshBody();

        cliff3.body.setSize(478, 30);
        cliff3.body.setOffset(0, 0);

        this.add
            .image(330, 14835, "palm-tree")
            .setFlipX(true);

        this.platforms
            .create(300, 15080, "platform2")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(385, 15080, "platform2")
            .setScale(2);

        this.platforms
            .create(625, 14865, "ground")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(650, 14865, "ground")
            .setScale(2)
            .refreshBody();

        this.add
            .image(655, 14755, "asset1")
            .setScale(2);

        this.platforms
            .create(375, 14805, "platform2")
            .setScale(2)
            .refreshBody();

        this.add
            .image(80, 14668, "plant")
            .setScale(2);

        this.platforms
            .create(60, 14700, "ground")
            .setScale(2)
            .refreshBody();

        this.add
            .image(650, 14387, "cliff2")
            .setScale(2);

        this.platforms
            .create(650, 14210, "cliff-green-top")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(200, 14450, "platform2")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(400, 14380, "platform2")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(190, 14280, "platform2")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(400, 14210, "platform2")
            .setScale(2)
            .refreshBody();

        this.add
            .image(700, 14010, "cliff2")
            .setScale(2);

        this.platforms
            .create(700, 13850, "cliff-green-top")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(200, 14100, "platform2")
            .setScale(2)
            .refreshBody();


        
        // LADDERS

        this.ladders = this.physics.add.staticGroup();


        // =========================
        // WATERFALL ANIMATION
        // =========================

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

        this.add
            .image(1050, 14150, "diving-tree")
            .setScale(3);


        // =========================
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


        
        // BRIDGE
      

        this.platforms
            .create(930, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(1160, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(1390, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(1620, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(1850, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(2080, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(2310, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(2540, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(2770, 14200, "bridge")
            .setScale(2)
            .refreshBody();

      

        this.platforms
            .create(3000, 14200, "bridge")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(3230, 14200, "bridge")
            .setScale(2)
            .refreshBody();


        // =========================
        // NEFI VILLAGE
        // =========================

        this.add.image(3300, 14400, "nefi-bg-tree").setScale(2);

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

        this.platforms
            .create(3700, 14217, "nefi-platform1")
            .setScale(2)
            .refreshBody();


     
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
            .image(3300, 13490, "palm-tree")
            .setScale(2);

        this.platforms
            .create(3640, 13700, "nefi-platform1")
            .setScale(2)
            .refreshBody();

        this.add
        .image(3940, 13730, 
            'nefi-vine1'
        ).setScale(2);

        this.add
        .image(3330, 13735,
            'nefi-vine2'
        ).setScale(2);

        this.add.image(3300, 13728,
            'nefi-vine2'
        ).setScale(2);

        this.add.image(3250, 13650, 
            'nefi-mailbox'
        ).setScale(2);

        // =========================
        // LADDER
        // =========================

        this.ladders
            .create(4070, 13942, "nefi-ladder")
            .setScale(2)
            .refreshBody();


        // =========================
        // PLAYER
        // =========================

        this.player = this.physics.add
            .sprite(3500, 13650, "girl")
            .setScale(3);

        this.player.body.setSize(14, 18);
        this.player.body.setOffset(2, 3);

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);


        // =========================
        // MORE DECORATIONS
        // =========================

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

        this.platforms
            .create(25, 15250, "ground")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(650, 15150, "ground")
            .setScale(2)
            .refreshBody();

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

        this.platforms
            .create(350, 14570, "platform2")
            .setScale(2)
            .refreshBody();

        this.platforms
            .create(650, 14595, "ground")
            .setScale(2)
            .refreshBody();

        this.add
            .image(800, 14190, "plant")
            .setScale(2);


        // =========================
        // WATERFALL
        // =========================

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


        // =========================
        // PLAYER ANIMATIONS
        // =========================

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
            key: "right",
            frames: this.anims.generateFrameNumbers(
                "girl",
                {
                    start: 5,
                    end: 8
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
        // LADDER MOVEMENT
        // =========================

        if (this.onLadder) {

            // Gravity stays OFF for the entire time
            // the player is touching the ladder.
            this.player.body.allowGravity = false;

            if (this.cursors.up.isDown) {

                this.player.setVelocityY(-140);

            }
            else if (this.cursors.down.isDown) {

                this.player.setVelocityY(140);

            }
            else {

                // Don't move while hanging on ladder.
                this.player.setVelocityY(0);
            }

        }
        else {

            // Normal gravity when we're NOT on ladder.
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


        // =========================
        // CAMERA
        // =========================

        const cam = this.cameras.main;


        // Vertical scroll always tracks player,
        // smoothed.

        cam.scrollY = Phaser.Math.Linear(
            cam.scrollY,
            this.player.y - cam.height / 2,
            0.08
        );


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
import Phaser from "phaser";

export default class TitleScreen extends Phaser.Scene {
    constructor() {
        super("TitleScene")
    }

    preload() {

        this.load.image(
            "title-background",
            "/Images.title-screen-bg.png"
        );

        this.load.image(
            "title-screen-title",
            "/Images/title-screen-letters.png"
        );

        this.load.spritesheet(
            "dd-title-animation",
            "/Images/dd-title-sprite-sheet.png",
            {
                frameWidth: 669,
                frameHeight: 117
            }
        )

        this.load.image(
            "title-screen-moon",
            "/Images/title-screen-moon.png"
        );

        this.load.image(
            "title-screen-moon-deco",
            "/Images/title-screen-moon-deco.png"
        )
    }

    create() {


        //general background 

        this.add.image(800, 800, "title-background")
        .setOrigin(0.5);

        //moon deco
        this.add.image(350, 150, "title-screen-moon-deco").setOrigin(0.5);

        //moon
        this.add.image(180, 140, "title-screen-moon").setOrigin(0.5);

       


        //title animation

        this.anims.create({
            key: "dd-title-animation",
            frames: this.anims.generateFrameNumbers(
                "dd-title-animation",
                {
                    start: 0,
                    end: 9
                }
            ),
            frameRate: 12,
            repeat: 0
        })

        const titleAnimation = this.add.sprite(
            400, 280,
            "dd-title-animation"
        );


      titleAnimation.on(
    Phaser.Animations.Events.ANIMATION_COMPLETE,
    () => {
        this.time.delayedCall(7000, () => {
            titleAnimation.play("dd-title-animation");
        });
    }
);

        
        titleAnimation.play("dd-title-animation");
       

        //start button
        const startButton = this.add.text(400, 450, "Start",
            {
                fontSize: "20px",
                color: '#fff',
                fontFamily: "monospace"
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true})

        //hover
        startButton.on("pointerover", () => {
            startButton.setScale(1.1);
        });

        startButton.on("pointerout", () => {
            startButton.setScale(1);
        });

        //start game

        startButton.on("pointerdown", () => {
            this.scene.start("GameScene");
        })
    }
}
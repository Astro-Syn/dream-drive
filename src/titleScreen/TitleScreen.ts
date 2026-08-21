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

        //Game title
        this.add.image(400, 280, "title-screen-title").setOrigin(0.5);

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
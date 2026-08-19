import Phaser from "phaser";

export function createViruses(scene: Phaser.Scene) {

    scene.viruses = scene.physics.add.group();

    // =========================
    // VIRUS ANIMATIONS
    // =========================

    scene.anims.create({
        key: "virus-walk-left",
        frames: scene.anims.generateFrameNumbers("virus", {
            start: 0,
            end: 1
        }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: "virus-walk-right",
        frames: scene.anims.generateFrameNumbers("virus", {
            start: 0,
            end: 1
        }),
        frameRate: 8,
        repeat: -1
    });


    // =========================
    // BRIDGE VIRUS LOCATIONS
    // =========================

    const virusLocations = [
        { x: 900, y: 13600 },
        { x: 1450, y: 13400 },
        { x: 2000, y: 13200 },
        { x: 2550, y: 13100 },
        { x: 3100, y: 13400 }
    ];


    virusLocations.forEach(({ x, y }) => {

        const virus = scene.viruses.create(
            x,
            y,
            "virus"
        ) as Phaser.Physics.Arcade.Sprite;

        virus.setScale(1.5);

        virus.setBounce(0.2);

        virus.setCollideWorldBounds(true);

        virus.setVelocity(
            Phaser.Math.Between(-150, 150),
            Phaser.Math.Between(-40, 40)
        );

        // Start the appropriate animation
        if (virus.body.velocity.x < 0) {
            virus.anims.play("virus-walk-left", true);
        } else {
            virus.anims.play("virus-walk-right", true);
        }

    });
}
import Phaser from "phaser";

export function createViruses(scene: Phaser.Scene) {

    scene.viruses = scene.physics.add.group();

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
    });
}
import Phaser from "phaser";

export function createWaterFallAnimation(scene: Phaser.Scene) {
    scene.anims.create({
            key: "waterfall",
            frames:scene.anims.generateFrameNumbers(
                "waterfall-sprite",
                {
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        const waterfall2 =scene.add.sprite(
            600,
            14020,
            "waterfall-sprite"
        );

        waterfall2
            .setScale(2)
            .play("waterfall");

        const waterfall =scene.add.sprite(
            550,
            14387,
            "waterfall-sprite"
        );

        waterfall
            .setScale(2)
            .play("waterfall");

    scene.add
            .image(560, 14550, "plant")
            .setScale(2);


}
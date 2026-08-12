import Phaser from "phaser";

export function createNPC2(scene: Phaser.Scene) {


    scene.anims.create({
        key: "old-lady-walk-left",
        frames: scene.anims.generateFrameNumbers(
            "old-lady-npc",
            {
                start: 0,
                end: 3
            }
        ),
        frameRate: 6,
        repeat: -1
    })


    //walk right

    scene.anims.create({
        key: "old-lady-walk-right",
        frames: scene.anims.generateFrameNumbers(
            "old-lady-npc",
            {
                start: 4,
                end: 7
            }
        ),
        frameRate: 6,
        repeat: -1
    });

    const npc = scene.physics.add.sprite(
        3625, 13250,
        "old-lady-npc"
    );

    npc.setScale(3);

    npc.body.setSize(16, 15);
    npc.body.setOffset(1, 2);


    //start walking right
    npc.setVelocityX(50);

    npc.anims.play(
        "old-lady-walk-right",
        true
    );

    return npc;
}

export function updateNPC2(
    npc: Phaser.Physics.Arcade.Sprite
) {
    if (npc.x >= 3710) {
        npc.setVelocityX(-50);
        npc.setFlipX(false);

        if (
            npc.anims.currentAnim?.key !== "old-lady-walk-left"
        ) {
            npc.anims.play(
                "old-lady-walk-left",
                true
            )
        }
    }

    else if (npc.x <= 3500) {

        npc.setVelocityX(40);
        npc.setFlipX(false);

        if (
            npc.anims.currentAnim?.key !==
            "old-man-walk-right"
        ) {
            npc.anims.play(
                "old-lady-walk-right",
                true
            );
        }
    }
}





import Phaser from "phaser";

export function createNPC1(scene: Phaser.Scene) {

    // =========================
    // OLD MAN NPC ANIMATIONS
    // =========================

    // Walk left
    scene.anims.create({
        key: "old-man-walk-left",
        frames: scene.anims.generateFrameNumbers(
            "old-man-npc",
            {
                start: 0,
                end: 3
            }
        ),
        frameRate: 6,
        repeat: -1
    });


    // Walk right
    scene.anims.create({
        key: "old-man-walk-right",
        frames: scene.anims.generateFrameNumbers(
            "old-man-npc",
            {
                start: 4,
                end: 7
            }
        ),
        frameRate: 6,
        repeat: -1
    });


    // =========================
    // CREATE NPC
    // =========================

    const npc = scene.physics.add.sprite(
        3625,
        13560,
        "old-man-npc"
    );

    npc.setScale(3);

    npc.body.setSize(16, 16);
    npc.body.setOffset(1, 2);


    // =========================
    // START WALKING RIGHT
    // =========================

    npc.setVelocityX(40);

    npc.anims.play(
        "old-man-walk-right",
        true
    );


    return npc;
}


export function updateNPC1(
    npc: Phaser.Physics.Arcade.Sprite
) {

    if (npc.x >= 3700) {

        npc.setVelocityX(-40);
        npc.setFlipX(false);

        if (
            npc.anims.currentAnim?.key !==
            "old-man-walk-left"
        ) {
            npc.anims.play(
                "old-man-walk-left",
                true
            );
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
                "old-man-walk-right",
                true
            );
        }
    }
}
import Phaser from "phaser";

export function createNefiShopkeeper(scene: Phaser.Scene) {

    // =========================
    // SHOPKEEPER HEAD TURN
    // =========================

    scene.anims.create({
        key: "shop-keeper-head-turn",
        frames: scene.anims.generateFrameNumbers(
            "shop-keeper-head-turn",
            {
                start: 0,
                end: 2
            }
        ),
        frameRate: 4,
        repeat: -1
    });

    // =========================
    // SHOPKEEPER IDLE
    // =========================

    scene.anims.create({
        key: "shop-keeper-idle",
        frames: scene.anims.generateFrameNumbers(
            "shop-keeper-idle",
            {
                start: 0,
                end: 1
            }
        ),
        frameRate: 2,
        repeat: -1
    });

    // =========================
    // SHOPKEEPER STALL
    // =========================

    const shopkeeperStall = scene.add
        .image(3900, 14185, "shop-keeper-stall");

        shopkeeperStall.setScale(2);
        shopkeeperStall.setDepth(1050);

    // =========================
    // SHOPKEEPER
    // =========================

    const shopKeeper = scene.add.sprite(
        3900,
        14160,
        "shop-keeper-idle"
    );

    shopKeeper.setScale(3);
    shopKeeper.setDepth(1000);

    shopKeeper.play("shop-keeper-idle");

    return shopKeeper;
}

export function updateNefiShopkeeper(
    npc: Phaser.GameObjects.Sprite
) {
    npc.anims.play("shop-keeper-idle", true);
}
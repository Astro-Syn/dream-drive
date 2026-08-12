import Phaser from "phaser";

export function createFrontPlatforms(scene: Phaser.Scene) {
    scene.platforms = scene.physics.add.staticGroup();

 scene.platforms
        .create(930, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(1160, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(1390, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(1620, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(1850, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(2080, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(2310, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(2540, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(2770, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(3000, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(3230, 14200, "bridge")
        .setScale(2)
        .refreshBody();


    // =========================
    // NEFI VILLAGE PLATFORMS
    // =========================

    // =========================
    // MORE PLATFORMS
    // =========================

    scene.platforms
        .create(25, 15250, "ground")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(650, 15150, "ground")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(350, 14570, "platform2")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(650, 14595, "ground")
        .setScale(2)
        .refreshBody();
}


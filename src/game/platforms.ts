import Phaser from "phaser";


export function createPlatforms(
    scene: Phaser.Scene,
    platforms: Phaser.Physics.Arcade.StaticGroup
) {


    // =========================
    // PLATFORMS
    // =========================

    scene.add
        .image(600, 15544, "cliff-bottom")
        .setScale(2);

    const cliff = platforms
        .create(20, 15550, "cliff1")
        .setScale(2)
        .refreshBody();

    cliff.body.setSize(478, 30);
    cliff.body.setOffset(0, 0);


    scene.add
        .image(680, 15650, "palm-tree")
        .setScale(2);

    platforms
        .create(400, 15950, "ground")
        .setScale(6)
        .refreshBody();

    platforms
        .create(420, 15750, "ground")
        .setScale(2)
        .refreshBody();

    platforms
        .create(420, 15600, "platform2")
        .setScale(2)
        .refreshBody();

    platforms
        .create(300, 15360, "platform2")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(50, 15797, "sodamachine")
        .setScale(2);


    const cliff2 = platforms
        .create(600, 15300, "cliff1")
        .setScale(2)
        .refreshBody()
        .setFlipX(true);

    cliff2.body.setSize(478, 30);
    cliff2.body.setOffset(0, 0);


    const cliff3 = platforms
        .create(80, 15000, "cliff1")
        .setScale(2)
        .refreshBody();

    cliff3.body.setSize(478, 30);
    cliff3.body.setOffset(0, 0);


    scene.add
        .image(330, 14835, "palm-tree")
        .setFlipX(true);


    platforms
        .create(300, 15080, "platform2")
        .setScale(2)
        .refreshBody();

    platforms
        .create(385, 15080, "platform2")
        .setScale(2)
        .refreshBody();

    platforms
        .create(625, 14865, "ground")
        .setScale(2)
        .refreshBody();

    platforms
        .create(650, 14865, "ground")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(655, 14755, "asset1")
        .setScale(2);


    platforms
        .create(375, 14805, "platform2")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(80, 14668, "plant")
        .setScale(2);


    platforms
        .create(60, 14700, "ground")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(650, 14387, "cliff2")
        .setScale(2);


    platforms
        .create(650, 14220, "cliff-green-top")
        .setScale(2)
        .refreshBody();

    platforms
        .create(200, 14450, "platform2")
        .setScale(2)
        .refreshBody();

    platforms
        .create(400, 14380, "platform2")
        .setScale(2)
        .refreshBody();

    platforms
        .create(190, 14280, "platform2")
        .setScale(2)
        .refreshBody();

    platforms
        .create(400, 14210, "platform2")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(700, 14010, "cliff2")
        .setScale(2);


    platforms
        .create(700, 13850, "cliff-green-top")
        .setScale(2)
        .refreshBody();

    platforms
        .create(200, 14100, "platform2")
        .setScale(2)
        .refreshBody();

        platforms
        .create(100, 14000, "platform2")
        .setScale(2)
        .refreshBody();

          platforms
        .create(230, 13880, "platform2")
        .setScale(2)
        .refreshBody();

          platforms
        .create(300, 13730, "platform2")
        .setScale(2)
        .refreshBody();

       

         platforms
        .create(950, 13830, "platform2")
        .setScale(2)
        .refreshBody();

         platforms
        .create(1150, 13730, "platform2")
        .setScale(2)
        .refreshBody();

         platforms
        .create(1380, 13830, "platform2")
        .setScale(2)
        .refreshBody();

         platforms
        .create(1530, 13930, "platform2")
        .setScale(2)
        .refreshBody();


        //Platforms leading up to Jungle Heights

        platforms
        .create(160, 13600, "platform2")
        .setScale(2)
        .refreshBody();

        platforms
        .create(300, 13500, "platform2")
        .setScale(2)
        .refreshBody();


        platforms
        .create(190, 13400, "platform2")
        .setScale(2)
        .refreshBody();

        platforms
        .create(310, 13290, "platform2")
        .setScale(2)
        .refreshBody();

        platforms
    .create(180, 13180, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(300, 13070, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(190, 12960, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(310, 12850, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(180, 12740, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(300, 12630, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(190, 12520, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(310, 12400, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(200, 12300, "platform2")
    .setScale(2)
    .refreshBody();

platforms
    .create(400, 12300, "platform2")
    .setScale(2)
    .refreshBody();


    // =========================
    // BRIDGE
    // =========================

    platforms
        .create(930, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(1160, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(1390, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(1620, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(1850, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(2080, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(2310, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(2540, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(2770, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(3000, 14200, "bridge")
        .setScale(2)
        .refreshBody();

    platforms
        .create(3230, 14200, "bridge")
        .setScale(2)
        .refreshBody();


    // =========================
    // NEFI VILLAGE PLATFORMS
    // =========================

    platforms
        .create(3700, 14217, "nefi-platform1")
        .setScale(2)
        .setDepth(10)
        .refreshBody();

    platforms
        .create(3630, 13420, "platform3")
        .setScale(2)
        .refreshBody();

    platforms
        .create(3625, 13700, "nefi-platform1")
        .setScale(2)
        .refreshBody().setDepth(10);

        platforms
        .create(4410, 13420, "nefi-platform1")
        .setScale(2)
        .refreshBody().setDepth(10);

        platforms.create(4500, 14217, "nefi-platform1").setScale(2).refreshBody().setDepth(10);

        platforms.create(
            4500, 13700,
            "nefi-platform1"
        ).setScale(2).refreshBody().setDepth(10);


    // =========================
    // MORE PLATFORMS
    // =========================

    platforms
        .create(25, 15250, "ground")
        .setScale(2)
        .refreshBody();

    platforms
        .create(650, 15150, "ground")
        .setScale(2)
        .refreshBody();

    platforms
        .create(350, 14570, "platform2")
        .setScale(2)
        .refreshBody();

    platforms
        .create(650, 14595, "ground")
        .setScale(2)
        .refreshBody();

   

    }



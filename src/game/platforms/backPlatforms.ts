import Phaser from "phaser";

export function createBackPlatforms(scene: Phaser.Scene) {
    scene.platforms = scene.physics.add.staticGroup();


    
    scene.add
        .image(600, 15544, "cliff-bottom")
        .setScale(2);

    const cliff = scene.platforms
        .create(20, 15550, "cliff1")
        .setScale(2)
        .refreshBody();

    cliff.body.setSize(478, 30);
    cliff.body.setOffset(0, 0);


    scene.add
        .image(680, 15650, "palm-tree")
        .setScale(2);

    scene.platforms
        .create(400, 15950, "ground")
        .setScale(6)
        .refreshBody();

    scene.platforms
        .create(420, 15750, "ground")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(420, 15600, "platform2")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(300, 15360, "platform2")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(50, 15797, "sodamachine")
        .setScale(2);


    const cliff2 = scene.platforms
        .create(600, 15300, "cliff1")
        .setScale(2)
        .refreshBody()
        .setFlipX(true);

    cliff2.body.setSize(478, 30);
    cliff2.body.setOffset(0, 0);


    const cliff3 = scene.platforms
        .create(80, 15000, "cliff1")
        .setScale(2)
        .refreshBody();

    cliff3.body.setSize(478, 30);
    cliff3.body.setOffset(0, 0);


    scene.add
        .image(330, 14835, "palm-tree")
        .setFlipX(true);


    scene.platforms
        .create(300, 15080, "platform2")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(385, 15080, "platform2")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(625, 14865, "ground")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(650, 14865, "ground")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(655, 14755, "asset1")
        .setScale(2);


    scene.platforms
        .create(375, 14805, "platform2")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(80, 14668, "plant")
        .setScale(2);


    scene.platforms
        .create(60, 14700, "ground")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(650, 14387, "cliff2")
        .setScale(2);


    scene.platforms
        .create(650, 14210, "cliff-green-top")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(200, 14450, "platform2")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(400, 14380, "platform2")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(190, 14280, "platform2")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(400, 14210, "platform2")
        .setScale(2)
        .refreshBody();


    scene.add
        .image(700, 14010, "cliff2")
        .setScale(2);


    scene.platforms
        .create(700, 13850, "cliff-green-top")
        .setScale(2)
        .refreshBody();

    scene.platforms
        .create(200, 14100, "platform2")
        .setScale(2)
        .refreshBody();


}
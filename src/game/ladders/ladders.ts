import Phaser from "phaser";

// =========================
// CREATE LADDERS
// =========================

export function createLadders(
    scene: Phaser.Scene
): Phaser.Physics.Arcade.StaticGroup {

    const ladders =
        scene.physics.add.staticGroup();

    // Nefi Village ladder
    ladders
        .create(
            4065,
            13935,
            "nefi-ladder"
        )
        .setScale(2)
        .refreshBody();

    // Second ladder
    ladders
        .create(
            3970,
            13530,
            "nefi-ladder2"
        )
        .setScale(2)
        .refreshBody();

    return ladders;
}


// =========================
// UPDATE LADDER MOVEMENT
// =========================

export function updateLadders(
    scene: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite,
    ladders: Phaser.Physics.Arcade.StaticGroup,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    onLadder: boolean
): boolean {

    let touchingLadder = false;


    // =========================
    // LADDER DETECTION
    // =========================

    scene.physics.overlap(
        player,
        ladders,
        () => {

            touchingLadder = true;

        }
    );


    // =========================
    // START CLIMBING
    // =========================

    if (
        touchingLadder &&
        (cursors.up.isDown ||
            cursors.down.isDown) &&
        !onLadder
    ) {

        onLadder = true;

    }


    // =========================
    // STOP CLIMBING
    // =========================

    if (
        onLadder &&
        !touchingLadder
    ) {

        onLadder = false;

        player.body.allowGravity = true;

    }


    // =========================
    // LADDER MOVEMENT
    // =========================

    if (onLadder) {

        player.body.allowGravity = false;

        player.setVelocityX(0);


        // =========================
        // CLIMBING ANIMATION
        // =========================

        if (
            cursors.up.isDown ||
            cursors.down.isDown
        ) {

            player.anims.play(
                "ladder-climb-animation",
                true
            );

        }

        else {

            player.anims.stop();

            player.setTexture(
                "ladder-climb-animation",
                0
            );

        }


        // =========================
        // JUMP LEFT
        // =========================

        if (cursors.left.isDown) {

            onLadder = false;

            player.body.allowGravity = true;

            player.setTexture("girl");

            player.setVelocityX(-160);

            player.setVelocityY(-100);

            player.anims.play(
                "left",
                true
            );

        }


        // =========================
        // JUMP RIGHT
        // =========================

        else if (cursors.right.isDown) {

            onLadder = false;

            player.body.allowGravity = true;

            player.setTexture("girl");

            player.setVelocityX(160);

            player.setVelocityY(-100);

            player.anims.play(
                "right",
                true
            );

        }


        // =========================
        // CLIMB UP / DOWN
        // =========================

        else if (cursors.up.isDown) {

            player.setVelocityY(-140);

        }

        else if (cursors.down.isDown) {

            player.setVelocityY(140);

        }

        else {

            player.setVelocityY(0);

        }

    }

    else {

        player.body.allowGravity = true;

    }


    // Return whether player is on ladder
    return onLadder;
}
import Phaser from "phaser";

export function createDiscs(scene: Phaser.Scene) {

    scene.discs = scene.physics.add.group();

    // =========================
    // BEGINNING PLATFORM CDs
    // =========================

    const beginningDiscLocations = [
        // Manually placed CDs
        { x: 150, y: 15830, static: true },
        { x: 300, y: 15650, static: true },
        { x: 400, y: 15559},
        { x: 500, y: 15680},
        { x: 161, y: 15466, static: true },
        { x: 279, y: 15319, static: true },
        { x: 87, y: 15192, static: true },
        
        { x: 380, y: 15039, static: true },
        { x: 604, y: 15092, static: true },
        { x: 172, y: 14916, static: true },
        { x: 364, y: 14764, static: true },


         { x: 588, y: 14807, static: true }, 
         { x: 412, y: 14647, static: true }, 
         { x: 341, y: 14529, static: true },
        {x: 950, y: 13800, static: true},
        {x: 1150, y: 13690, static: true},
        {x: 1380, y: 13800, static: true},
        {x: 1530, y: 13890, static: true},


        // Gravity CDs
        { x: 750, y: 14950 },
        { x: 900, y: 14850 },
        { x: 1050, y: 14750 },

        { x: 1250, y: 14600 },
        { x: 1400, y: 14500 },
        { x: 1550, y: 14400 }
    ];

    // =========================
    // BRIDGE CDs
    // =========================

    const bridgeDiscLocations = [
        { x: 500, y: 13750 },
        { x: 650, y: 13650 },
        { x: 800, y: 13750 },

        { x: 1050, y: 13550 },
        { x: 1200, y: 13450 },
        { x: 1350, y: 13550 },

        { x: 1600, y: 13350 },
        { x: 1750, y: 13250 },
        { x: 1900, y: 13350 },

        { x: 2150, y: 13150 },
        { x: 2300, y: 13050 },
        { x: 2450, y: 13150 },

        { x: 2700, y: 13300 },
        { x: 2850, y: 13400 },
        { x: 3000, y: 13300 }
    ];

    // =========================
    // CREATE CDs
    // =========================

    const allDiscLocations = [
        ...beginningDiscLocations,
        ...bridgeDiscLocations
    ];

    allDiscLocations.forEach(({ x, y, static: isStatic }) => {

        const disc = scene.discs.create(
            x,
            y,
            "disc"
        ) as Phaser.Physics.Arcade.Sprite;

        disc.setScale(2);

        // =========================
        // MANUALLY PLACED CD
        // =========================

        if (isStatic) {

            disc.body.allowGravity = false;

            disc.setImmovable(true);

            disc.setVelocity(0, 0);

        }

        // =========================
        // GRAVITY CD
        // =========================

        else {

            disc.setBounceY(
                Phaser.Math.FloatBetween(0.4, 0.8)
            );

        }

        // =========================
        // CD SHINE
        // =========================

        disc.postFX.addShine(
            1,
            0.5,
            3,
            false
        );
    });
}
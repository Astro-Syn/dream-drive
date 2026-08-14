import Phaser from "phaser";

export function createNefiSignAnimations(scene: Phaser.Scene){
    
        scene.anims.create({
                key: "lg-sign",
                frames:scene.anims.generateFrameNumbers(
                    "nefi-village-large-sign-sprite",
                    {
                        start: 0,
                        end: 29
                    }
                ),
                frameRate: 8,
                repeat: -1
            });
    
        scene.anims.create({
                key: "flash-sign2",
                frames:scene.anims.generateFrameNumbers(
                    "nefi-village-screen2",
                    {
                        start: 0,
                        end: 14
                    }
                ),
                frameRate: 8,
                repeat: -1
            });

        scene.anims.create({
            key: "store-sprite",
            frames: scene.anims.generateFrameNumbers("store-sprite",
                {
                    start: 0,
                    end: 8
                }
            ),
            frameRate: 12,
            repeat: -1 

        });

        scene.anims.create({
            key: "store-sprite2",
            frames: scene.anims.generateFrameNumbers("store-sprite2",
                {
                    start: 0,
                    end: 5
                }
            ),
            frameRate: 6,
            repeat: -1
        });
}
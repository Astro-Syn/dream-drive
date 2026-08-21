import Phaser from "phaser";

export function createBehindBridgeTrees(scene: Phaser.Scene) {

     scene.add.image(2800, 14300, "nefi-bg-tree").setScale(2);
    
               scene.add.image(3200, 14900, "nefi-bg-tree").setScale(2);
    
               scene.add.image(2000, 14700, "nefi-bg-tree").setScale(1.5);
    
               scene.add.image(2500, 14200, "nefi-bg-tree").setScale(2);
            
               scene.add.image(1800, 14100, "nefi-bg-tree").setScale(2);
    
               scene.add.image(1900, 14200, "nefi-bg-tree").setScale(3);
    
               scene.add.image(3100, 14800, "nefi-bg-tree").setScale(1.5);
    
               scene.add.image(3000, 14600, "nefi-bg-tree").setScale(3);
    
                scene.add.image(3050, 14900, "nefi-bg-tree").setScale(1.4);
    
                scene.add.image(1600, 14300, "nefi-bg-tree").setScale(2);
    
                scene.add.image(2300, 14450, "nefi-bg-tree").setScale(1.3);
    
                   scene.add
                .image(1050, 14150, "diving-tree")
                .setScale(3);

                scene.add.image(3300, 14100, "nefi-bg-tree").setScale(3);

                  scene.add.image(3670, 13900, "nefi-walls").setScale(2);


                  //star twinkle on bridge

            scene.anims.create({
                key: "star-twinkle-animation",
                frames: scene.anims.generateFrameNumbers("star-twinkle-animation",
                    {
                        start: 0,
                        end: 5
                    }
                ),
                frameRate: 6,
                repeat: -1
            })

            const starAnimation = scene.add.sprite(
                2100, 
                14050,
                "star-twinkle-animation"
            )

            starAnimation.setScale(2).play("star-twinkle-animation")
            

}
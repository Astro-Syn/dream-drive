import Phaser from "phaser";

export function createNefiDecos(scene: Phaser.Scene) {

    
            scene.add
                .image(3770, 14410, "nefi-walls")
                .setScale(2);
    

      

            scene.add
                .image(3775, 14150, "wall-pipes")
                .setScale(2);
    
            const nefiSignLg = scene.add.sprite(
                3730,
                13810,
                "nefi-village-large-sign-sprite"
            );
    
            nefiSignLg
                .setScale(2)
                .play("lg-sign");
    
    
            scene.add.image(3790, 13280, "cyber-farm-house").setScale(2);
    
    
            const storeSign = scene.add.sprite(3790, 13295, 
                "store-sprite"
            );
    
            storeSign.setScale(2.2).play("store-sprite");
    
            const storeSign2 = scene.add.sprite(3645, 13300, 
                "store-sprite2"
            );
    
            storeSign2.setScale(2).play("store-sprite2");

            scene.add.image(4390, 14070,
                "nefi-windows"
            ).setScale(1.7);

            scene.add.image(
                4300, 13560, 
                "nefi-windows" 
            ).setScale(1.5);
            
            // NEON LIGHTING
           
            const topGlow = scene.add.rectangle(
                3700,
                13960,
                600,
                200,
                0xff00ff,
                0.18
            ).setOrigin(0.5, 0);
    
            scene.tweens.add({
                targets: topGlow,
                alpha: 0.25,
                duration: 2500,
                yoyo: true,
                repeat: -1
            });
    
            const bottomGlow = scene.add.rectangle(
                3750,
                14430,
                600,
                250,
                0xff33cc,
                0.15
            ).setOrigin(0.5, 1);
    
            scene.tweens.add({
                targets: bottomGlow,
                alpha: 0.25,
                duration: 2500,
                yoyo: true,
                repeat: -1
            });
    
          
    
    
            // NEFI VILLAGE DECORATIONS
    
            scene.add
                .image(3720, 13895, "pipe")
                .setScale(2).setDepth(10);
    
            scene.add
                .image(3450, 14080, "house1")
                .setScale(2)
                .setTint(0x00ff88);
    
            scene.add
                .image(3900, 14080, "house2")
                .setScale(2);
    
            const nefiSign2 = scene.add.sprite(
                3690,
                14130,
                "nefi-village-screen2"
            );
    
            nefiSign2
                .setScale(2)
                .play("flash-sign2");
    
            scene.add
                .image(3160, 13510, "palm-tree")
                .setScale(1.5);
    
            scene.add
            .image(3910, 13730, 
                'nefi-vine1'
            ).setScale(2).setDepth(11);
    
            scene.add
            .image(3270, 13735,
                'nefi-vine2'
            ).setScale(2).setDepth(10);
    
            scene.add.image(3230, 13728,
                'nefi-vine2'
            ).setScale(1.9);
    
            scene.add.image(3360, 13650, 
                'nefi-mailbox'
            ).setScale(2);

            scene.add.image(4050, 13550, 
                "nefi-walls-sm"
            ).setScale(2);

            scene.add.image(4700, 13550, 
                "nefi-walls-lg"
            ).setScale(2)

            scene.add.image(4281, 13810, 
                "nefi-walls-lg"
            ).setScale(2)

            scene.add.image(4620, 13810, 
                "nefi-walls-lg"
            ).setScale(2);

            scene.add.image(4745, 14075, "nefi-walls-sm").setScale(2);
}
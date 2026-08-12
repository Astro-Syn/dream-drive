import Phaser from "phaser";

export function createDecorations(scene: Phaser.Scene) {
    
        scene.add
            .image(650, 14182, "cliff-grass")
            .setScale(2);

        scene.add
            .image(30, 14680, "plant")
            .setScale(2);

        scene.add
            .image(20, 15562, "vines-grass")
            .setScale(2);

        scene.add
            .image(600, 15310, "vines-grass")
            .setScale(2)
            .setFlipX(true);

        scene.add
            .image(73, 15017, "vines-grass")
            .setScale(2);

        scene.add
            .image(50, 14900, "palm-tree")
            .setScale(2)
            .setFlipX(true);

        scene.add
            .image(740, 15820, "bush")
            .setScale(4);

        scene.add
            .image(685, 15820, "bush")
            .setScale(2);

        scene.add
            .image(705, 15830, "bush")
            .setScale(3);

        scene.add
            .image(665, 15820, "bush")
            .setScale(2);

        scene.add
            .image(720, 15825, "bush")
            .setScale(3);

      
        scene.add
            .image(800, 14190, "plant")
            .setScale(2);

}
import Phaser from "phaser";

let currentMusic: Phaser.Sound.BaseSound | null = null;

export function playMusic(
    scene: Phaser.Scene,
    key: string
) {
    
    if (currentMusic) {
        currentMusic.stop();
        currentMusic.destroy();
        currentMusic = null;
    }

    
    currentMusic = scene.sound.add(key, {
        loop: true,
        volume: 0.5
    });

    currentMusic.play();

    return currentMusic;
}

export function stopMusic() {
    if (currentMusic) {
        currentMusic.stop();
        currentMusic.destroy();
        currentMusic = null;
    }
}
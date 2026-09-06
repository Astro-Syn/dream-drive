import Phaser from "phaser";

export function playMusic(scene: Phaser.Scene, key: string) {

    const music = scene.sound.add(key, {
        loop: true,
        volume: 0.5
    });

    music.play();

    return music;
}
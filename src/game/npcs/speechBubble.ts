import Phaser from "phaser";

export function createSpeechBubble(
    scene: Phaser.Scene,
    npc: Phaser.GameObjects.Sprite
) {
    

    const textObject = scene.add.text(
        0,
        0,
        "",
        {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#ffffff",
            wordWrap: {
                width: 180
            },
            align: "center"
        }
    );

    textObject.setOrigin(0.5);

    const bubble = scene.add.rectangle(
        0,
        0,
        200,
        50,
        0x0B0B0D,
        0.9
    );

    bubble.setStrokeStyle(
        2,
        0x00ff9f
    );

    const pointer = scene.add.triangle(
        0,
        32,
        0,
        0,
        16,
        0,
        8,
        10,
        0x111122
    );

    const speechBubble = scene.add.container(
        npc.x,
        npc.y - 10
    );

    speechBubble.add([
        bubble,
        textObject,
        pointer
    ]);

    speechBubble.setDepth(1000);

    speechBubble.setVisible(false);

    return {
        container: speechBubble,
        text: textObject
    };
}
import Phaser from "phaser";
import { alienNpcDialogue } from "./dialogue/alienNpcDialogue";
import { createSpeechBubble } from "./speechBubble";


let dialogueGroup = 0;
let dialogueLine = 0;


export function createAlienNpc2(scene: Phaser.Scene) {

    // ALIEN NPC ANIMATIONS

    // Walk left
    scene.anims.create({
        key: "alien-npc2-walk-left",
        frames: scene.anims.generateFrameNumbers(
            "alien-npc2",
            {
                start: 0,
                end: 3
            }
        ),

        frameRate: 6,
        repeat: -1
    });


    // Walk right
    scene.anims.create({

        key: "alien-npc2-walk-right",

        frames: scene.anims.generateFrameNumbers(
            "alien-npc2",
            {
                start: 4,
                end: 7
            }
        ),

        frameRate: 6,
        repeat: -1
    });


    // CREATE NPC

    const alienNpc = scene.physics.add.sprite(
        4225,
        14167,
        "alien-npc2"
    );

    alienNpc.setScale(3);

    alienNpc.body.setSize(16, 16);

    alienNpc.body.setOffset(1, 2);


    // SPEECH BUBBLE

    const speechBubble = createSpeechBubble(
        scene,
        alienNpc
    );

    alienNpc.setData("speechBubble", speechBubble);


    speechBubble.text.setText(
        alienNpcDialogue[dialogueGroup][dialogueLine]
    );

    speechBubble.container.setVisible(true);


    function showNextDialogue() {

        dialogueLine++;

        if (
            dialogueLine >=
            alienNpcDialogue[dialogueGroup].length
        ) {

            dialogueLine = 0;

            dialogueGroup++;

            if (
                dialogueGroup >=
                alienNpcDialogue.length
            ) {

                dialogueGroup = 0;
            }
        }

        speechBubble.text.setText(
            alienNpcDialogue[dialogueGroup][dialogueLine]
        );


        const nextDelay = Phaser.Math.Between(
            2500,
            5000
        );

        scene.time.delayedCall(
            nextDelay,
            showNextDialogue
        );
    }

    scene.time.delayedCall(
        4000,
        showNextDialogue
    );


    // START WALKING RIGHT

    alienNpc.setVelocityX(40);

    alienNpc.anims.play(
        "alien-npc2-walk-right",
        true
    );


    return alienNpc;
}


export function updateAlienNpc2(
    alienNpc: Phaser.Physics.Arcade.Sprite
) {

    const speechBubble =
        alienNpc.getData("speechBubble");


    if (speechBubble) {

        speechBubble.container.setPosition(
            alienNpc.x,
            alienNpc.y - 60
        );
    }


    // REACHED THE RIGHT SIDE

    if (alienNpc.x >= 4600) {

        alienNpc.setVelocityX(-40);
        alienNpc.setFlipX(false);

        if (
            alienNpc.anims.currentAnim?.key !==
            "alien-npc2-walk-left"
        ) {

            alienNpc.anims.play(
                "alien-npc2-walk-left",
                true
            );
        }
    }


    // REACHED THE LEFT SIDE

    else if (alienNpc.x <= 4350) {

        alienNpc.setVelocityX(40);

        alienNpc.setFlipX(false);

        if (
            alienNpc.anims.currentAnim?.key !==
            "alien-npc2-walk-right"
        ) {

            alienNpc.anims.play(
                "alien-npc2-walk-right",
                true
            );
        }
    }
}
import Phaser from "phaser";

import { alienNpcDialogue } from "./dialogue/alienNpcDialogue";

import { createSpeechBubble } from "./speechBubble";


let dialogueGroup = 0;
let dialogueLine = 0;


export function createJhNpc(scene: Phaser.Scene) {

    // ALIEN NPC ANIMATIONS

    // Walk left
    scene.anims.create({
        key: "jh-npc-walk-left",
        frames: scene.anims.generateFrameNumbers(
            "jungle-heights-npc",
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

        key: "jh-npc-walk-right",

        frames: scene.anims.generateFrameNumbers(
            "jungle-heights-npc",
            {
                start: 4,
                end: 7
            }
        ),

        frameRate: 6,
        repeat: -1
    });


    // CREATE NPC

    const jhNpc = scene.physics.add.sprite(
        400,
        265,
        "jungle-heights-npc"
    );

    jhNpc.setScale(3);

    jhNpc.body.setSize(16, 16);

    jhNpc.body.setOffset(1, 2);


    // SPEECH BUBBLE

    const speechBubble = createSpeechBubble(
        scene,
        jhNpc
    );

    jhNpc.setData("speechBubble", speechBubble);


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

    jhNpc.setVelocityX(40);

    jhNpc.anims.play(
        "jh-npc-walk-right",
        true
    );


    return jhNpc;
}


export function updateJhNpc(
    jhNpc: Phaser.Physics.Arcade.Sprite
) {

    const speechBubble =
        jhNpc.getData("speechBubble");


    if (speechBubble) {

        speechBubble.container.setPosition(
            jhNpc.x,
            jhNpc.y - 60
        );
    }


    // REACHED THE RIGHT SIDE

    if (jhNpc.x >= 4600) {

        jhNpc.setVelocityX(-40);
        jhNpc.setFlipX(false);

        if (
            jhNpc.anims.currentAnim?.key !==
            "jh-npc-walk-left"
        ) {

            jhNpc.anims.play(
                "jh-npc-walk-left",
                true
            );
        }
    }


    // REACHED THE LEFT SIDE

    else if (jhNpc.x <= 4350) {

        jhNpc.setVelocityX(40);

        jhNpc.setFlipX(false);

        if (
            jhNpc.anims.currentAnim?.key !==
            "jh-npc-walk-right"
        ) {

            jhNpc.anims.play(
                "jh-npc-walk-right",
                true
            );
        }
    }
}
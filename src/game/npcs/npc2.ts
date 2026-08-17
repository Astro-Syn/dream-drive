import Phaser from "phaser";
import { npc2Dialogue } from "./dialogue/npc2Dialogue";
import { createSpeechBubble } from "./speechBubble";


let dialogueGroup = 0;
let dialogueLine = 0;


export function createNPC2(scene: Phaser.Scene) {


    // OLD LADY NPC ANIMATIONS

    // Walk left
    scene.anims.create({
        key: "old-lady-walk-left",
        frames: scene.anims.generateFrameNumbers(
            "old-lady-npc",
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
        key: "old-lady-walk-right",
        frames: scene.anims.generateFrameNumbers(
            "old-lady-npc",
            {
                start: 4,
                end: 7
            }
        ),
        frameRate: 6,
        repeat: -1
    });


   

    const npc = scene.physics.add.sprite(
        3625,
        13250,
        "old-lady-npc"
    );

    npc.setScale(3);

    npc.body.setSize(16, 15);
    npc.body.setOffset(1, 2);


    

    const speechBubble = createSpeechBubble(
        scene,
        npc
    );

    npc.setData("speechBubble", speechBubble);


   
    speechBubble.text.setText(
        npc2Dialogue[dialogueGroup][dialogueLine]
    );

    speechBubble.container.setVisible(true);


   

    function showNextDialogue() {

        dialogueLine++;

        if (
            dialogueLine >=
            npc2Dialogue[dialogueGroup].length
        ) {

            dialogueLine = 0;
            dialogueGroup++;

            if (
                dialogueGroup >=
                npc2Dialogue.length
            ) {
                dialogueGroup = 0;
            }
        }

        speechBubble.text.setText(
            npc2Dialogue[dialogueGroup][dialogueLine]
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
        3000,
        showNextDialogue
    );


    // START WALKING RIGHT

    npc.setVelocityX(50);

    npc.anims.play(
        "old-lady-walk-right",
        true
    );


    return npc;
}


export function updateNPC2(
    npc: Phaser.Physics.Arcade.Sprite
) {


    // MAKE SPEECH BUBBLE FOLLOW NPC

    const speechBubble = npc.getData("speechBubble");

    if (speechBubble) {

        speechBubble.container.setPosition(
            npc.x,
            npc.y - 60
        );
    }


    // NPC MOVEMENT

    if (npc.x >= 3710) {

        npc.setVelocityX(-50);
        npc.setFlipX(false);

        if (
            npc.anims.currentAnim?.key !==
            "old-lady-walk-left"
        ) {

            npc.anims.play(
                "old-lady-walk-left",
                true
            );
        }
    }


    else if (npc.x <= 3500) {

        npc.setVelocityX(40);
        npc.setFlipX(false);

        if (
            npc.anims.currentAnim?.key !==
            "old-lady-walk-right"
        ) {

            npc.anims.play(
                "old-lady-walk-right",
                true
            );
        }
    }
}
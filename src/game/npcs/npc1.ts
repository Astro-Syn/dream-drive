import Phaser from "phaser";
import { npc1Dialogue } from "./dialogue/npc1Dialogue";
import { createSpeechBubble } from "./speechBubble";


let dialogueGroup = 0;
let dialogueLine = 0;

export function createNPC1(scene: Phaser.Scene) {

    // OLD MAN NPC ANIMATIONS
     
    // Walk left
    scene.anims.create({
        key: "old-man-walk-left",
        frames: scene.anims.generateFrameNumbers(
            "old-man-npc",
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
        key: "old-man-walk-right",
        frames: scene.anims.generateFrameNumbers(
            "old-man-npc",
            {
                start: 4,
                end: 7
            }
        ),
        frameRate: 6,
        repeat: -1
    });



    // CREATE NPC
   
    const npc = scene.physics.add.sprite(
        3625,
        13560,
        "old-man-npc"
    );

    npc.setScale(3);

    npc.body.setSize(16, 16);
    npc.body.setOffset(1, 2);

    //speech bubble

    const speechBubble = createSpeechBubble(
    scene,
    npc,
    
);

npc.setData("speechBubble", speechBubble);



speechBubble.text.setText(npc1Dialogue[dialogueGroup][dialogueLine]);
speechBubble.container.setVisible(true);

function showNextDialogue() {

    dialogueLine++;

    if (
        dialogueLine >=
        npc1Dialogue[dialogueGroup].length
    ) {
        dialogueLine = 0;
        dialogueGroup++;

        if (
            dialogueGroup >=
            npc1Dialogue.length
        ) {
            dialogueGroup = 0;
        }
    }

    speechBubble.text.setText(
        npc1Dialogue[dialogueGroup][dialogueLine]
    );

  
    const nextDelay = Phaser.Math.Between(2500, 5000);

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
    

    npc.setVelocityX(40);

    npc.anims.play(
        "old-man-walk-right",
        true
    );


    return npc;
}


export function updateNPC1(
    npc: Phaser.Physics.Arcade.Sprite
) 

{

     const speechBubble = npc.getData("speechBubble");

    if (speechBubble) {
        speechBubble.container.setPosition(
            npc.x,
            npc.y - 60
        );
    }

    if (npc.x >= 3700) {

        npc.setVelocityX(-40);
        npc.setFlipX(false);

        if (
            npc.anims.currentAnim?.key !==
            "old-man-walk-left"
        ) {
            npc.anims.play(
                "old-man-walk-left",
                true
            );
        }
    }

    else if (npc.x <= 3500) {

        npc.setVelocityX(40);
        npc.setFlipX(false);

        if (
            npc.anims.currentAnim?.key !==
            "old-man-walk-right"
        ) {
            npc.anims.play(
                "old-man-walk-right",
                true
            );
        }
    }
}
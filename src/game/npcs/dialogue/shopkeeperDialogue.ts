import Phaser from "phaser";

import { createSpeechBubble } from "../speechBubble";
import { playerInventory } from "../../../items/playerInventory";

export function createShopkeeperDialogue(
    scene: Phaser.Scene,
    npc: Phaser.GameObjects.Sprite
) {

    const bubble = createSpeechBubble(scene, npc);

    let active = false;

    let yesKey!: Phaser.Input.Keyboard.Key;
    let noKey!: Phaser.Input.Keyboard.Key;

    function updateBubble() {

        bubble.container.setPosition(
            npc.x,
            npc.y - 55
        );
    }

    function closeDialogue() {

        active = false;

        bubble.container.setVisible(false);

        yesKey.removeAllListeners();
        noKey.removeAllListeners();

        scene.registry.set(
            "shopkeeperTalking",
            false
        );
    }

    function startDialogue(
        player: Phaser.Physics.Arcade.Sprite,
        getScore: () => number,
        spendScore: (amount: number) => void
    ) {

        if (active) return;

        active = true;

        scene.registry.set(
            "shopkeeperTalking",
            true
        );

        player.setVelocity(0, 0);

        bubble.container.setVisible(true);

        bubble.text.setText(
            "Are you ready to buy the key\nthat gets you to the next area?\n\n[Y] YES    [N] NO"
        );

        yesKey = scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.Y
        );

        noKey = scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.N
        );

        yesKey.once("down", () => {

            if (playerInventory.hasNefiKey) {

                bubble.text.setText(
                    "You already own the Nefi Key."
                );

                scene.time.delayedCall(
                    1500,
                    closeDialogue
                );

                return;
            }

            if (getScore() >= 400) {

                spendScore(400);

                playerInventory.hasNefiKey = true;

                bubble.text.setText(
                    "Excellent!\nHere is your Nefi Key."
                );

                scene.time.delayedCall(
                    1800,
                    closeDialogue
                );

            } else {

                bubble.text.setText(
                    "Sorry!\nYou need at least 400 Drive Score."
                );

                scene.time.delayedCall(
                    1800,
                    closeDialogue
                );
            }
        });

        noKey.once("down", () => {

            bubble.text.setText(
                "Maybe another time."
            );

            scene.time.delayedCall(
                1200,
                closeDialogue
            );
        });
    }

    return {
        startDialogue,
        updateBubble
    };
}
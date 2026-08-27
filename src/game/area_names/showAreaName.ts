import Phaser from "phaser";

export function showAreaName(
    scene: Phaser.Scene,
    name: string
) {
    const { width, height } = scene.scale;

    const container = scene.add.container(
        width / 2,
        height - 90
    );

    console.log("AREA BANNER CREATED:", name);

    container.setScrollFactor(0);

    
    container.setDepth(1000);


    // =========================
    // BACKGROUND
    // =========================

    const background = scene.add.rectangle(
        0,
        0,
        380,
        76,
        0x071a1a,
        0.94
    );


    
    // OUTER BORDER
  

    const border = scene.add.rectangle(
        0,
        0,
        380,
        76
    );

    border.setStrokeStyle(
        3,
        0x66ffcc,
        1
    );


    
    // INNER BORDER
   

    const innerBorder = scene.add.rectangle(
        0,
        0,
        366,
        62
    );

    innerBorder.setStrokeStyle(
        1,
        0x66ffcc,
        0.5
    );


  
    // AREA NAME
   

    const text = scene.add.text(
        0,
        0,
        name,
        {
            fontFamily: "monospace",
            fontSize: "28px",
            color: "#66ffcc",
            stroke: "#000000",
            strokeThickness: 4
        }
    );

    text.setOrigin(0.5);


    // ADD TO CONTAINER
   

    container.add([
        background,
        border,
        innerBorder,
        text
    ]);



    container.setAlpha(0);

    scene.tweens.add({
        targets: container,
        alpha: 1,
        duration: 500,
        ease: "Power2"
    });




    scene.tweens.add({
        targets: container,
        alpha: 0,
        delay: 3500,
        duration: 800,
        ease: "Power2",

        onComplete: () => {
            container.destroy();
        }
    });


    return container;
}
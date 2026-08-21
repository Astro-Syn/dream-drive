import { useEffect } from 'react';
import Phaser from 'phaser';
import GameScene from './game/GameScene';
import TitleScreen from './titleScreen/TitleScreen';

function App() {

    useEffect(() => {

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,

            render: {
                pixelArt: true,
                antialias: false
            },

            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        x: 0,
                        y: 700
                    },
                    debug: false
                }
            },

            scene: [
                TitleScreen,
                GameScene
            ]
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };

    }, []);

    return <div id="game" />;
}

export default App;

import { Game } from './scenes/Game';
import Phaser from 'phaser';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    parent: 'game-container',
    backgroundColor: '#050d38',
    scene: [
        Game
    ]
};

const StartGame = () => {
    return new Phaser.Game(config);
}

export default StartGame;

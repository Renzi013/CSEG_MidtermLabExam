// Main Game Class
class Game {
    constructor() {
        this.currentScene = null;
        this.stats = {
            kindness: 0,
            practicality: 0
        };
        this.choices = [];
    }

    init() {
        this.ui = new UIManager();
        this.ui.init();
        console.log('Game initialized');
    }

    start() {
        this.loadScene('start');
    }

    loadScene(sceneId) {
        const scene = gameScenes[sceneId];
        if (!scene) {
            console.error(`Scene not found: ${sceneId}`);
            return;
        }

        this.currentScene = scene;
        this.choices.push(sceneId);

        // Check if this scene leads to an ending
        if (scene.ending) {
            setTimeout(() => {
                this.endGame(scene.ending);
            }, 1000);
        } else {
            this.ui.displayScene(scene);
        }
    }

    updateStats(newStats) {
        Object.keys(newStats).forEach(stat => {
            if (this.stats[stat] !== undefined) {
                this.stats[stat] += newStats[stat];
            }
        });
        console.log('Updated stats:', this.stats);
    }

    getStats() {
        return this.stats;
    }

    endGame(endingKey) {
        this.ui.showEnding(endingKey);
    }

    reset() {
        this.stats = {
            kindness: 0,
            practicality: 0
        };
        this.choices = [];
    }
}

// Initialize game when loaded
const game = new Game();
window.addEventListener('DOMContentLoaded', () => {
    game.init();
});
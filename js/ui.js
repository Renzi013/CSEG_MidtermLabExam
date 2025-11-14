// UI Management
class UIManager {
    constructor() {
        this.currentText = '';
        this.typewriterInterval = null;
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Start screen buttons
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showScreen('game-screen');
            game.start();
        });

        document.getElementById('instructions-btn').addEventListener('click', () => {
            this.showScreen('instructions-screen');
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            this.showScreen('start-screen');
        });

        // Restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.showScreen('start-screen');
            game.reset();
        });
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    displayScene(scene) {
        const characterElement = document.getElementById('character-info');
        const textElement = document.getElementById('dialogue-text');
        const choicesContainer = document.getElementById('choices-container');

        // Clear any existing typewriter effect
        if (this.typewriterInterval) {
            clearInterval(this.typewriterInterval);
        }

        // Set character name
        characterElement.textContent = scene.character;

        // Typewriter effect for dialogue
        this.currentText = scene.text;
        textElement.textContent = '';
        this.typeText(textElement, scene.text);

        // Clear previous choices
        choicesContainer.innerHTML = '';

        // Create new choice buttons
        if (scene.choices) {
            scene.choices.forEach(choice => {
                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.textContent = choice.text;
                button.addEventListener('click', () => {
                    if (choice.stats) {
                        game.updateStats(choice.stats);
                    }
                    game.loadScene(choice.next);
                });
                choicesContainer.appendChild(button);
            });
        }

        // Update stats display
        this.updateStatsDisplay();
    }

    typeText(element, text) {
        let index = 0;
        const speed = 30; // milliseconds per character

        this.typewriterInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(this.typewriterInterval);
            }
        }, speed);
    }

    updateStatsDisplay() {
        const stats = game.getStats();
        document.getElementById('kindness-stat').textContent = `Kindness: ${stats.kindness}`;
        document.getElementById('practicality-stat').textContent = `Practicality: ${stats.practicality}`;
    }

    showEnding(endingKey) {
        const ending = endings[endingKey];
        if (!ending) return;

        document.getElementById('ending-title').textContent = ending.title;
        document.getElementById('ending-description').textContent = ending.description;
        
        const statsList = document.getElementById('ending-stats-list');
        statsList.innerHTML = `<p>${ending.stats}</p>`;

        // Set ending image background based on ending type
        const endingImage = document.getElementById('ending-image');
        endingImage.style.background = this.getEndingGradient(endingKey);

        this.showScreen('ending-screen');
    }

    getEndingGradient(endingKey) {
        const gradients = {
            solitary: 'linear-gradient(45deg, #666666, #999999)',
            connection: 'linear-gradient(45deg, #4361ee, #4cc9f0)',
            friendly: 'linear-gradient(45deg, #4cc9f0, #7209b7)',
            helpful: 'linear-gradient(45deg, #3a86ff, #ff006e)',
            indifferent: 'linear-gradient(45deg, #8d99ae, #2b2d42)',
            generous: 'linear-gradient(45deg, #ff006e, #8338ec)',
            new_friendship: 'linear-gradient(45deg, #fb5607, #ffbe0b)'
        };
        return gradients[endingKey] || 'linear-gradient(45deg, #4361ee, #4cc9f0)';
    }
}
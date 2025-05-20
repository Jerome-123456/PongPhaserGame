const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#FFD700',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

let ball, paddleLeft, paddleRight, cursors, score = 0;

const game = new Phaser.Game(config);

function preload() {}

function create() {
    ball = this.physics.add.sprite(400, 300, null).setDisplaySize(15, 15).setTint(0xffffff);
 
    // Add rectangle paddles
    paddleLeft = this.add.rectangle(500, 300, 200, 100, 0xffffff);
    paddleRight = this.add.rectangle(750, 300, 200, 100, 0xffffff);
 
    // Enable physics
    this.physics.add.existing(paddleLeft, true);
    this.physics.add.existing(paddleRight, true);
 
    ball.setVelocity(200, 200);
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);
 
    this.physics.add.collider(ball, paddleLeft, () => score++);
    this.physics.add.collider(ball, paddleRight);
 
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.up.isDown) paddleLeft.y -= 5;
    else if (cursors.down.isDown) paddleLeft.y += 5;

    paddleLeft.body.updateFromGameObject();

    if (ball.x < 0 || ball.x > 800) {
        fetch('https://localhost:5001/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: 'Player1', points: score })
        });
        this.scene.restart();
    }
}

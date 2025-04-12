
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let packet = {
    x: 100,
    y: 300,
    width: 40,
    height: 40,
    dy: 0,
    gravity: 0.8,
    jumpPower: -12,
    color: '#0f0'
};

let obstacles = [];
let frame = 0;
let gameSpeed = 4;

function drawPacket() {
    ctx.fillStyle = packet.color;
    ctx.fillRect(packet.x, packet.y, packet.width, packet.height);
}

function drawObstacle(obstacle) {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updatePacket() {
    packet.dy += packet.gravity;
    packet.y += packet.dy;

    if (packet.y + packet.height > canvas.height) {
        packet.y = canvas.height - packet.height;
        packet.dy = 0;
    }
}

function createObstacle() {
    let height = Math.random() * 100 + 50;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height,
        width: 30,
        height: height,
        color: '#f00'
    });
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;
        drawObstacle(obs);
    }

    if (frame % 90 === 0) {
        createObstacle();
    }

    obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPacket();
    updatePacket();
    updateObstacles();

    frame++;
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && packet.y + packet.height >= canvas.height) {
        packet.dy = packet.jumpPower;
    }
});

gameLoop();

ctx = canvas.getContext('2d')

makeModal(document.querySelector(".my-modal"), {
    autoShow: 0.1
})

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    velocityX: 4.9,
    velocityY: 4.9
}

const firstPuddle = {
    x: 10,
    y: canvas.height / 2 - 100,
    width: 20,
    height: 200
}

const secondPuddle = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 100,
    width: 20,
    height: 200,
    velocityY: 10
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, 7)
    ctx.fill()
    drawPuddle(firstPuddle)
    drawPuddle(secondPuddle)
}

function moveBall() {
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    if (ball.x + ball.radius > canvas.width) {
        ball.velocityX *= -1
        firstPlayerScore.innerText++
    }

    else if (ball.x - ball.radius < 0) {
        ball.velocityX *= -1
        secondPlayerScore.innerText++
    }

    else if (ball.y + ball.radius > canvas.height ||
        ball.y - ball.radius < 0) {
        ball.velocityY *= -1
    }

    else if (ball.y > firstPuddle.y && ball.y < firstPuddle.y + firstPuddle.height &&
        ball.x - ball.radius < firstPuddle.x + firstPuddle.width ||
        ball.y > secondPuddle.y && ball.y < secondPuddle.y + secondPuddle.height &&
        ball.x + ball.radius > secondPuddle.x) {
        ball.velocityX *= -1
    }

    if (ball.x < firstPuddle.x + firstPuddle.width) {
        if (ball.y < firstPuddle.y && ball.y + ball.radius > firstPuddle.y ||
            ball.y > firstPuddle.y + firstPuddle.height && ball.y - ball.radius < firstPuddle.y + firstPuddle.height) {
            ball.velocityY *= -1
        }
    }

    if (ball.x > secondPuddle.x) {
        if (ball.y < secondPuddle.y && ball.y + ball.radius > secondPuddle.y ||
            ball.y > secondPuddle.y + secondPuddle.height && ball.y - ball.radius < secondPuddle.y + secondPuddle.height) {
            ball.velocityY *= -1
        }
    }

    if (ball.x > firstPuddle.x + firstPuddle.width) {
        if (ball.y < firstPuddle.y && ball.radius > 
            Math.hypot(firstPuddle.y - ball.y, ball.x - firstPuddle.x - firstPuddle.width) ||
            ball.y > firstPuddle.y + firstPuddle.height && ball.radius >
            Math.hypot(firstPuddle.y + firstPuddle.height - ball.y, ball.x - firstPuddle.x - firstPuddle.width)) {
            ball.velocityX *= -1
            ball.velocityY *= -1
        }
    }

    if (ball.x < secondPuddle.x) {
        if (ball.y < secondPuddle.y && ball.radius > 
            Math.hypot(secondPuddle.y - ball.y, ball.x - secondPuddle.x) ||
            ball.y > secondPuddle.y + secondPuddle.height && ball.radius >
            Math.hypot(secondPuddle.y + secondPuddle.height - ball.y, ball.x - secondPuddle.x)) {
            ball.velocityX *= -1
            ball.velocityY *= -1
        }
    }
}

function drawPuddle(puddle) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(puddle.x, puddle.y, puddle.width, puddle.height)
}

document.body.onkeydown = (e) => {
    if (e.key == "w" && firstPuddle.y > 0) {
        firstPuddle.y -= 5
    }

    if (e.key == "s" && firstPuddle.y + firstPuddle.height < canvas.height) {
        firstPuddle.y += 5
    }
}

function secondPlayer() {
    secondPuddle.y += secondPuddle.velocityY

    if (secondPuddle.y < 0 || secondPuddle.y + secondPuddle.height > canvas.height) {
        secondPuddle.velocityY *= -1
    }
}

ctx.arc(ball.x, ball.y, ball.radius, 0, 7)
ctx.fillStyle = "#ffffff"
ctx.fill()

drawPuddle(firstPuddle)
drawPuddle(secondPuddle)

startGame.onclick = () => {
    setInterval(render, 30)
    setInterval(moveBall, 30)
    setInterval(secondPlayer, 30)
    makeModal(document.querySelector(".my-modal"))
}
const presentation = document.querySelector('.presentation');
const counter = document.querySelector('.counter');
const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const gameField = document.querySelector('.game-container');
const pointsCounter = document.querySelector('.points-counter');


let gameRestarted = false

const fillGrid = (function () {

    function randomInteger(n) {
        return Math.floor(Math.random() * (n + 1))
    }

    let currentSize = 12;
    let shapes = 4;

    return function fill() {
        gameField.innerHTML = ''

        if(gameRestarted){
            currentSize = 12
            shapes = 4
            gameRestarted = false
        }

        let randomCells = [];
        while (randomCells.length < shapes) {
            let pos = randomInteger(currentSize)
            if (!randomCells.includes(pos)) {
                randomCells.push(pos)
            }
            //repeat above process till we have enough different indexes (for shapes)
            continue
        }

        let boxes = []
        for (let i = 0; i < currentSize; i++) {
            let box = document.createElement('div')
            box.classList.add('box')
            if (randomCells.includes(i)) box.classList.add('target')
            boxes.push(box)
        }

        //below logic for adjusting size
        if (currentSize < 24) currentSize += 4
        if (shapes < 16) shapes++;
    
        setTimeout(() => {
            boxes.forEach(box => {
                    //hide target color 
                if(box.classList.contains('target')) box.style.background = 'lightgray';
                box.onclick = checkShape
            })
        }, 1500)

        gameField.append(...boxes)
    }

})()

function startGame() {

    presentation.classList.add('hidden');
    counter.classList.remove('hidden');
    pointsCounter.textContent = 0;
    pointsCounter.classList.add('hidden');
    
    if(!gameRestarted) gameRestarted = true

    if (!restartButton.classList.contains('hidden')) {
        restartButton.classList.add('hidden')
    }

    let count = 3;
    counter.textContent = count

    let interval = setInterval(() => {
        count--
        counter.textContent = count
        if (count === 0) {
            counter.textContent = 'GO!'
            setTimeout(() => {
                counter.textContent = '';
                gameField.classList.remove('hidden')
                pointsCounter.classList.remove('hidden')
                fillGrid()
                gameCounter()
                clearInterval(interval)
            }, 1000)
        }

    }, 1000)

}

function gameCounter() {

    let countdown = 30
    counter.textContent = countdown
    let interval = setInterval(() => {
        countdown--;
        counter.textContent = countdown;
        //game over
        if (countdown === 0) {
            clearInterval(interval)
            gameField.classList.add('hidden')
            restartButton.classList.remove('hidden')
            counter.classList.add('hidden')
            pointsCounter.textContent = `You have scored: ${pointsCounter.textContent} points`;
            gameRestarted = false
        }

    }, 1000)

}


const checkShape = (function () {

    let points = 0;
    return function check(event) {
        let target = event.target
        let currentTargets = document.querySelectorAll('.target')

        if (target.classList.contains('target')) {
            target.style.background = 'lightgreen'
            target.dataset.done = true
            if (currentTargets.length === document.querySelectorAll('[data-done]').length) {
                points += currentTargets.length
                pointsCounter.textContent = points
                fillGrid()
            }
            return
        }

        target.style.background = 'red';
        setTimeout(() => {
            fillGrid()
        }, 300)
    }

})()


startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)

const MIN_VALUE_IN_DIAPOSON = 1
const MAX_VALUE_IN_DIAPOSON = 100
const MESSAGE_FOR_LOW_VALUE = 'Ваше число меньше загаданного! Введите число еще раз!'
const MESSAGE_FOR_HIGH_VALUE = 'Ваше число больше загаданного! Введите число еще раз!'
const guesses = document.querySelector('.guesses')
const lastResult = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const guessSubmit = document.querySelector('.guessSubmit')
const guessField = document.querySelector('.guessField')

let randomNumber = getRandomIntInclusive(MIN_VALUE_IN_DIAPOSON, MAX_VALUE_IN_DIAPOSON)
console.log(randomNumber)
let i = 1
let resetButton

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //Максимум и минимум включаются
}

function isNumeric(num) {
	return !isNaN(num)
}

function checkGuess() {
	let guessNumber = guessField.value

	if (i === 1) {
		guesses.textContent = 'Предыдущие значения: '
	}

	guesses.textContent += guessNumber + ' '

	if (Number(guessNumber) === randomNumber) {
		lastResult.textContent = 'Поздравляем! Вы выиграли!'
		lastResult.style.backgroundColor = 'green'
		lowOrHi.textContent = ''
		setGameOver()
	} else if (i === 10) {
		lastResult.textContent = 'Игра окончена!'
		lowOrHi.textContent = ''
		setGameOver()
	} else {
		lastResult.textContent = 'Неверно!'
		lastResult.style.backgroundColor = 'red'
		if (!isNumeric(guessNumber)) {
			lowOrHi.textContent = 'Вы ввели не число! Введите еще раз число'
		} else if (guessNumber !== '' && guessNumber.match(/^\s+$/) === null) {
			guessNumber > randomNumber
				? (lowOrHi.textContent = MESSAGE_FOR_HIGH_VALUE)
				: (lowOrHi.textContent = MESSAGE_FOR_LOW_VALUE)
		} else {
			lastResult.textContent = 'Введены пробелы или пустое значение!'
			lowOrHi.textContent = ''
		}
	}

	i++
	guessField.value = ''
	guessField.focus()
}

guessSubmit.addEventListener('click', checkGuess)

function setGameOver() {
	guessField.disabled = true
	guessSubmit.disabled = true
	resetButton = document.createElement('button')
	resetButton.textContent = 'Начать игру заново!'
	document.body.appendChild(resetButton)
	resetButton.addEventListener('click', resetGame)
}

function resetGame() {
	i = 1
	const resetParas = document.querySelectorAll('.resultParas p')
	for (let i = 0; i < resetParas.length; i++) {
		resetParas[i].textContent = ''
	}

	resetButton.parentNode.removeChild(resetButton)
	guessField.disabled = false
	guessSubmit.disabled = false
	guessField.value = ''
	guessField.focus()
	lastResult.style.backgroundColor = 'white'
	randomNumber = getRandomIntInclusive(MIN_VALUE_IN_DIAPOSON, MAX_VALUE_IN_DIAPOSON)
}

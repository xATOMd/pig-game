'use strict'

// Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Starting conditions
let scores, currentScore, activePlayer

const init = () => {
	scores = [0, 0]
	currentScore = 0
	activePlayer = 0

	score0El.textContent = 0
	score1El.textContent = 0
	current0El.textContent = 0
	current1El.textContent = 0

	diceEl.classList.add('hidden')
	btnRoll.classList.remove('hidden')
	btnHold.classList.remove('hidden')
	player0El.classList.remove('player--winner')
	player1El.classList.remove('player--winner')
	player0El.classList.add('player--active')
	player1El.classList.remove('player--active')
}

init()

const switchPlayer = () => {
	document.getElementById(`current--${activePlayer}`).textContent = 0
	currentScore = 0
	activePlayer = activePlayer === 0 ? 1 : 0

	//change background if player0 is active
	player0El.classList.toggle('player--active')
	player1El.classList.toggle('player--active')

	setTimeout(function () {
		diceEl.classList.add('hidden')
	}, 500)
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
	const dice = Math.trunc(Math.random() * 6) + 1
	diceEl.src = `images/dice-${dice}.png`
	diceEl.classList.remove('hidden')

	if (dice !== 1) {
		currentScore += dice
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore
	} else {
		switchPlayer()
	}
})

// Hold rolling dice and add current score to active player score
btnHold.addEventListener('click', function () {
	// Add current score to active player score
	scores[activePlayer] += currentScore
	document.getElementById(`score--${activePlayer}`).textContent =
		scores[activePlayer]

	if (scores[activePlayer] >= 100) {
		diceEl.classList.add('hidden')
		btnRoll.classList.add('hidden')
		btnHold.classList.add('hidden')

		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add('player--winner')

		document
			.querySelector(`.player--${activePlayer}`)
			.classList.remove('player--active')
	} else {
		switchPlayer()
	}
})

btnNew.addEventListener('click', init)

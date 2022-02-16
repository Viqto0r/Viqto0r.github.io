const table = document.querySelector('table')
const play = document.querySelector('#play')
const time = document.querySelector('.timer')
let complite = false

play.onclick = () => {
	play.style.display = 'none'
	getRandomCells()
	openCeills()
	setTimeout(hiddenCeils, 5000)

}

function getRandomCells() {
	let counterCells = 0
	while (counterCells < 10) {
		let cell = table.children[0].children[randomInteger(0, 9)].children[randomInteger(0, 9)]
		if (cell.classList.length == 0) {
			cell.classList.add('hidden__cell')
			counterCells++
		}
	}
}

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function openCeills() {
	Array.from(table.children[0].children).forEach(tr => {
		Array.from(tr.children).forEach(td => {
			if (td.className == 'hidden__cell') {
				td.classList.add('open__ceil')
			}
		})
	})
}

function hiddenCeils() {
	timer()
	Array.from(table.children[0].children).forEach(tr => {
		Array.from(tr.children).forEach(td => {
			if (td.className.includes('open__ceil')) {
				td.classList.remove('open__ceil')
			}
		})
	})
	table.addEventListener('click', (e) => {
		if (e.target.className == 'hidden__cell') {
			e.target.style.background = 'green'
			winner()
		}
	})
}

function winner() {

	while (document.querySelector(".winner")) {
		document.querySelector(".winner").remove()
	}
	while (document.querySelector(".loser")) {
		document.querySelector(".loser").remove()
	}
	let count = 0
	Array.from(table.children[0].children).forEach(tr => {
		Array.from(tr.children).forEach(td => {
			if (td.className == 'hidden__cell' && td.hasAttribute('style')) {
				count++
				if (count == 10) {
					complite = true
					const winner = document.querySelector("#winner")
					winner.insertAdjacentHTML('afterbegin', '<p class = "winner">Вы победили! Играть еще?</p>')
					winner.style.display = 'block'
				}
			}
		})
	}
	)
}

function loser() {
	const winner = document.querySelector("#winner")
	winner.insertAdjacentHTML('afterbegin', '<p class = "loser">Вы проиграли! Играть еще?</p>')
	winner.style.display = 'block'
}

function refresh() {
	Array.from(table.children[0].children).forEach(tr => {
		Array.from(tr.children).forEach(td => {
			td.className = ''
			td.removeAttribute('style')
		})
	})
	getRandomCells()
	openCeills()
	setTimeout(hiddenCeils, 5000)

	document.querySelector("#winner").style.display = 'none'
}

document.querySelector('#yes').addEventListener('click', () => {
	if (document.querySelector(".winner")) document.querySelector(".winner").remove()
	if (document.querySelector(".loser")) document.querySelector(".loser").remove()
	refresh()
	time.children[0].style.opacity = 0
	time.children[0].textContent = 45
	complite = false
})
document.querySelector('#no').addEventListener('click', () => window.close())

function timer() {
	let timer = 44
	time.children[0].style.opacity = 1
	let t = setInterval(() => {
		if (complite == true) {
			clearInterval(t)
			winner()
		}
		time.children[0].textContent = timer--
		if (timer < 0 && complite == false) {
			clearInterval(t)
			loser()
		}

	}, 1000);
}

let zodiac = {
	Близнецы: ['05-22', '06-21'],
	Весы: ['09-24', '10-23'],
	Водолей: ['01-21', '02-19'],
	Дева: ['08-22', '09-23'],
	Козерог: ['12-23', '01-20'],
	Лев: ['07-23', '08-21'],
	Овен: ['03-21', '04-20'],
	Рак: ['06-22', '07-22'],
	Рыбы: ['02-20', '03-20'],
	Скорпион: ['10-24', '11-23'],
	Стрелец: ['11-24', '12-22'],
	Телец: ['04-21', '05-21'],
}
let todayDate = new Date('2022-05-01')

let dayOfWeak = {
	today: 'Сегодня',
	tomorrow: 'Завтра',
	dayaftertomorrow: 'Послезавтра'
}

let cachePrediction = {
	today: false,
	tomorrow: false,
	dayaftertomorrow: false,
}

const predictionsList = ['если Вы проявите инициативу, ваши надежды и планы сбудутся сверх всяких ожиданий', 'кто-то старается помешать или навредить Вам', 'придет важное известие', 'в Вашу жизнь войдет нечто новое, что значительно повлияет на Вашу личность', 'будьте осторожны: Вас захотят обмануть!', 'внимательно присматривайтесь к своему окружению: кто-то может подвести Вас в самый решающий момент', 'проверьте все замки и запоры: Вас могут обокрасть', 'результат Ваших действий может оказаться неожиданным', 'Вам, наконец, удастся отпереть заржавевший замок', 'Вас ожидают тревоги и беспокойства', 'результаты дела, которое Вы задумали, сильно разочаруют Вас', 'предложение, которое Вам сделают, Вас не устроит', 'в одиночку Вам не справиться с вашими проблемами', 'успех придет, если Вы не будете слушать ничьих советов', 'для Вас наступит время сомнений и колебаний', 'тьма, в которой Вы жили до сих пор, рассеется', 'Будьте внимательны к подсказкам судьбы']

const radios = document.querySelectorAll('input[type="radio"]')
const date = document.querySelector('input[type="date"]')
const button = document.querySelector('#show')
const out = document.querySelector('#out')
const prediction = document.querySelector('.prediction')
const stars = document.querySelectorAll('.fa-regular fa-star')
const labels = document.querySelectorAll('label')
let todayDay = new Date().getDate()
let todayMonth = new Date().getMonth()
let todayYear = new Date().getYear()


button.addEventListener('click', click)

if (!localStorage.getItem('Сегодня')) {
	localStorage.setItem('Сегодня', `${todayDate.getDate()} ${todayDate.getMonth()} ${todayDate.getFullYear()}`)
}

function checkStorage() {
	if (!localStorage.getItem('Сегодня' + sign) || !localStorage.getItem('Завтра' + sign) || !localStorage.getItem('Послезавтра' + sign)) return
	if (+localStorage.getItem('Сегодня').match(/^\d\d?/)[0] + 1 === +todayDate.getDate() && !cachePrediction.today) {
		localStorage.setItem('Сегодня' + sign, localStorage.getItem('Завтра' + sign))
		localStorage.setItem('Завтра' + sign, localStorage.getItem('Послезавтра' + sign))
		localStorage.setItem('Послезавтра' + sign, predictionsList[random(0, predictionsList.length - 1)])
		cachePrediction.today = true
	}
	else if (+localStorage.getItem('Сегодня').match(/^\d\d?/)[0] + 2 === +todayDate.getDate() && !cachePrediction.tomorrow) {
		localStorage.setItem('Сегодня' + sign, localStorage.getItem('Послезавтра' + sign))
		localStorage.setItem('Завтра' + sign, predictionsList[random(0, predictionsList.length - 1)])
		localStorage.setItem('Послезавтра' + sign, predictionsList[random(0, predictionsList.length - 1)])
		cachePrediction.tomorrow = true
	}
	else if (+localStorage.getItem('Сегодня').match(/^\d\d?/)[0] + 2 < +todayDate.getDate() || +todayDate.getDate() < +localStorage.getItem('Сегодня').match(/^\d\d?/)[0]) {
		localStorage.clear()
		localStorage.setItem('Сегодня' + sign, predictionsList[random(0, predictionsList.length - 1)])
		localStorage.setItem('Завтра' + sign, predictionsList[random(0, predictionsList.length - 1)])
		localStorage.setItem('Послезавтра' + sign, predictionsList[random(0, predictionsList.length - 1)])
		localStorage.setItem('Сегодня', `${todayDate.getDate()} ${todayDate.getMonth()} ${todayDate.getFullYear()}`)
	}
}

function click() {
	if (!date.value) {
		console.log(1)
		setTimeout(() => {
			document.querySelector('h5').style.transform = 'scale(1) translate(0px, 0px)'
			document.querySelector('h5').style.color = 'black'
		}, 500)
		document.querySelector('h5').style.transform = 'scale(1.3) translate(0px,-5px)'
		document.querySelector('h5').style.color = '#9d0a0a'
		return
	}
	let choiseDate = date.value.match(/\d\d-\d\d$/)[0]
	for (sign in zodiac) {
		let choiseMonth = +choiseDate.split('-')[0]
		let choiseDay = +choiseDate.split('-')[1]
		let signStartMonth = +zodiac[sign][0].split('-')[0]
		let signStartDay = +zodiac[sign][0].split('-')[1]
		let signEndMonth = +zodiac[sign][1].split('-')[0]
		let signEndDay = +zodiac[sign][1].split('-')[1]

		if (choiseMonth === signStartMonth && choiseDay >= signStartDay || choiseMonth === signEndMonth && choiseDay <= signEndDay) {
			let choiseDay
			Array.from(radios).forEach(e => {
				if (e.checked) {
					choiseDay = dayOfWeak[e.id]
					if (!localStorage.getItem(dayOfWeak[e.id] + sign)) localStorage.setItem(dayOfWeak[e.id] + sign, predictionsList[random(0, predictionsList.length - 1)])
					checkStorage()
					out.children[0].textContent = sign
					out.children[1].textContent = `${choiseDay} ${localStorage.getItem(dayOfWeak[e.id] + sign)}`
					document.querySelector('.prediction').style.color = 'black'
					document.querySelector('.prediction').style.background = '#babd8e70'
					document.querySelector('.sign').style.color = '#28141d'

				}
			})
		}
	}
}

function random(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}


//console.dir(document.querySelector(`input[id="today"]`))

Array.from(labels).forEach(label => label.addEventListener('click', checkedInput))

labels[0].children[0].style.color = 'yellow'

function checkedInput(e) {
	if (e.target.attributes[0] && e.target.attributes[0].name == 'for') {
		let atrFor = e.target.attributes[0].nodeValue
		document.querySelector(`input[id= '${atrFor}']`).checked = true
		drawStar(document.querySelector(`input[id='${atrFor}']`))
	}
	else {
		let atrFor = e.target.parentNode.attributes[0].nodeValue
		document.querySelector(`input[id='${atrFor}']`).checked = true
		drawStar(document.querySelector(`input[id='${atrFor}']`))
	}
}

function drawStar(e) {
	Array.from(labels).forEach(label => {
		if (label.attributes[0].nodeValue == e.id) {
			label.children[0].style.color = 'yellow'
		}
		else {
			label.children[0].style.color = 'black'
		}
	})
}


//Array.from(labels).forEach(e => e.addEventListener('click', (e) => {
//	Array.from(radios).forEach(el => {
//		console.dir(e)
//		if (e.attributes[0].nodeValue == el.id) {
//			e.children[0].style.color = 'yellow'
//		}
//	})
//}))

//function checkLabels() {
//	Array.from(radios).forEach(el => {
//		if (el.hasAttribute('checked')) {
//			Array.from(labels).forEach(e => {
//				if (e.attributes[0].nodeValue == el.id)
//					e.children[0].style.color = 'yellow'
//			})
//		}
//	})
//}
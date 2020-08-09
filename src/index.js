import './style.scss'


window.start = () => {

	const createStyleString = (obj) => {
		let str
		Object.keys(obj).forEach(a => str+=`${a}:${obj[a]};`)
		if (str.indexOf('undefined') > -1) {
			str = str.slice(str.indexOf('undefined') + 'undefined'.length, str.length)
		}
		return str
	}

	const getCssVal = (elem, attr) => {
		return parseInt(getComputedStyle(elem).getPropertyValue(attr))
	}

	let width = 400, height = 300
	let stage = document.createElement('div')
	stage.id = 'stage'
	stage.style.width = width+'px'
	stage.style.height = height+'px'
	document.body.appendChild(stage)

	let dot = document.createElement('div')
	let dotStyle = {
		'width': '30px',
		'height': '30px',
		'display': 'block',
		'position': 'absolute',
		'left': '10px',
		'top': '20px',
		'background-image': 'url("https://cdn.shopify.com/s/files/1/2373/1539/products/Ninja_star_2e862ba2-d069-4ab8-b102-c148398d804d_2048x2048.JPG?v=1529767824")',
		'background-size': 'contain'
	}
	// dot.src = 'https://cdn.shopify.com/s/files/1/2373/1539/products/Ninja_star_2e862ba2-d069-4ab8-b102-c148398d804d_2048x2048.JPG?v=1529767824'
	dot.style.cssText = createStyleString(dotStyle)
	stage.appendChild(dot)

	// let stageOverlay = document.createElement('div')
	// stageOverlay.style.width = 400+'px'
	// stageOverlay.style.height = 300+'px'
	// stageOverlay.id = 'stage-overlay'
	// document.body.appendChild(stageOverlay)

	let infoBox = document.createElement('div')
	infoBox.id = 'infoBox'
	document.body.appendChild(infoBox)

	let info = document.createElement('div')
	info.innerHTML = 'Bouncy Ninja Star <br/><br/>'
	infoBox.appendChild(info)

	let speedDisplay = document.createElement('div')
	speedDisplay.classList.add('variable')
	infoBox.appendChild(speedDisplay)

	let rotationDisplay = document.createElement('div')
	rotationDisplay.classList.add('variable')
	infoBox.appendChild(rotationDisplay)

	let numBouncesDisplay = document.createElement('div')
	numBouncesDisplay.classList.add('variable')
	infoBox.appendChild(numBouncesDisplay)

	let speed = 1
	let rotation = 0
	let numBounces = 0
	let direction = 'right'
	let boundaryTouch = 'none'
	const moveDot = (delta) => {
		// accelerate until we reach speed of 5
		if (speed < 10) { speed += .01 }
		speedDisplay.innerHTML = 'speed: ' + speed.toFixed(2)

		rotation+=speed // the faster we bounce off the walls, the more rotation we'll see
		rotationDisplay.innerHTML = 'rotation: ' + rotation.toFixed(2)

		numBouncesDisplay.innerHTML = 'bounces: ' + numBounces

		dot.style.transform = `rotate(${rotation}deg)`

		if (direction == 'right') {
			let hx = getCssVal(dot, 'left') + speed + 'px'
			dot.style.left = hx
		}
		if (direction == 'left'){
			let hx = getCssVal(dot, 'left') - speed + 'px'
			dot.style.left = hx
		}

		if (getCssVal(dot, 'left') + getCssVal(dot, 'width') > width - 10) {
			boundaryTouch = 'rightBounds'
			numBounces++
		}
		if (getCssVal(dot, 'left') < 10) {
			boundaryTouch = 'leftBounds'
			numBounces++
		}

		if (boundaryTouch == 'rightBounds') {
			direction = 'left'
		}
		if (boundaryTouch == 'leftBounds') {
			direction = 'right'
		}

		requestAnimationFrame(moveDot)
	}

	requestAnimationFrame(moveDot)

}

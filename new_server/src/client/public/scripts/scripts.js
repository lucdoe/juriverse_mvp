const showSolution = () => {
	const x = document.getElementById('case-solution')
	const y = document.getElementById('solution-box')
	const z = document.getElementById('ssb1')
	if (x.style.display === 'none') {
		x.style.display = 'block'
		y.style.display = 'block'
		z.innerHTML = 'Musterlösung zuklappen'
		z.style.color = '#cca768'
		z.style.backgroundColor = 'white'
		z.style.border = '1px solid #cca768'
	} else {
		x.style.display = 'none'
		y.style.display = 'none'
		z.innerHTML = 'Musterlösung anzeigen'
		z.style.color = 'white'
		z.style.backgroundColor = '#cca768'
		z.style.border = 'none'
	}
}

const uploadTabs = (evt, cityName) => {
	let i, tabcontent, tablinks
	tabcontent = document.getElementsByClassName('tabcontent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	tablinks = document.getElementsByClassName('tablinks')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '')
	}
	document.getElementById(cityName).style.display = 'block'
	evt.currentTarget.className += ' active'
}

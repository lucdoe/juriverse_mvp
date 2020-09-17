const showSolution = () => {
	const x = document.getElementById('case-solution')
	const y = document.getElementById('solution-box')
	if (x.style.display === 'none') {
		x.style.display = 'block'
		y.style.display = 'block'
	} else {
		x.style.display = 'none'
		y.style.display = 'none'
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

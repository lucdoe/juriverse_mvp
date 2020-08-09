function getURL() {
	alert('The URL of this page is: ' + window.location.href)
}

function showSolution() {
	var x = document.getElementById('caseSolution')
	if (x.style.display === 'none') {
		x.style.display = 'block'
	} else {
		x.style.display = 'none'
	}
}

function filterFunction() {
	document.getElementById('searchDropdown').classList.toggle('show')
	var input, filter, ul, li, a, i
	input = document.getElementById('searchInput')
	filter = input.value.toUpperCase()
	div = document.getElementById('searchDropdown')
	a = div.getElementsByTagName('a')
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = ''
		} else {
			a[i].style.display = 'none'
		}
	}
}

var currentTab = 0 // Current tab is set to be the first tab (0)
showTab(currentTab) // Display the current tab

function showTab(n) {
	// This function will display the specified tab of the form ...
	var x = document.getElementsByClassName('tab')
	x[n].style.display = 'block'
	// ... and fix the Previous/Next buttons:
	if (n == 0) {
		document.getElementById('prevBtn').style.display = 'none'
	} else {
		document.getElementById('prevBtn').style.display = 'inline'
	}
	if (n == x.length - 1) {
		document.getElementById('nextBtn').innerHTML = 'Submit'
		document.getElementById('nextBtn').type = 'Submit'
	} else {
		document.getElementById('nextBtn').innerHTML = 'Next'
	}
	// ... and run a function that displays the correct step indicator:
	fixStepIndicator(n)
}

function nextPrev(n) {
	// This function will figure out which tab to display
	var x = document.getElementsByClassName('tab')
	// Exit the function if any field in the current tab is invalid:
	if (n == 1 && !validateForm()) return false
	// Hide the current tab:
	x[currentTab].style.display = 'none'
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n
	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
		//...the form gets submitted:
		document.getElementById('regForm').submit()
		return false
	}
	// Otherwise, display the correct tab:
	showTab(currentTab)
}

function validateForm() {
	// This function deals with validation of the form fields
	var x,
		y,
		i,
		valid = true
	x = document.getElementsByClassName('tab')
	y = x[currentTab].getElementsByTagName('input')
	// A loop that checks every input field in the current tab:
	for (i = 0; i < y.length; i++) {
		// If a field is empty...
		if (y[i].value == '') {
			// add an "invalid" class to the field:
			y[i].className += ' invalid'
			// and set the current valid status to false:
			valid = false
		}
	}
	// If the valid status is true, mark the step as finished and valid:
	if (valid) {
		document.getElementsByClassName('step')[currentTab].className += ' finish'
	}
	return valid // return the valid status
}

function fixStepIndicator(n) {
	// This function removes the "active" class of all steps...
	var i,
		x = document.getElementsByClassName('step')
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(' active', '')
	}
	//... and adds the "active" class to the current step:
	x[n].className += ' active'
}

function myFunction() {
	var x = document.getElementById('myTopnav')
	if (x.className === 'topnav') {
		x.className += ' responsive'
	} else {
		x.className = 'topnav'
	}
}

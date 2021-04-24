const inputs = document.querySelectorAll('input[type=range]');
const outputs = document.querySelectorAll('.filters output');
const buttonReset = document.querySelectorAll('.btn-reset');
const fullscreenButton = document.querySelector('.fullscreen');

//CSS FILTERS ADD
function addFilters() {
	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

function scrollNumberUpdate() {
	this.nextElementSibling.value = this.value;
}

inputs.forEach(input => input.addEventListener('change', addFilters));
inputs.forEach(input => input.addEventListener('mousemove', addFilters));
inputs.forEach(input => input.addEventListener('input', scrollNumberUpdate));


//FULLSCREEN
fullscreenButton.addEventListener('click', toggleScreeen);

function toggleScreeen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

//LOAD IMAGE FROM COMPUTER
const fileInput = document.querySelector('input[type="file"]');
const imageContainer = document.querySelector('.image-container');

fileInput.addEventListener('change', function(e) {
	const file = fileInput.files[0];
	const reader = new FileReader();
	reader.onload = () => {
		const img = new Image();
		img.src = reader.result;
		imageContainer.innerHTML = "";
		imageContainer.append(img);
	};
	reader.readAsDataURL(file);
});

//IMAGE DAY AND NIGHT
















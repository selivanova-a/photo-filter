const inputs = document.querySelectorAll('input[type=range]');
const outputs = document.querySelectorAll('.filters output');

const buttonReset = document.querySelector('#btn-reset');
const buttonSave = document.querySelector('#btn-save');
const buttonNext = document.querySelector('#btn-next');
const buttonFullscreen = document.querySelector('.fullscreen');


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


//RESET BUTTON DELETE FILTRES
buttonReset.addEventListener('click', resetFiltres);

function resetFiltres() {
	outputs.forEach(output => {
		output.innerHTML = '0';
	});
	inputs.forEach(input => {
		input.value = input.defaultValue;
		document.documentElement.style = '';
	});
}


//FULLSCREEN
buttonFullscreen.addEventListener('click', toggleScreeen);

function toggleScreeen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

//LOAD IMAGE FROM COMPUTER
const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', (e) =>{
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


//CANVAS SAVE IMAGE

//Draw image canvas
const canvas = document.querySelector('canvas');
const imageContainer = document.querySelector('.image-container');

function drawImage() {
	const img = new Image();
	img.setAttribute('crossOrigin', 'anonymous');
	img.src = "assets/img/cat.png";

	img.onload = function() {
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
	};
}
drawImage();

//Save image canvas (not work)
buttonSave.addEventListener('click', function(e) {
	console.log(canvas.toDataURL());
	let link = document.createElement('a');
	link.download = 'download.png';
	link.href = canvas.toDataURL();
	link.click();
	link.delete;
	img.onload = () => {
		imageContainer.innerHTML = "";
		imageContainer.append(img);
	};
});


//SLIDER IMAGE DAY or NIGHT
let today = new Date();
let	hour = today.getHours();
let timeOfDay;

if (hour >=6 && hour < 12) {
	timeOfDay = 'morning';
} else if (hour >=12 && hour < 18) {
	timeOfDay = 'day';
} else if (hour >= 18 && hour < 24) {
	timeOfDay = 'evening';
} else {
	timeOfDay = 'night';
}


const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/`;
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;


function viewBgImage(src) {
	const img = new Image();
	img.src = src;
	img.onload = () => {
		imageContainer.innerHTML = "";
		imageContainer.append(img);
	};
}

function getImage() {
	const index = i % images.length;
	const imageSrc = base + images[index];
	viewBgImage(imageSrc);
	i++;
}
buttonNext.addEventListener('click', getImage);


const ref = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timer = null
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const  changeColorBGBody = () =>{
	ref.bodyEl.style.background = getRandomHexColor();
}

ref.startBtn.addEventListener('click', () => {
   timer = setInterval(changeColorBGBody, 1000);
	ref.startBtn.disabled = true;
})

ref.stopBtn.addEventListener('click', () => {
   clearInterval(timer) 
	ref.startBtn.disabled = false;
})
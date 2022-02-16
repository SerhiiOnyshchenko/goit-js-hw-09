// all modules
import Notiflix from 'notiflix';

const refs = {
	form: document.querySelector('.form'),
	delayInput: document.querySelector('input[name="delay"]'),
	stepInput: document.querySelector('input[name="step"]'),
	amountInput: document.querySelector('input[name="amount"]'),
};
function createPromise(position, delay) {
	return new Promise((resolve, reject)=> {
		let shouldResolve = Math.random() > 0.3;
	 setTimeout(()=> {
		 if (shouldResolve) {
			 resolve({ position, delay });
		  } else {
			 reject({ position, delay });
		  } 
	 }, delay);
	 })
 }

refs.form.addEventListener('submit', (e) => {
	e.preventDefault()
	let delay = Number(refs.delayInput.value);
	const position = refs.amountInput.value
	let step = Number(refs.stepInput.value);
	for (let i = 1; i <= position; i++) {
			createPromise(i,delay)
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});
  			delay = delay + step;	
	}
})


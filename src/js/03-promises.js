// all modules
import Notiflix from 'notiflix';

const refs = {
	form: document.querySelector('.form'),
	delayInput: document.querySelector('input[name="delay"]'),
	stepInput: document.querySelector('input[name="step"]'),
	amountInput: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
	 Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
	 Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

refs.form.addEventListener('submit', (e) => {
e.preventDefault()
const position = refs.amountInput.value
const delay = refs.delayInput.value;
createPromise(position,delay)
console.log(refs.delayInput.value,refs.amountInput.value,refs.stepInput.value);
})
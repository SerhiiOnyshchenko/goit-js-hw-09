// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// all modules
import Notiflix from 'notiflix';

const ref = {
  iputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
const date = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
	  if (date.getTime() >= selectedDates[0].getTime()) {
		 Notiflix.Notify.failure('Please choose a date in the future');
      ref.startBtn.disabled = true;
    } else {
		 Notiflix.Notify.success("Great! Let's go to start!");
     ref.startBtn.disabled = false;
    }
  },
};

flatpickr(ref.iputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let timer = null;
let dataVal = 0;
const writeNewTime = () => {
  let count = convertMs(dataVal.getTime() - new Date().getTime());
  ref.daysEl.innerHTML = (count.days < 10 ? '0' : '') + count.days;
  ref.hoursEl.innerHTML = (count.hours < 10 ? '0' : '') + count.hours;
  ref.minutesEl.innerHTML = (count.minutes < 10 ? '0' : '') + count.minutes;
	ref.secondsEl.innerHTML = (count.seconds < 10 ? '0' : '') + count.seconds;
      ref.startBtn.disabled = true;
  if ((dataVal.getTime() - new Date().getTime())<=1000) {
	  clearInterval(timer);
	  ref.startBtn.disabled = false;
	ref.iputEl.setAttribute('readonly', false);
	  
  }
};

ref.startBtn.addEventListener('click', () => {
	dataVal = new Date(ref.iputEl.value);
	ref.iputEl.disabled = true
	writeNewTime();
  timer = setInterval(writeNewTime, 1000);
});

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// all modules
import Notiflix from 'notiflix';

const refs = {
  iputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() >= selectedDates[0].getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      Notiflix.Notify.success("Great! Let's go to start!");
      refs.startBtn.disabled = false;
    }
  },
};
let timer = null;
let dataVal = 0;

flatpickr(refs.iputEl, options);
// convert ms to time
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
// generation time
const writeNewTime = () => {
  let count = convertMs(dataVal.getTime() - new Date().getTime());
  refs.daysEl.innerHTML = (count.days < 10 ? '0' : '') + count.days;
  refs.hoursEl.innerHTML = (count.hours < 10 ? '0' : '') + count.hours;
  refs.minutesEl.innerHTML = (count.minutes < 10 ? '0' : '') + count.minutes;
  refs.secondsEl.innerHTML = (count.seconds < 10 ? '0' : '') + count.seconds;
  refs.startBtn.disabled = true;
  if (dataVal.getTime() - new Date().getTime() <= 1000) {
    clearInterval(timer);
    refs.startBtn.disabled = false;
    refs.iputEl.setAttribute('readonly', false);
  }
};
// start timer
refs.startBtn.addEventListener('click', () => {
  dataVal = new Date(refs.iputEl.value);
  refs.iputEl.disabled = true;
  writeNewTime();
  timer = setInterval(writeNewTime, 1000);
});
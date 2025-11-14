import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../img/error-icon.svg';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    calendarCloseHandler(selectedDates[0]);
  },
};

flatpickr(input, options);

startBtn.disabled = true;
startBtn.addEventListener('click', timerStartHandler);

function calendarCloseHandler(selectedDate) {
  const nowDate = new Date();
  if (selectedDate <= nowDate) {
    startBtn.disabled = true;
    showNotification();
    return;
  }
  startBtn.disabled = false;
  userSelectedDate = selectedDate;
}

function timerStartHandler() {
  startBtn.disabled = true;
  input.disabled = true;

  startCountdown(userSelectedDate);
}

function startCountdown(finishDate) {
  const intervalId = setInterval(() => {
    const nowDate = new Date();
    const diff = finishDate - nowDate;
    if (diff < 0) {
      timerFinishHandler(intervalId);
      return;
    }
    updateTimerDisplay(convertMs(diff));
  }, 1000);
}

function timerFinishHandler(intervalId) {
  clearInterval(intervalId);
  input.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timer.days.textContent = addLeadingZero(days);
  timer.hours.textContent = addLeadingZero(hours);
  timer.minutes.textContent = addLeadingZero(minutes);
  timer.seconds.textContent = addLeadingZero(seconds);
}

function showNotification() {
  iziToast.show({
    position: 'topRight',
    title: 'Error',
    titleColor: '#FFFFFF',
    titleSize: '16px',
    titleLineHeight: '24px',
    message: 'Please choose a date in the future',
    messageColor: '#FFFFFF',
    messageSize: '16px',
    messageLineHeight: '24px',
    backgroundColor: '#EF4040',
    iconUrl: icon,
    iconColor: '#FFFFFF',
    progressBarColor: '#B51B1B',
  });
}

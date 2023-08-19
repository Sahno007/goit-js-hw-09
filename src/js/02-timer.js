import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const dateTimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// Налаштування flatpickr
flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success("You can start the timer now!");
      startBtn.disabled = false;
    }
  },
});

let countdownInterval;

resetBtn.addEventListener('click', () => {
  clearInterval(countdownInterval);
  startBtn.disabled = false;
  resetBtn.disabled = true;
  dateTimePicker.disabled = false;
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
});

startBtn.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);
  const now = new Date();

  if (selectedDate <= now) {
    return;
  }

  startBtn.disabled = true;
  resetBtn.disabled = false;
  dateTimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const timeDifference = selectedDate - new Date();

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI(0);
      startBtn.disabled = false;
      resetBtn.disabled = false;
      dateTimePicker.disabled = false;
      Notiflix.Report.success("Time's up!", "The countdown has finished.");
    } else {
      updateTimerUI(timeDifference);
    }
  }, 1000);
});

function updateTimerUI(timeDifference) {
  const time = convertMs(timeDifference);
  daysEl.textContent = addLeadingZero(time.days);
  hoursEl.textContent = addLeadingZero(time.hours);
  minutesEl.textContent = addLeadingZero(time.minutes);
  secondsEl.textContent = addLeadingZero(time.seconds);
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
  return value.toString().padStart(2, '0');
}
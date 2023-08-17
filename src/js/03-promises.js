import Notiflix from "notiflix"; // Переконайтеся, що бібліотека notiflix підключена до вашого проекту

// Отримання полів форми
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');
const submitButton = form.querySelector('button[type="submit"]');

// Функція для створення промісу з відповідним виконанням чи відхиленням
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Обробник події відправки форми
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const initialDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  submitButton.disabled = true;

  for (let i = 1; i <= amount; i++) {
    try {
      await createPromise(i, initialDelay + (i - 1) * step);
      Notiflix.Notify.Success(`✅ Fulfilled promise ${i}`);
    } catch (error) {
      Notiflix.Notify.Failure(`❌ Rejected promise ${error.position}`);
    }
  }

  submitButton.disabled = false;
});

// Ініціалізація flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.Warning("Please choose a date in the future");
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);
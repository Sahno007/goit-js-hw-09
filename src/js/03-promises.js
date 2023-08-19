import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

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

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('[name="delay"]');
  const stepInput = document.querySelector('[name="step"]');
  const amountInput = document.querySelector('[name="amount"]');

  const initialDelay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  if (step <= 0 || initialDelay <= 0 || amount <= 0) {
    Notiflix.Notify.failure('Step, initial delay, and amount must be positive values');
    return; // stop execution
  }

  for (let i = 1; i <= amount; i++) {
    const currentDelay = initialDelay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
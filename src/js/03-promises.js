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

  for (let i = 1; i <= amount; i++) {
    const currentDelay = initialDelay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}